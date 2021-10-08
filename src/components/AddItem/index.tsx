import React, {useState, useEffect, useContext, ReactFragment, ChangeEvent} from 'react';
import {Item, ItemContext} from '../ItemContextProvider';
import {
  View,
  Button,
  StyleSheet,
  TextInput,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  SafeAreaView,
} from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    flex: 1,
  },
  button: {
    height: 40,
    width: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export const AddItem = (props: {id?: string}) => {
  const [value, setValue] = useState('');

  const {addItem} = useContext(ItemContext);

  const add = async (value: string) => {
    if (!value) {
      throw new Error('Value is required');
    }
    const item: Item = {
      id: 0,
      desc: value,
      completed: false,
      deleted: false,
      inProgress: false,
    };
    await addItem(item);
    setValue('');
  };

  return (
    <View style={{flex: 1, flexDirection: 'row', alignContent: 'center', alignItems: 'center'}}>
      <View style={{flex: 2, borderColor: 'blue'}}>
        <TextInput style={styles.input} value={value} onChangeText={setValue} />
      </View>
      <View style={{flex: 1, borderColor: 'green'}}>
        <Button
          color="#000"
          title={'Add Item'}
          onPress={() => {
            add(value);
          }}
        />
      </View>
    </View>
  );
};
