import React, {useContext} from 'react';
import {Book, AppContext, Author} from '../AppContextProvider';
import {Text, View} from 'react-native';
import {BookComp} from '../BookComp';
import Button from '../shared/Button';
import {tableStyle} from '../Authors';

export const Books = (props: {author: Author; onEditBook(book: Book): any}) => {
  const {setCurrentAuthor} = useContext(AppContext);

  const {author} = props;

  return (
    <>
      <View style={{flex: 1, borderWidth: 1, margin: 5, backgroundColor: '#CCC'}}>
        <Text style={{fontSize: 14, fontWeight: 'bold', paddingTop: 10, paddingBottom: 5}}>
          Books by {author?.name}
        </Text>
        <View style={tableStyle.header}>
          <View style={{flex: 1}}>
            <Text style={{paddingTop: 5, paddingBottom: 5, alignItems: 'flex-start', alignContent: 'flex-start'}}>
              No.
            </Text>
          </View>
          <View style={tableStyle.col}>
            <Text style={{paddingTop: 5, paddingBottom: 5, alignItems: 'flex-start', alignContent: 'flex-start'}}>
              Title
            </Text>
          </View>
          <View style={tableStyle.col}>
            <Text style={{paddingTop: 5, paddingBottom: 5, alignItems: 'flex-start', alignContent: 'flex-start'}}>
              Genre
            </Text>
          </View>
          <View style={{...tableStyle.col, flex: 4}}>
            <Text>Action</Text>
          </View>
        </View>
        {author.books.map((book: Book, key: number) => (
          <BookComp
            key={key}
            indexId={key + 1}
            book={book}
            onEditClick={(res: Book) => {
              console.log('EditBook clicked with : ', res);
              props.onEditBook(res);
            }}
          />
        ))}
      </View>
      <View style={{flex: 1, alignItems: 'center', alignContent: 'center'}}>
        <Button
          title={'< Go Back'}
          onPress={() => {
            setCurrentAuthor(null);
          }}
        />
      </View>
    </>
  );
};
