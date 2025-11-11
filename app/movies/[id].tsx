import { icons } from "@/constants/icons";
import { MovieDetails } from "@/interfaces/interfaces";
import { fetchMovieDetails } from "@/services/api";
import { isMovieSaved, saveMovie, removeMovie } from "@/services/storage";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [loadingSaved, setLoadingSaved] = useState(true);

  const { data: movie, loading, error } = useFetch(
    () => fetchMovieDetails(Number(id)),
    true
  );

  useEffect(() => {
    const checkSaved = async () => {
      if (id) {
        const saved = await isMovieSaved(Number(id));
        setIsSaved(saved);
        setLoadingSaved(false);
      }
    };
    checkSaved();
  }, [id]);

  const handleSaveToggle = async () => {
    if (!movie) return;
    
    const movieData = {
      id: movie.id,
      title: movie.title,
      adult: movie.adult,
      backdrop_path: movie.backdrop_path || "",
      genre_ids: movie.genres.map((g) => g.id),
      original_language: movie.original_language,
      original_title: movie.original_title,
      overview: movie.overview || "",
      popularity: movie.popularity,
      poster_path: movie.poster_path || "",
      release_date: movie.release_date,
      video: movie.video,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
    };

    if (isSaved) {
      await removeMovie(movie.id);
      setIsSaved(false);
    } else {
      await saveMovie(movieData);
      setIsSaved(true);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-dark-background items-center justify-center">
        <ActivityIndicator size="large" color="#FFC857" />
        <Text className="text-dark-mutedText mt-4">Loading movie details...</Text>
      </SafeAreaView>
    );
  }

  if (error || !movie) {
    return (
      <SafeAreaView className="flex-1 bg-dark-background items-center justify-center px-5">
        <Text className="text-red-500 text-center text-lg mb-4">
          {error?.message || "Failed to load movie details"}
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-accent-500 rounded-full px-6 py-3"
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <SafeAreaView className="flex-1 bg-dark-background">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Backdrop Image */}
        {backdropUrl && (
          <View className="relative h-80">
            <Image
              source={{ uri: backdropUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <View className="absolute inset-0 bg-dark-background/60" />
            <View className="absolute bottom-0 left-0 right-0 h-32 bg-dark-background" />
            
            {/* Header Buttons */}
            <View className="absolute top-12 left-0 right-0 px-5 flex-row justify-between items-center">
              <TouchableOpacity
                onPress={() => router.back()}
                className="bg-black/60 rounded-full p-2"
              >
                <Image 
                  source={icons.arrow} 
                  className="w-6 h-6" 
                  tintColor="#fff"
                  style={{ transform: [{ rotate: '180deg' }] }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSaveToggle}
                className="bg-black/60 rounded-full p-2"
                disabled={loadingSaved}
              >
                <Image
                  source={icons.save}
                  className="w-6 h-6"
                  tintColor={isSaved ? "#FFC857" : "#fff"}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View className="px-5 -mt-20">
          {/* Poster and Basic Info */}
          <View className="flex-row mb-6">
            {posterUrl && (
              <Image
                source={{ uri: posterUrl }}
                className="w-32 h-48 rounded-2xl"
                resizeMode="cover"
              />
            )}
            <View className="flex-1 ml-4 justify-end">
              <Text className="text-white text-2xl font-bold mb-2">{movie.title}</Text>
              <View className="flex-row items-center mb-2">
                <Image source={icons.star} className="w-4 h-4 mr-1" tintColor="#FFC857" />
                <Text className="text-white font-semibold mr-4">
                  {movie.vote_average.toFixed(1)}
                </Text>
                <Text className="text-dark-mutedText text-sm">
                  {movie.vote_count} votes
                </Text>
              </View>
              <Text className="text-dark-mutedText text-sm mb-1">
                {new Date(movie.release_date).getFullYear()} • {movie.runtime} min
              </Text>
              {movie.genres.length > 0 && (
                <View className="flex-row flex-wrap mt-2">
                  {movie.genres.slice(0, 3).map((genre) => (
                    <View
                      key={genre.id}
                      className="bg-dark-200 rounded-full px-3 py-1 mr-2 mb-2"
                    >
                      <Text className="text-white text-xs">{genre.name}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Overview */}
          {movie.overview && (
            <View className="mb-6">
              <Text className="text-white text-xl font-bold mb-3">Overview</Text>
              <Text className="text-dark-mutedText leading-6">{movie.overview}</Text>
            </View>
          )}

          {/* Details */}
          <View className="mb-6">
            <Text className="text-white text-xl font-bold mb-3">Details</Text>
            <View className="bg-dark-200 rounded-2xl p-4">
              {movie.tagline && (
                <View className="mb-3">
                  <Text className="text-dark-mutedText text-xs mb-1">Tagline</Text>
                  <Text className="text-white font-semibold italic">"{movie.tagline}"</Text>
                </View>
              )}
              <View className="mb-3">
                <Text className="text-dark-mutedText text-xs mb-1">Status</Text>
                <Text className="text-white font-semibold">{movie.status}</Text>
              </View>
              {movie.production_companies.length > 0 && (
                <View className="mb-3">
                  <Text className="text-dark-mutedText text-xs mb-1">Production</Text>
                  <Text className="text-white font-semibold">
                    {movie.production_companies.map((c) => c.name).join(", ")}
                  </Text>
                </View>
              )}
              {movie.spoken_languages.length > 0 && (
                <View>
                  <Text className="text-dark-mutedText text-xs mb-1">Languages</Text>
                  <Text className="text-white font-semibold">
                    {movie.spoken_languages.map((l) => l.english_name).join(", ")}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
