import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Movie } from "@/interfaces/interfaces";
import { fetchTrendingMovies, fetchTopRatedMovies } from "@/services/api";
import { isMovieSaved, saveMovie, removeMovie } from "@/services/storage";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const [savedMovieIds, setSavedMovieIds] = useState<Set<number>>(new Set());

  const { data: trendingMovies, loading: trendingLoading } = useFetch(() => fetchTrendingMovies());
  const { data: topRatedMovies, loading: topRatedLoading } = useFetch(() => fetchTopRatedMovies());

  useEffect(() => {
    const checkSavedMovies = async () => {
      const allMovies = [
        ...(trendingMovies || []),
        ...(topRatedMovies || [])
      ];
      if (allMovies.length > 0) {
        const savedIds = new Set<number>();
        for (const movie of allMovies) {
          const saved = await isMovieSaved(movie.id);
          if (saved) savedIds.add(movie.id);
        }
        setSavedMovieIds(savedIds);
      }
    };
    checkSavedMovies();
  }, [trendingMovies, topRatedMovies]);

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
      <Image className="absolute w-full h-full z-0 opacity-20" source={images.bg} resizeMode="cover" />
      
      <ScrollView 
        className="flex-1 px-5" 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View className="mt-4 mb-6">
          <Image source={icons.logo} className="w-16 h-14 mx-auto mb-6" resizeMode="contain" />
          <SearchBar 
            placeholder="Search for movies..." 
            onPress={() => router.push("/search")} 
          />
        </View>

        {/* Trending Movies Section */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-2xl font-bold">Trending Now</Text>
            <TouchableOpacity onPress={() => router.push("/search")}>
              <Text className="text-accent-500 text-sm font-semibold">See All</Text>
            </TouchableOpacity>
          </View>
          {trendingLoading ? (
            <ActivityIndicator size="large" color="#FFC857" className="py-10" />
          ) : trendingMovies && trendingMovies.length > 0 ? (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20 }}
            >
              {trendingMovies.slice(0, 10).map((movie: Movie) => (
                <View key={movie.id} className="mr-4 w-40">
                  <MovieCard 
                    movie={movie} 
                    onSave={() => handleSaveMovie(movie)}
                    isSaved={savedMovieIds.has(movie.id)}
                  />
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text className="text-dark-mutedText text-center py-10">No trending movies found</Text>
          )}
        </View>

        {/* Top Rated Movies Section */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-2xl font-bold">Top Rated</Text>
            <TouchableOpacity onPress={() => router.push("/search")}>
              <Text className="text-accent-500 text-sm font-semibold">See All</Text>
            </TouchableOpacity>
          </View>
          {topRatedLoading ? (
            <ActivityIndicator size="large" color="#FFC857" className="py-10" />
          ) : topRatedMovies && topRatedMovies.length > 0 ? (
            <View className="flex-row flex-wrap justify-between">
              {topRatedMovies.slice(0, 10).map((movie: Movie) => (
                <MovieCard 
                  key={movie.id}
                  movie={movie} 
                  onSave={() => handleSaveMovie(movie)}
                  isSaved={savedMovieIds.has(movie.id)}
                />
              ))}
            </View>
          ) : (
            <Text className="text-dark-mutedText text-center py-10">No top rated movies found</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
