import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {Book, BookGenre, Item} from '../AppContextProvider';
import Button from '../shared/Button';

interface BookProps {
  book: Book;
  indexId: number;
  onEditClick(book: Book): any;
}

export const BookComp = (props: BookProps) => {
  const {book, indexId, onEditClick} = props;

  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        borderBottomWidth: 1,
        alignContent: 'flex-start',
        alignItems: 'flex-start',
      }}>
      <View style={{flex: 1, alignItems: 'flex-start', alignContent: 'flex-start'}}>
        <Text>{indexId}</Text>
      </View>
      <View style={{flex: 2, alignItems: 'flex-start', alignContent: 'flex-start'}}>
        <Text
          style={{
            fontSize: 12,
            paddingTop: 5,
            paddingBottom: 5,
          }}>
          {book.title}
        </Text>
      </View>
      <View style={{flex: 4}}>
        {book.bookGenres.map((genre: BookGenre, key: number) => {
          return <Text key={key}>{genre.label},</Text>;
        })}
      </View>
      <View style={{flex: 2, alignItems: 'flex-end', alignContent: 'flex-end'}}>
        <Button
          title={'Edit Book'}
          onPress={() => {
            console.log('Book update::: ', book);
            onEditClick(book);
          }}
        />
      </View>
    </View>
  );
};
