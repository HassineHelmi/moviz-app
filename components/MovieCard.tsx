import { icons } from '@/constants/icons';
import { Movie } from '@/interfaces/interfaces';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

interface MovieCardProps {
  movie: Movie;
  onSave?: () => void;
  isSaved?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onSave, isSaved = false }) => {
  const router = useRouter();
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const handlePress = () => {
    router.push(`/movies/${movie.id}`);
  };

  return (
    <Pressable
      onPress={handlePress}
      className="w-[48%] mb-4 rounded-2xl overflow-hidden bg-dark-200"
    >
      <View className="relative">
        <Image
          source={{ uri: posterUrl }}
          className="w-full h-64"
          resizeMode="cover"
        />
        {onSave && (
          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              onSave();
            }}
            className="absolute top-2 right-2 bg-black/60 rounded-full p-2"
          >
            <Image
              source={icons.save}
              className="w-5 h-5"
              tintColor={isSaved ? '#FFC857' : '#A7B4C2'}
            />
          </Pressable>
        )}
        <View className="absolute bottom-2 left-2 flex-row items-center bg-black/60 rounded-full px-2 py-1">
          <Image source={icons.star} className="w-3 h-3 mr-1" tintColor="#FFC857" />
          <Text className="text-white text-xs font-semibold">
            {movie.vote_average.toFixed(1)}
          </Text>
        </View>
      </View>
      <View className="p-3">
        <Text className="text-white font-semibold text-sm mb-1" numberOfLines={1}>
          {movie.title}
        </Text>
        <Text className="text-dark-mutedText text-xs">
          {new Date(movie.release_date).getFullYear()}
        </Text>
      </View>
    </Pressable>
  );
};

export default MovieCard;

