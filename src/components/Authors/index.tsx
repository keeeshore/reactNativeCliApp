import React, {useContext} from 'react';
import {Item, AppContext} from '../AppContextProvider';
import {Button, Text, View} from 'react-native';

export const Authors = (props: {items?: Item[]}) => {
  const {items, removeItem, completeItem, setCurrentAuthor} = useContext(AppContext);

  const remove = async (item: Item) => {
    await removeItem(item);
    setCurrentAuthor(null);
  };

  const complete = async (item: Item) => {
    await completeItem(item);
  };

  return (
    <>
      <Text style={{padding: 5, fontWeight: 'bold', fontSize: 15}}>Authors</Text>
      <View
        style={{
          alignSelf: 'stretch',
          flexDirection: 'row',
          flex: 6,
          borderWidth: 1,
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          <Text>Id</Text>
        </View>
        <View style={{flex: 3}}>
          <Text style={{}}>Name</Text>
        </View>
        <View style={{flex: 2, alignContent: 'center', alignItems: 'center'}}>
          <Text>Book(s)</Text>
        </View>
        <View style={{flex: 2, alignContent: 'center', alignItems: 'center'}}>
          <Text>Details</Text>
        </View>
        <View style={{flex: 2, alignContent: 'center', alignItems: 'center'}}>
          <Text>Pass?</Text>
        </View>
        <View style={{flex: 1}}>
          <Text>X</Text>
        </View>
      </View>
      {items.map((item: Item, key: number) => (
        <View
          key={key}
          style={{
            alignSelf: 'stretch',
            flexDirection: 'row',
            flex: 6,
            borderWidth: 1,
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <Text>{item.id}</Text>
          </View>
          <View style={{flex: 3}}>
            <Text style={{color: item.completed ? 'green' : '#000'}}>{item.author.name}</Text>
          </View>
          <View style={{flex: 2, alignContent: 'center', alignItems: 'center'}}>
            <Text>{item.author.books.length}</Text>
          </View>
          <View style={{flex: 2, alignContent: 'center', alignItems: 'center'}}>
            <Button
              title={'show'}
              onPress={() => {
                setCurrentAuthor(item.author);
              }}
            />
          </View>
          {!item.completed ? (
            <View style={{flex: 2}}>
              <Button
                title={'ok'}
                onPress={() => {
                  complete(item);
                }}
              />
            </View>
          ) : (
            <View style={{flex: 2, alignContent: 'center', alignItems: 'center'}}>
              <Text> pass </Text>
            </View>
          )}
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
