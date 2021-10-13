import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Config from 'react-native-config';
import {Text} from 'react-native';

console.log('Config in Provider:: ', Config);

export interface Book {
  id?: number;
  title: string;
  publisher: string;
  author_id: number;
}

export interface Author {
  id?: number;
  name: string;
  age: number;
  email: string;
  books: Book[];
}

export interface Item {
  author: Author;
  id?: number;
  completed: boolean;
  inProgress: boolean;
  deleted: boolean;
}

export interface AppContextData {
  items: Item[];
  books: Book[];
  addBook(book: Book): Promise<boolean>;
  addItem(item: Item): Promise<boolean>;
  removeItem(item: Item): Promise<boolean>;
  completeItem(item: Item): Promise<boolean>;
  setCurrentAuthor(author: Author | null): any;
  currentAuthor: Author | null;
  error: string | null;
  setError(arg: string | null): void;
  showSuccess(arg: string | null): void;
}

export const AppContext = React.createContext<AppContextData>({
  items: [],
  books: [],
  addBook: () => Promise.resolve(true),
  addItem: () => Promise.resolve(true),
  removeItem: () => Promise.resolve(true),
  completeItem: () => Promise.resolve(true),
  setCurrentAuthor: (author: Author | null) => '',
  error: '',
  setError: (arg: string | null) => false,
  showSuccess: (arg: string | null) => false,
  currentAuthor: null,
});

export const AppContextProvider = (props: {
  onError(err: string | null): any;
  onSuccess(success: string | null): any;
  children?: any;
}) => {
  const [items, setItems] = useState<Item[]>([]);

  const [books, setBooks] = useState<Book[]>([]);

  const [currentAuthor, setCurrentAuthor] = useState<Author | null>(null);

  const [error, setError] = useState<string | null>(null);

  const [success, showSuccess] = useState<string | null>(null);

  const addBook = (book: Book): Promise<boolean> => {
    console.log('AppContextProvider setBooks');
    // setBooks(books);
    // return Promise.resolve(true);
    return new Promise((resolve, reject) => {
      setBooks(books => {
        resolve(true);
        return [...books, book];
      });
    });
  };

  const addItem = async (item: Item): Promise<boolean> => {
    console.log('AppContextProvider adding Item', item, ' to : ', items);
    try {
      const author: Author = {email: item.author.email, name: item.author.name, age: item.author.age, books: []};
      const results = await axios.post(`${Config.API_URL}/authors`, author);
      console.log('AppContextProvider PostAuthors result :: ', results.data);
    } catch (e) {
      console.error('AppContextProvider addItem ERR :: ', e);
      // setError(JSON.stringify(e.message));
      return Promise.reject(e);
    }
    return new Promise((resolve, reject) => {
      setItems(items => {
        item.id = items.length;
        resolve(true);
        return [...items, item];
      });
    });
  };

  const removeItem = (item: Item): Promise<boolean> => {
    console.log('AppContextProvider removeItem', item, ' to : ', items);
    return new Promise((resolve, reject) => {
      setItems(items.filter(i => i.id !== item.id));
      resolve(true);
    });
  };

  const completeItem = (item: Item): Promise<boolean> => {
    console.log('AppContextProvider completeItem', item, ' to : ', items);
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

  const getItemList = async () => {
    console.log('AppContextProvider getItemList START :: ');
    let items: Item[] = [];
    try {
      console.log('**************  = ', Config.API_URL);
      const results = await axios.get(`${Config.API_URL}/authors`);
      console.log('AppContextProvider getItemList results :: ', results.data);
      items = results.data;
    } catch (e: any) {
      console.error('AppContextProvider getItemList ERR :: ', e);
      setError(JSON.stringify(e.message));
    }
    console.log('AppContextProvider getItemList then :: ', items);
    return items;
  };

  useEffect(() => {
    console.log('AppContextProvider useEffect error:: ', error);
    props.onError(error);
  }, [error, props]);

  useEffect(() => {
    console.log('AppContextProvider useEffect Success:: ', success);
    props.onSuccess(success);
  }, [success, props]);

  useEffect(() => {
    console.log('AppContextProvider useEffect INIT:: ');
    getItemList().then((result: Item[]) => {
      console.log('AppContextProvider useEffect getItemList then:: ', result);
      setItems(result);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        error,
        setError,
        items,
        books,
        currentAuthor,
        setCurrentAuthor,
        addBook,
        addItem,
        removeItem,
        completeItem,
        showSuccess,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};
