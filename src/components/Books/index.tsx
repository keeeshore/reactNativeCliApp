import React, {useState, useEffect, useContext, ReactFragment, ChangeEvent} from 'react';
import {Book, ItemContext, ItemContextProvider} from '../ItemContextProvider';
import {Text, View} from 'react-native';
import {AddBook} from '../AddBook';

export const Books = (props: {books: Book[]}) => {
  const {books, currentAuthor} = useContext(ItemContext);
  return (
    <>
      <Text>Books :</Text>
      {currentAuthor &&
        currentAuthor.books.map((book: Book, key: number) => (
          <View
            key={key}
            style={{flexDirection: 'row', flex: 1, borderWidth: 1, alignContent: 'center', alignItems: 'flex-start'}}>
            <View style={{flex: 1}}>
              <Text>Title: {book.title}</Text>
            </View>
          </View>
        ))}
      {currentAuthor?.id && <AddBook authorId={currentAuthor.id} />}
    </>
  );
};
