/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext, useState} from 'react';
// import type {Node} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';

import {AppContext, AppContextProvider, Author, Book} from './components/AppContextProvider';
import {Authors} from './components/Authors';
import {AddAuthor} from './components/AddAuthor';
import {Books} from './components/Books';
import {AddBook} from './components/AddBook';
import {addAuthor} from './service/authorService';

export enum ACTIONS {
  ADD_AUTHOR,
  ADD_BOOK,
}

const App: () => React.ReactNode = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  const [author, setAuthor] = useState<Author | null>(null);

  const [book, setBook] = useState<Book | null>(null);

  const [action, setAction] = useState<Author | null>(null);

  const [error, setError] = useState<string | null>(null);

  const [success, setSuccess] = useState<string | null>(null);

  // return <AddAuthor />;

  const onEditBook = (book: Book) => {};

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
            }}
            onAuthorSelected={(author: Author) => {
              setAuthor(author);
            }}>
            {author ? (
              <>
                <Text>{JSON.stringify(book)}</Text>
                <AddBook
                  book={book || null}
                  author_id={author.id}
                  onBookAdded={(book: Book) => {
                    console.log('Book added :: ', book);
                    const books = author?.books || [];
                    books.push(book);
                    setAuthor({...author, ...{books: books}});
                  }}
                />
                <Books
                  author={author}
                  onEditBook={(book: Book) => {
                    console.log('App.tsx onEditBook, setBook now!!', book);
                    setBook(book);
                  }}
                />
              </>
            ) : (
              <>
                <AddAuthor id={0} addAuthor={addAuthor} />
                <Authors />
              </>
            )}
            {success && (
              <View>
                <Text style={{color: 'black', backgroundColor: 'green', padding: 5, margin: 5}}>{success}</Text>
              </View>
            )}
          </AppContextProvider>
        </View>
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
