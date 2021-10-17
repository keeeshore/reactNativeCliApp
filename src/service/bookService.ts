import axios from 'axios';
import Config from 'react-native-config';
import {Author, Book} from '../components/AppContextProvider';

export const addBook = async (book: Book): Promise<Book | any> => {
  try {
    console.log('addBook  data :: ', book);
    const results = await axios.post(`${Config.API_URL}/book`, book);
    console.log('addBook  result :: ', results.data);
    return Promise.resolve(results.data);
  } catch (e) {
    console.error('addBook  ERR :: ', e);
    return Promise.reject(e);
  }
};

export const updateBook = async (book: Book): Promise<Book | any> => {
  try {
    console.log('addBook  data :: ', book);
    const results = await axios.put(`${Config.API_URL}/book`, book);
    console.log('addBook  result :: ', results.data);
    return Promise.resolve(results.data);
  } catch (e) {
    console.error('addBook  ERR :: ', e);
    return Promise.reject(e);
  }
};
