import { icons } from "@/constants/icons";
import { getSavedMovies } from "@/services/storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const [savedCount, setSavedCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const loadStats = async () => {
        const movies = await getSavedMovies();
        setSavedCount(movies.length);
      };
      loadStats();
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-dark-background">
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View className="px-5 pt-4 pb-8">
          <Text className="text-white text-3xl font-bold mb-2">Profile</Text>
          <Text className="text-dark-mutedText text-sm">Manage your account and preferences</Text>
        </View>

        {/* Profile Section */}
        <View className="px-5 mb-6">
          <View className="items-center mb-6">
            <View className="w-24 h-24 rounded-full bg-dark-200 items-center justify-center mb-4 border-2 border-accent-500">
              <Image 
                source={icons.person} 
                className="w-16 h-16" 
                tintColor="#A7B4C2"
              />
            </View>
            <Text className="text-white text-2xl font-bold mb-1">Movie Enthusiast</Text>
            <Text className="text-dark-mutedText text-sm">movizz@user.com</Text>
          </View>

          {/* Stats Cards */}
          <View className="flex-row justify-between mb-6">
            <View className="flex-1 bg-dark-200 rounded-2xl p-4 mr-2">
              <Text className="text-accent-500 text-3xl font-bold mb-1">{savedCount}</Text>
              <Text className="text-dark-mutedText text-sm">Saved Movies</Text>
            </View>
            <View className="flex-1 bg-dark-200 rounded-2xl p-4 ml-2">
              <Text className="text-secondary-500 text-3xl font-bold mb-1">∞</Text>
              <Text className="text-dark-mutedText text-sm">Movies Watched</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-5">
          <Text className="text-white text-lg font-semibold mb-4">Settings</Text>
          
          <TouchableOpacity className="bg-dark-200 rounded-xl p-4 mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-dark-100 items-center justify-center mr-3">
                <Image source={icons.person} className="w-5 h-5" tintColor="#A7B4C2" />
              </View>
              <View>
                <Text className="text-white font-semibold">Account Settings</Text>
                <Text className="text-dark-mutedText text-xs">Manage your account</Text>
              </View>
            </View>
            <Image source={icons.arrow} className="w-5 h-5" tintColor="#A7B4C2" />
          </TouchableOpacity>

          <TouchableOpacity className="bg-dark-200 rounded-xl p-4 mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-dark-100 items-center justify-center mr-3">
                <Image source={icons.star} className="w-5 h-5" tintColor="#FFC857" />
              </View>
              <View>
                <Text className="text-white font-semibold">Preferences</Text>
                <Text className="text-dark-mutedText text-xs">Customize your experience</Text>
              </View>
            </View>
            <Image source={icons.arrow} className="w-5 h-5" tintColor="#A7B4C2" />
          </TouchableOpacity>

          <TouchableOpacity className="bg-dark-200 rounded-xl p-4 mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-dark-100 items-center justify-center mr-3">
                <Image source={icons.save} className="w-5 h-5" tintColor="#00C2CB" />
              </View>
              <View>
                <Text className="text-white font-semibold">Data & Privacy</Text>
                <Text className="text-dark-mutedText text-xs">Privacy settings</Text>
              </View>
            </View>
            <Image source={icons.arrow} className="w-5 h-5" tintColor="#A7B4C2" />
          </TouchableOpacity>

          <TouchableOpacity className="bg-dark-200 rounded-xl p-4 mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-dark-100 items-center justify-center mr-3">
                <Image source={icons.search} className="w-5 h-5" tintColor="#D7263D" />
              </View>
              <View>
                <Text className="text-white font-semibold">About</Text>
                <Text className="text-dark-mutedText text-xs">App version and info</Text>
              </View>
            </View>
            <Image source={icons.arrow} className="w-5 h-5" tintColor="#A7B4C2" />
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View className="px-5 mt-8 items-center">
          <Image source={icons.logo} className="w-12 h-10 mb-2" resizeMode="contain" />
          <Text className="text-dark-mutedText text-xs">Movizz App v1.0.0</Text>
          <Text className="text-dark-mutedText text-xs mt-1">Powered by TMDB</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
