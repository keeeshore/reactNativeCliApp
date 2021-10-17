import React, {useState, useEffect, useContext, ReactFragment, ChangeEvent} from 'react';
import {Book, AppContext, BookGenre, GenreType} from '../AppContextProvider';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import Button from '../shared/Button';
import {getGenreTypes} from '../../service/genreService';
import {addBook} from '../../service/bookService';

const styles = StyleSheet.create({
  input: {
    height: 25,
    margin: 2,
    borderWidth: 1,
    padding: 3,
    flex: 1,
  },
});

interface AddBookProps {
  author_id: number;
  book: Book | null;
  onBookAdded(book: Book): any;
}

export const AddBook = (props: AddBookProps) => {
  const [title, setTitle] = useState('');

  const [publisher, setPublisher] = useState('');

  const [genreTypes, setGenreTypes] = useState<GenreType[]>([]);

  const {error, setError, showSuccess} = useContext(AppContext);

  const add = async (options: {title: string; publisher: string; author_id: number}) => {
    if (!options.title || !options.publisher) {
      setError('Title and Publisher is required');
      return;
    }
    const bookGenres = genreTypes
      .filter(genreType => {
        console.log('ADD book filter: genreType : ', genreType);
        return genreType.selected;
      })
      .map(genreType => {
        return {
          genre_id: genreType.id,
          label: genreType.label,
        };
      });
    console.log('ADD book: genres : ', bookGenres);
    setError(null);
    const book: Book = {
      title: options.title,
      author_id: options.author_id,
      publisher: options.publisher,
      bookGenres: bookGenres,
    };
    try {
      await addBook(book);
      // await addBook(book);
      showSuccess(`Book Added for ${options.author_id}`);
      return props.onBookAdded(book);
    } catch (e: any) {
      setError(JSON.stringify(e.message));
    }
  };

  const resetGenreTypes = async () => {
    const result = await getGenreTypes();
    setGenreTypes(result);
  };

  useEffect(() => {
    setError(null);
  }, [setError]);

  useEffect(() => {
    resetGenreTypes();
  }, []);

  useEffect(() => {
    console.log('AddBook props.book useEffect!!');
    const updateBookDetails = async (book: Book) => {
      setTitle(book.title);
      setPublisher(book.publisher);
      const genres: GenreType[] = [];
      genreTypes.forEach((gt: GenreType) => {
        gt.selected = false;
        book.bookGenres.forEach(bg => {
          if (bg.label === gt.label) {
            gt.selected = true;
          }
        });
        genres.push(gt);
      });
      setGenreTypes(genres);
    };
    if (props.book) {
      updateBookDetails(props.book);
    }
  }, [props.book]);

  return (
    <>
      <View
        style={{
          flex: 1,
          marginBottom: 5,
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <View style={{flex: 2}}>
          <TextInput placeholder={'Title'} style={styles.input} value={title} onChangeText={setTitle} />
          <TextInput placeholder={'Publisher'} style={styles.input} value={publisher} onChangeText={setPublisher} />
          <View style={{display: 'flex', flexDirection: 'row'}}>
            {genreTypes.map((genreType: GenreType, key: number) => {
              return (
                <Button
                  key={key}
                  customStyles={genreType.selected ? {backgroundColor: 'green'} : {backgroundColor: 'grey'}}
                  onPress={() => {
                    console.log('GenreType clicked....', genreType);
                    const items = [...genreTypes];
                    const indexId = genreTypes.indexOf(genreType);
                    const item = items[indexId];
                    item.selected = !item.selected;
                    items[indexId] = item;
                    setGenreTypes(items);
                  }}
                  title={`${genreType.label} ${genreType.selected ? '-' : '+'}`}
                />
              );
            })}
          </View>
          {error && (
            <View style={{flex: 1}}>
              <Text style={{color: 'black', backgroundColor: 'red', padding: 5, margin: 5}}>{error}</Text>
            </View>
          )}
          <Button
            customStyles={{backgroundColor: '#ff8609', paddingVertical: 3, fontSize: 15}}
            title={props.book ? 'Update Book' : 'Add Book'}
            onPress={() => {
              add({title, publisher, author_id: props.author_id});
            }}
          />
        </View>
      </View>
    </>
  );
};
