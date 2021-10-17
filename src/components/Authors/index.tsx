import React, {useContext} from 'react';
import {Item, AppContext, Author} from '../AppContextProvider';
import {Button, StyleSheet, Text, View} from 'react-native';
import {AuthorComp} from '../AuthorComp';
import {deleteAuthor} from '../../service/authorService';

export const Authors = (props: {items?: Item[]}) => {
  const {authors, removeItem, completeItem, setCurrentAuthor} = useContext(AppContext);

  const remove = async (author: Author) => {
    await deleteAuthor(author.id || 0);
    await removeItem(author);
    setCurrentAuthor(null);
  };

  const complete = async (item: Author) => {
    await completeItem(item);
  };

  const edit = async (item: Author) => {
    await completeItem(item);
  };

  return (
    <>
      <Text style={{padding: 5, fontWeight: 'bold', fontSize: 15}}>Authors</Text>
      <View style={tableStyle.header}>
        <View style={tableStyle.col1}>
          <Text>Id</Text>
        </View>
        <View style={tableStyle.col}>
          <Text style={{}}>Name</Text>
        </View>
        <View style={tableStyle.col}>
          <Text>Book(s)</Text>
        </View>
        <View style={tableStyle.col}>
          <Text>Details</Text>
        </View>
        <View style={tableStyle.col}>
          <Text>Actions</Text>
        </View>
      </View>
      {authors.map((author: Author, key: number) => (
        <AuthorComp key={key} setCurrentAuthor={setCurrentAuthor} author={author} edit={complete} remove={remove} />
      ))}
    </>
  );
};

export const tableStyle = StyleSheet.create({
  header: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    flex: 6,
    borderWidth: 1,
    alignContent: 'center',
    alignItems: 'center',
  },
  col1: {
    flex: 1,
  },
  col2: {
    flex: 3,
  },
  col: {
    flex: 2,
    alignContent: 'center',
    alignItems: 'center',
  },
});
