import React, {useState, useEffect, useContext, ReactFragment, ChangeEvent} from 'react';
import {Book, AppContext} from '../AppContextProvider';
import {View, Button, StyleSheet, TextInput} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';

const styles = StyleSheet.create({
  input: {
    height: 25,
    margin: 5,
    borderWidth: 1,
    padding: 3,
    flex: 1,
  },
});

export const AddBook = (props: {authorId: number}) => {
  const [title, setTitle] = useState('');

  const [publisher, setPublisher] = useState('');

  const {addBook, setError, showSuccess} = useContext(AppContext);

  const addBookToDb = async (book: Book): Promise<Book> => {
    try {
      const results = await axios.post(`${Config.API_URL}/books`, book);
      console.log('AppContextProvider Book result :: ', results.data);
    } catch (e) {
      console.error('AppContextProvider getItemList ERR :: ', e);
      return Promise.reject(e);
    }
    return Promise.resolve(book);
  };

  const add = async (props: {title: string; publisher: string; author_id: number}) => {
    if (!props.title || !props.publisher) {
      setError('Title and Publisher is required');
      return;
    }
    setError(null);
    const book: Book = {title: props.title, author_id: props.author_id, publisher: props.publisher};
    try {
      await addBookToDb(book);
      await addBook(book);
      showSuccess(`Book Added for ${props.author_id}`);
    } catch (e: any) {
      setError(JSON.stringify(e.message));
    }
  };

  return (
    <View style={{flex: 1, flexDirection: 'row', alignContent: 'center', alignItems: 'center'}}>
      <View style={{flex: 2, borderColor: 'blue'}}>
        <TextInput placeholder={'Title'} style={styles.input} value={title} onChangeText={setTitle} />
        <TextInput placeholder={'Publisher'} style={styles.input} value={publisher} onChangeText={setPublisher} />
      </View>
      <View style={{flex: 1, borderColor: 'green'}}>
        <Button
          color="#000"
          title={'Add Book'}
          onPress={() => {
            add({title, publisher, author_id: props.authorId});
          }}
        />
      </View>
    </View>
  );
};
