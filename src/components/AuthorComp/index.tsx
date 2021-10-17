import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {AppContext, AppContextProvider, Author, Item} from '../AppContextProvider';
import Button from '../shared/Button';
import {tableStyle} from '../Authors';

interface AuthorCompProps {
  author: Author;
  setCurrentAuthor(author: Author): any;
  edit(item: Author): any;
  remove(item: Author): any;
}

export const AuthorComp = (props: AuthorCompProps) => {
  const {author, setCurrentAuthor, edit, remove} = props;

  return (
    <View style={tableStyle.header}>
      <View style={tableStyle.col}>
        <Text>{author.id}</Text>
      </View>
      <View style={tableStyle.col}>
        <Text>{author.name}</Text>
      </View>
      <View style={tableStyle.col}>
        <Text>{author.books.length}</Text>
      </View>
      <View style={tableStyle.col}>
        <Button
          title={'show'}
          onPress={() => {
            setCurrentAuthor(author);
          }}
        />
      </View>
      <View style={tableStyle.col}>
        <Button
          title={'Edit'}
          onPress={() => {
            remove(author);
          }}
        />
      </View>
      <View style={tableStyle.col}>
        <Button
          title={'Delete'}
          onPress={() => {
            remove(author);
          }}
        />
      </View>
    </View>
  );
};
