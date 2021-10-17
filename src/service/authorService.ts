import axios from 'axios';
import Config from 'react-native-config';
import {Author} from '../components/AppContextProvider';

export const addAuthor = async (author: Author): Promise<Author> => {
  author.books = [
    {
      title: `def_1_${author.name}`,
      publisher: `pub_${author.name}`,
      author_id: 0,
      bookGenres: [{genre_id: 2}, {genre_id: 1}],
    },
    {title: `def_2_${author.name}`, publisher: `pub_2_${author.name}`, author_id: 0, bookGenres: [{genre_id: 3}]},
  ];
  try {
    console.log('AuthorService addAuthor :: ', JSON.stringify(author));
    const results = await axios.post(`${Config.API_URL}/authors`, author);
    console.log('AuthorService addAuthor result :: ', results.data);
    return results.data;
  } catch (e) {
    console.error('AuthorService addAuthor ERR, reject :: ', e);
    // setError(JSON.stringify(e.message));
    return Promise.reject(e);
  }
};

export const deleteAuthor = async (author_id: number): Promise<Author> => {
  try {
    console.log('AuthorService deleteAuthor :: ', author_id);
    const results = await axios.delete(`${Config.API_URL}/authors/${author_id}`);
    console.log('AuthorService deleteAuthor result :: ', results.data);
    return results.data;
  } catch (e) {
    console.error('AuthorService deleteAuthor ERR, reject :: ', e);
    // setError(JSON.stringify(e.message));
    return Promise.reject(e);
  }
};
