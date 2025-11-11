import MovieCard from "@/components/MovieCard";
import { Movie } from "@/interfaces/interfaces";
import { getSavedMovies, removeMovie } from "@/services/storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Saved() {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSavedMovies = async () => {
    try {
      setLoading(true);
      const movies = await getSavedMovies();
      setSavedMovies(movies);
    } catch (error) {
      console.error("Error loading saved movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadSavedMovies();
    }, [])
  );

  const handleRemoveMovie = async (movieId: number) => {
    await removeMovie(movieId);
    setSavedMovies((prev) => prev.filter((m) => m.id !== movieId));
  };

  return (
    <SafeAreaView className="flex-1 bg-dark-background">
      <View className="px-5 pt-4 pb-6">
        <Text className="text-white text-3xl font-bold mb-2">Saved Movies</Text>
        <Text className="text-dark-mutedText text-sm">
          {savedMovies.length} {savedMovies.length === 1 ? 'movie' : 'movies'} saved
        </Text>
      </View>

      <ScrollView 
        className="flex-1 px-5" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {loading ? (
          <View className="py-20">
            <ActivityIndicator size="large" color="#FFC857" />
            <Text className="text-dark-mutedText text-center mt-4">Loading...</Text>
          </View>
        ) : savedMovies.length === 0 ? (
          <View className="py-20 items-center">
            <Text className="text-dark-mutedText text-center text-lg mb-2">
              No saved movies yet
            </Text>
            <Text className="text-dark-mutedText text-center text-sm">
              Start saving movies to see them here
            </Text>
          </View>
        ) : (
          <View className="flex-row flex-wrap justify-between">
            {savedMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onSave={() => handleRemoveMovie(movie.id)}
                isSaved={true}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
