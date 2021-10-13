import React, {useState, useEffect, useContext, ReactFragment, ChangeEvent} from 'react';
import {Book, AppContext, AppContextProvider} from '../AppContextProvider';
import {Text, View} from 'react-native';
import {AddBook} from '../AddBook';

export const Books = (props: {books: Book[]}) => {
  const {books, currentAuthor} = useContext(AppContext);
  return (
    <View style={{flex: 1, borderWidth: 1, margin: 5, backgroundColor: '#CCC'}}>
      <Text style={{fontSize: 14, fontWeight: 'bold', paddingTop: 10, paddingBottom: 5}}>
        Books by {currentAuthor?.name}
      </Text>
      {currentAuthor &&
        currentAuthor.books.map((book: Book, key: number) => (
          <View
            key={key}
            style={{
              flexDirection: 'row',
              flex: 1,
              borderWidth: 1,
              alignContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 12, paddingTop: 5, paddingBottom: 5}}>
                {key + 1}: {book.title}
              </Text>
            </View>
          </View>
        ))}
      {currentAuthor?.id && <AddBook authorId={currentAuthor.id} />}
    </View>
  );
};
