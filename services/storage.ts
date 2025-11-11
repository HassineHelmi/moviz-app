import { Movie } from "@/interfaces/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SAVED_MOVIES_KEY = "@movizz_saved_movies";

export const saveMovie = async (movie: Movie): Promise<void> => {
  try {
    const savedMovies = await getSavedMovies();
    const exists = savedMovies.some((m) => m.id === movie.id);
    if (!exists) {
      savedMovies.push(movie);
      await AsyncStorage.setItem(SAVED_MOVIES_KEY, JSON.stringify(savedMovies));
    }
  } catch (error) {
    console.error("Error saving movie:", error);
    throw error;
  }
};

export const removeMovie = async (movieId: number): Promise<void> => {
  try {
    const savedMovies = await getSavedMovies();
    const filtered = savedMovies.filter((m) => m.id !== movieId);
    await AsyncStorage.setItem(SAVED_MOVIES_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Error removing movie:", error);
    throw error;
  }
};

export const getSavedMovies = async (): Promise<Movie[]> => {
  try {
    const data = await AsyncStorage.getItem(SAVED_MOVIES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error getting saved movies:", error);
    return [];
  }
};

export const isMovieSaved = async (movieId: number): Promise<boolean> => {
  try {
    const savedMovies = await getSavedMovies();
    return savedMovies.some((m) => m.id === movieId);
  } catch (error) {
    console.error("Error checking saved movie:", error);
    return false;
  }
};
