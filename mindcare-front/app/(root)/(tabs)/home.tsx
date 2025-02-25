import React, { useEffect } from "react";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function HomePage() {
  const { user } = useUser();
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.exp) });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <LinearGradient colors={["#4c669f", "#11d7db", "#192f6a"]} className="flex-1 p-5">
      <SafeAreaView className="flex-1">
        {/* Welcome Card */}
        <Animated.View
          style={animatedStyle}
          className="min-h-[200px] p-5 rounded-lg bg-blue-900 mb-7 relative"
        >
          <Text className="text-white text-xl font-bold mt-7">
            Welcome back, {user?.firstName || "User"}!
          </Text>
          <Text className="text-cyan-100 text-base mt-5">
            "Every day may not be good, but there's something good in every day."
          </Text>
          <TouchableOpacity className="absolute top-3 right-3">
            <Link href="/profile">
              <Ionicons name="person-circle-outline" size={32} color="#fff" />
            </Link>
          </TouchableOpacity>
        </Animated.View>

        {/* 1-on-1 Sessions */}
        <Animated.View style={animatedStyle} className="items-center mb-5">
          <TouchableOpacity className="w-full p-5 rounded-lg bg-cyan-400 flex-row justify-between items-center">
            <Link href="/chat" className="flex-1">
              <View className="flex items-start">
                <Text className="text-blue-900 text-lg font-bold">1 on 1 Sessions</Text>
                <Text className="text-indigo-600 text-sm mt-1">
                  Let's open up to the things that matter the most.
                </Text>
                <Text className="text-orange-500 text-lg font-bold mt-2 flex items-center">
                  Talk it out <Ionicons name="chatbubble-ellipses-outline" size={20} color="#FF7A00" />
                </Text>
              </View>
            </Link>
            <Ionicons name="people-outline" size={40} color="#192f6a" />
          </TouchableOpacity>
        </Animated.View>

        {/* Music & Motivational Videos */}
        <View className="flex-row justify-between mb-5">
          <TouchableOpacity className="flex-1 p-4 rounded-lg bg-blue-900 items-center mx-1">
            <Ionicons name="musical-notes-outline" size={28} color="#fff" />
            <Text className="text-white text-lg font-bold">Music</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 p-4 rounded-lg bg-blue-900 items-center mx-1">
            <Ionicons name="videocam-outline" size={28} color="#fff" />
            <Text className="text-white text-lg font-bold">Motivational Videos</Text>
          </TouchableOpacity>
        </View>

        {/* Additional Sections */}
        <View className="flex-row justify-between mb-5">
          <TouchableOpacity className="flex-1 p-4 rounded-lg bg-blue-900 items-center mx-1">
            <Ionicons name="medical-outline" size={28} color="#fff" />
            <Text className="text-white text-lg font-bold">Therapist</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 p-4 rounded-lg bg-blue-900 items-center mx-1">
            <Ionicons name="book-outline" size={28} color="#fff" />
            <Text className="text-white text-lg font-bold">Courses for You</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between mb-5">
          <TouchableOpacity className="flex-1 p-4 rounded-lg bg-blue-900 items-center mx-1">
            <Ionicons name="people-circle-outline" size={28} color="#fff" />
            <Text className="text-white text-lg font-bold">Join Community</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 p-4 rounded-lg bg-blue-900 items-center mx-1">
            <Ionicons name="barbell-outline" size={28} color="#fff" />
            <Text className="text-white text-lg font-bold">Exercises</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
