import { icons } from '@/constants/icons';
import React from 'react';
import { Image, Pressable, TextInput, View } from 'react-native';

interface Props {
  placeholder: string;
  onPress?: () => void;
  editable?: boolean;
}

const SearchBar = ({ placeholder, onPress, editable = false }: Props) => {
  if (onPress && !editable) {
    return (
      <Pressable onPress={onPress} className='flex-row items-center bg-dark-200 px-5 rounded-full py-4'>
        <Image source={icons.search} className='size-5' resizeMode='contain' tintColor="#ab8bff"/>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#ab8bff"
          className='flex-1 ml-2 text-white'
          editable={false}
          pointerEvents="none"
        />
      </Pressable>
    );
  }

  return (
    <View className='flex-row items-center bg-dark-200 px-5 rounded-full py-4'>
      <Image source={icons.search} className='size-5' resizeMode='contain' tintColor="#ab8bff"/>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#ab8bff"
        className='flex-1 ml-2 text-white'
      />
    </View>
  );
}

export default SearchBar; 