import React, {useContext} from 'react';
import {Item, ItemContext} from '../ItemContextProvider';
import {Button, Text, View} from 'react-native';

export const ListItems = (props: {items?: Item[]}) => {
  const {items, removeItem, completeItem, setCurrentAuthor} = useContext(ItemContext);

  const remove = async (item: Item) => {
    await removeItem(item);
    setCurrentAuthor(null);
  };

  const complete = async (item: Item) => {
    await completeItem(item);
  };

  return (
    <>
      <Text>Todos :</Text>
      {items.map((item: Item, key: number) => (
        <View
          key={key}
          style={{flexDirection: 'row', flex: 1, borderWidth: 1, alignContent: 'center', alignItems: 'center'}}>
          {!item.completed ? (
            <View style={{flex: 3}}>
              <Button
                title={'complete'}
                onPress={() => {
                  complete(item);
                }}
              />
            </View>
          ) : (
            <View style={{flex: 3}}>
              <Text> completed! </Text>
            </View>
          )}
          <View style={{flex: 2}}>
            <Text style={{color: item.completed ? 'green' : '#000'}}>
              #{item.id}.{item.author.name}
            </Text>
          </View>
          <View style={{flex: 2}}>
            <Text>Books({item.author.books.length})</Text>
          </View>
          <View style={{flex: 2}}>
            <Button
              title={'Book Details'}
              onPress={() => {
                setCurrentAuthor(item.author);
              }}
            />
          </View>
          <View style={{flex: 1}}>
            <Button
              title={'X'}
              onPress={() => {
                remove(item);
              }}
            />
          </View>
        </View>
      ))}
    </>
  );
};
