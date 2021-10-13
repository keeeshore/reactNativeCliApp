/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
// import type {Node} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';

import {AppContextProvider} from './components/AppContextProvider';
import {Authors} from './components/Authors';
import {AddAuthor} from './components/AddAuthor';
import {Books} from './components/Books';

const App: () => React.ReactNode = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  const [error, setError] = useState<string | null>(null);

  const [success, setSuccess] = useState<string | null>(null);

  // return <AddAuthor />;

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            borderWidth: 1,
            flex: 1,
          }}>
          <AppContextProvider
            onError={(err: string | null) => {
              setError(err);
            }}
            onSuccess={(success: string | null) => {
              setSuccess(success);
            }}>
            <AddAuthor />
            <Authors />
            <Books books={[]} />
          </AppContextProvider>
        </View>
        {error && (
          <View>
            <Text style={{color: 'black', backgroundColor: 'red', padding: 5, margin: 5}}>{error}</Text>
          </View>
        )}
        {success && (
          <View>
            <Text style={{color: 'black', backgroundColor: 'green', padding: 5, margin: 5}}>{success}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
