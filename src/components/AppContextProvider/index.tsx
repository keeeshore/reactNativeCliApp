import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Config from 'react-native-config';
import {Text} from 'react-native';

console.log('Config in Provider:: ', Config);

export interface BookGenre {
  id?: number;
  label?: string;
  genre_id: number;
}

export interface GenreType {
  id: number;
  label: string;
  selected?: boolean;
}

export interface Book {
  id?: number;
  title: string;
  publisher: string;
  author_id: number;
  bookGenres: BookGenre[];
}

export interface Author {
  id: number;
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
  authors: Author[];
  books: Book[];
  addBook(book: Book): Promise<boolean>;
  addItem(item: Author): Promise<boolean>;
  removeItem(item: Author): Promise<boolean>;
  completeItem(item: Author): Promise<boolean>;
  setCurrentAuthor(author: Author | null): any;
  currentAuthor: Author | null;
  error: string | null;
  setError(arg: string | null): void;
  showSuccess(arg: string | null): void;
}

export const AppContext = React.createContext<AppContextData>({
  authors: [],
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
  onAuthorSelected(author: Author | null): void;
  children?: any;
}) => {
  const [authors, setAuthors] = useState<Author[]>([]);

  const [books, setBooks] = useState<Book[]>([]);

  const [currentAuthor, updateCurrentAuthor] = useState<Author | null>(null);

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

  const addItem = async (item: Author): Promise<boolean> => {
    console.log('AppContextProvider adding Item', item, ' to : ', authors);
    try {
      const author: Author = {id: 0, email: item.email, name: item.name, age: item.age, books: []};
      const results = await axios.post(`${Config.API_URL}/authors`, author);
      console.log('AppContextProvider PostAuthors result :: ', results.data);
      return new Promise((resolve, reject) => {
        setAuthors(authors => {
          resolve(true);
          return [...authors, author];
        });
      });
    } catch (e) {
      console.error('AppContextProvider addItem ERR :: ', e);
      // setError(JSON.stringify(e.message));
      return Promise.reject(e);
    }
  };

  const removeItem = (item: Author): Promise<boolean> => {
    console.log('AppContextProvider removeItem', item, ' to : ', authors);
    return new Promise((resolve, reject) => {
      setAuthors(authors.filter(i => i.id !== item.id));
      resolve(true);
    });
  };

  const completeItem = (item: Author): Promise<boolean> => {
    console.log('AppContextProvider completeItem', item, ' to : ', authors);
    return new Promise((resolve, reject) => {
      // setAuthors(
      //   authors.map(i => {
      //     i.completed = item.id === i.id ? true : i.completed;
      //     return i;
      //   }),
      // );
      resolve(true);
    });
  };

  const getAuthors = async () => {
    console.log('AppContextProvider getItemList START :: ');
    let authors: Author[] = [];
    try {
      console.log('**************  = ', Config.API_URL);
      const results = await axios.get(`${Config.API_URL}/authors`);
      console.log('AppContextProvider getItemList results :: ', results.data);
      authors = results.data;
    } catch (e: any) {
      console.error('AppContextProvider getItemList ERR :: ', e);
      setError(JSON.stringify(e.message));
    }
    console.log('AppContextProvider getItemList then :: ', authors);
    return authors;
  };

  const setCurrentAuthor = (author: Author) => {
    console.log('setCurrentAuthor ::: Author.books :: ', author?.books);
    updateCurrentAuthor(author);
    props.onAuthorSelected(author);
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
    getAuthors().then((authors: Author[]) => {
      console.log('AppContextProvider useEffect getItemList then:: ', authors);
      setAuthors(authors);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        error,
        setError,
        authors,
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
