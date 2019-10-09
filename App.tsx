import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
} from 'react-native';
import {AF_JOBS_API_URL} from 'react-native-dotenv';
import axios from 'axios';
import HTML from 'react-native-render-html';

const Colors = {
  black: 'black',
  white: 'white',
  dark: 'darkgray',
};

interface JobAd {
  annonsid: string;
  annonsurl: string;
  annonsrubrik: string;
  arbetsplatsnamn: string;
  relevans: number;
  sista_ansokningsdag: string;
  daysLeft: number | undefined;
  logotype: string;
  jobDescription: any;
}

type State = {
  jobAds: JobAd[];
} | null;

const App = () => {
  const [state, setState] = useState<State>(null);

  useEffect(() => {
    axios
      .get(AF_JOBS_API_URL)
      .then(data => {
        setState({jobAds: data.data});
      })
      .catch(error => {
        setState(error);
      });
  }, [123]);

  const usingHermes =
    typeof HermesInternal === 'object' && HermesInternal !== null;
  return (
    <>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {!usingHermes ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            {state !== null &&
              state.jobAds.map(jobAd => (
                <View style={styles.sectionContainer} key={jobAd.annonsid}>
                  <Text style={styles.sectionTitle}>{jobAd.annonsrubrik}</Text>
                  <Text style={styles.sectionTitle}>
                    {jobAd.arbetsplatsnamn}
                  </Text>
                  <Text>Days left: {jobAd.daysLeft}</Text>
                  <Text>Score: {jobAd.relevans}</Text>
                  <ScrollView style={{flex: 1}}>
                    <HTML
                      html={jobAd.jobDescription}
                      imagesMaxWidth={Dimensions.get('window').width}
                    />
                  </ScrollView>
                </View>
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'black',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
