import React, {useState, useEffect, useContext, ReactFragment, ChangeEvent} from 'react';
import {Author, Item, ItemContext} from '../ItemContextProvider';
import {View, Button, StyleSheet, TextInput} from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 25,
    margin: 5,
    borderWidth: 1,
    padding: 5,
    flex: 1,
  },
});

export const AddItem = (props: {id?: string}) => {
  const [name, setName] = useState('');

  const [age, setAge] = useState('');

  const [email, setEmail] = useState('');

  const {addItem, setError, showSuccess} = useContext(ItemContext);

  const add = async (data: {name: string; age: string; email: string}) => {
    if (!data.name || !data.age || data.email) {
      setError('All details are mandatory');
      return;
    }
    if (isNaN(parseInt(data.age, 10))) {
      setError('Age must be a number');
      return;
    }
    setError(null);
    const author: Author = {
      email: data.email,
      name: data.name,
      age: parseInt(data.age, 10),
      books: [],
    };
    const item: Item = {
      author: author,
      completed: false,
      deleted: false,
      inProgress: false,
    };
    try {
      await addItem(item);
      showSuccess(`Author Added !!`);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <View style={{flex: 1, flexDirection: 'row', alignContent: 'center', alignItems: 'center'}}>
      <View style={{flex: 2, borderColor: 'blue'}}>
        <TextInput placeholder={'Name'} style={styles.input} value={name} onChangeText={setName} />
        <TextInput placeholder={'Email'} style={styles.input} value={email} onChangeText={setEmail} />
        <TextInput placeholder={'Age'} style={styles.input} value={age} onChangeText={setAge} />
      </View>
      <View style={{flex: 1, borderColor: 'green'}}>
        <Button
          color="#000"
          title={'Add Author'}
          onPress={() => {
            add({name, age, email});
          }}
        />
      </View>
    </View>
  );
};
