import React from 'react';
import {Text, StyleSheet, Pressable, TextStyle, ImageStyle, ViewStyle} from 'react-native';

export default function Button(props: {
  onPress(args: any): void;
  customStyles?: TextStyle | ImageStyle | ViewStyle;
  title?: string;
}) {
  const {onPress, title = 'Save', customStyles} = props;
  return (
    <Pressable style={{...styles.button, ...customStyles}} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 3,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginHorizontal: 2,
    marginVertical: 2,
  },
  text: {
    fontSize: 10,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
