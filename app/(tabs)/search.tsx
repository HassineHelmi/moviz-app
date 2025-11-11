import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/interfaces/interfaces";
import { fetchMovie } from "@/services/api";
import { isMovieSaved, saveMovie, removeMovie } from "@/services/storage";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [savedMovieIds, setSavedMovieIds] = useState<Set<number>>(new Set());

  const { data: movies, loading, error, refetch } = useFetch(
    () => fetchMovie({ query: searchQuery }),
    false
  );

  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      const timeoutId = setTimeout(() => {
        refetch();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery]);

  useEffect(() => {
    const checkSavedMovies = async () => {
      if (movies) {
        const savedIds = new Set<number>();
        for (const movie of movies) {
          const saved = await isMovieSaved(movie.id);
          if (saved) savedIds.add(movie.id);
        }
        setSavedMovieIds(savedIds);
      }
    };
    checkSavedMovies();
  }, [movies]);

  const handleSaveMovie = async (movie: Movie) => {
    const isSaved = savedMovieIds.has(movie.id);
    if (isSaved) {
      await removeMovie(movie.id);
      setSavedMovieIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(movie.id);
        return newSet;
      });
    } else {
      await saveMovie(movie);
      setSavedMovieIds((prev) => new Set(prev).add(movie.id));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-dark-background">
      <View className="px-5 pt-4 pb-6">
        <Text className="text-white text-3xl font-bold mb-2">Search</Text>
        <Text className="text-dark-mutedText text-sm mb-4">
          Discover your next favorite movie
        </Text>
        <View className="flex-row items-center bg-dark-200 px-5 rounded-full py-4">
          <TextInput
            placeholder="Search for movies..."
            placeholderTextColor="#A7B4C2"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-white text-base"
            autoFocus
          />
        </View>
      </View>

      <ScrollView 
        className="flex-1 px-5" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {loading ? (
          <View className="py-20">
            <ActivityIndicator size="large" color="#FFC857" />
            <Text className="text-dark-mutedText text-center mt-4">Searching...</Text>
          </View>
        ) : error ? (
          <View className="py-20">
            <Text className="text-red-500 text-center">{error.message}</Text>
          </View>
        ) : searchQuery.trim().length === 0 ? (
          <View className="py-20">
            <Text className="text-dark-mutedText text-center text-lg">
              Start typing to search for movies
            </Text>
          </View>
        ) : movies && movies.length > 0 ? (
          <>
            <Text className="text-white text-xl font-semibold mb-4">
              {movies.length} {movies.length === 1 ? 'result' : 'results'} found
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {movies.map((movie: Movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onSave={() => handleSaveMovie(movie)}
                  isSaved={savedMovieIds.has(movie.id)}
                />
              ))}
            </View>
          </>
        ) : (
          <View className="py-20">
            <Text className="text-dark-mutedText text-center text-lg">
              No movies found for "{searchQuery}"
            </Text>
            <Text className="text-dark-mutedText text-center text-sm mt-2">
              Try a different search term
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
