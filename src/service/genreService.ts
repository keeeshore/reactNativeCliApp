import axios from 'axios';
import Config from 'react-native-config';
import {GenreType} from '../components/AppContextProvider';

export const getGenreTypes = async (): Promise<GenreType[]> => {
  try {
    console.log('getGenreTypes :: ');
    const results = await axios.get(`${Config.API_URL}/genres`);
    console.log('getGenreTypes result :: ', results.data);
    return results.data;
  } catch (e) {
    console.error('getGenreTypes ERR, reject :: ', e);
    // setError(JSON.stringify(e.message));
    return Promise.reject(e);
  }
};
