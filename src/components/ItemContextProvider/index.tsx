import React, {useEffect, useState, useContext} from 'react';
import {ListItems} from '../ListItems';

export interface Item {
  id: number;
  desc: string;
  completed: boolean;
  inProgress: boolean;
  deleted: boolean;
}

export interface ItemContextData {
  items: Item[];
  addItem(item: Item): Promise<boolean>;
  removeItem(item: Item): Promise<boolean>;
  completeItem(item: Item): Promise<boolean>;
}

export const ItemContext = React.createContext<ItemContextData>({
  items: [],
  addItem: () => Promise.resolve(true),
  removeItem: () => Promise.resolve(true),
  completeItem: () => Promise.resolve(true),
});

export const ItemContextProvider = (props: {children?: any}) => {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (item: Item): Promise<boolean> => {
    console.log('ItemContextProvider adding Item', item, ' to : ', items);
    return new Promise((resolve, reject) => {
      setItems(items => {
        item.id = items.length;
        resolve(true);
        return [...items, item];
      });
    });
  };

  const removeItem = (item: Item): Promise<boolean> => {
    console.log('ItemContextProvider removeItem', item, ' to : ', items);
    return new Promise((resolve, reject) => {
      setItems(items.filter(i => i.id !== item.id));
      resolve(true);
    });
  };

  const completeItem = (item: Item): Promise<boolean> => {
    console.log('ItemContextProvider completeItem', item, ' to : ', items);
    return new Promise((resolve, reject) => {
      setItems(
        items.map(i => {
          i.completed = item.id === i.id ? true : i.completed;
          return i;
        }),
      );
      resolve(true);
    });
  };

  useEffect(() => {
    console.log('ItemContextProvider useEffect :: ', items);
  }, [items]);

  return (
    <ItemContext.Provider value={{items, addItem, removeItem, completeItem}}>{props.children}</ItemContext.Provider>
  );
};
