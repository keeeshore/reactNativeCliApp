import React, {useState, useEffect, useContext, ReactFragment, ChangeEvent} from 'react';
import {Author, Item, AppContext, Book} from '../AppContextProvider';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import Button from '../shared/Button';
import {BookComp} from '../BookComp';
import {AddBook} from '../AddBook';

const styles = StyleSheet.create({
  input: {
    height: 25,
    margin: 5,
    borderWidth: 1,
    padding: 5,
    flex: 1,
  },
});

export const AddAuthor = (props: {id?: number; addAuthor(author: Author): Promise<any>}) => {
  const [name, setName] = useState('');

  const [age, setAge] = useState('');

  const [email, setEmail] = useState('');

  const [books, setBooks] = useState<Book[]>([]);

  const {addItem, setError, showSuccess, error} = useContext(AppContext);

  const add = async (data: {name: string; age: string; email: string}) => {
    console.log('AddItem add ', data);
    if (!data.name || !data.age || !data.email) {
      setError('All details are mandatory');
      return;
    }
    if (isNaN(parseInt(data.age, 10))) {
      setError('Age must be a number');
      return;
    }
    setError(null);
    const author: Author = {
      id: 0,
      email: data.email,
      name: data.name,
      age: parseInt(data.age, 10),
      books: [],
    };
    try {
      console.log('AddAuthor component starting AddAuthor ::: ', author);
      const result = await props.addAuthor(author);
      console.log('AddAuthor component complete AddAuthor ::: ', result);
      showSuccess(`Author Added !!`);
    } catch (e: any) {
      console.error('AddAuthor component error AddAuthor ::: ', e);
      setError(e.message);
    }
  };

  useEffect(() => {
    setError(null);
  }, [setError]);

  return (
    <>
      <View
        style={{
          flex: 1,
          padding: 5,
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
          backgroundColor: '#bae6f7',
        }}>
        <View style={{flex: 2, borderColor: 'blue'}}>
          <TextInput placeholder={'Name'} style={styles.input} value={name} onChangeText={setName} />
          <TextInput placeholder={'Email'} style={styles.input} value={email} onChangeText={setEmail} />
          <TextInput placeholder={'Age'} style={styles.input} value={age} onChangeText={setAge} />
          {/*<View style={{flex: 1, backgroundColor: '#CCC', margin: 4}}>*/}
          {/*  <AddBook authorId={0} />*/}
          {/*</View>*/}
          {error && (
            <View style={{flex: 1}}>
              <Text style={{color: 'black', backgroundColor: 'red', padding: 5, margin: 5}}>{error}</Text>
            </View>
          )}
          <Button
            title={'Add Author'}
            onPress={() => {
              console.log('AddItem clicked!! with ', name, age, email);
              add({name, age, email});
            }}
          />
        </View>
      </View>
    </>
  );
};
