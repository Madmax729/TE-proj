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
          <SafeAreaView className="flex-1  bg-orange-100">
        {/* Welcome Card */}
        <Animated.View
          style={animatedStyle}
          className="min-h-[200px] p-5 rounded-lg bg-[#F66345] mb-7 relative"
        >
          <Text className="text-[#F4EFCA] text-xl font-bold mt-7">
            Welcome back, {user?.firstName || "User"}!
          </Text>
          <Text className="text-[#F4EFCA] text-base mt-5">
            "Every day may not be good, but there's something good in every day."
          </Text>
          <TouchableOpacity className="absolute top-3 right-3">
            <Link href="/profile">
              <Ionicons name="person-circle-outline" size={32} color="#F4EFCA" />
            </Link>
          </TouchableOpacity>
        </Animated.View>

        {/* 1-on-1 Sessions */}
        <Animated.View style={animatedStyle} className="items-center mb-5">
          <TouchableOpacity className="w-full p-5 rounded-lg bg-[#F4EFCA] flex-row justify-between items-center">
            <Link href="/chat" className="flex-1">
              <View className="flex items-start">
                <Text className="text-[#F66345] text-lg font-bold">1 on 1 Sessions</Text>
                <Text className="text-[#F66345] text-sm mt-1">
                  Let's open up to the things that matter the most.
                </Text>
                <Text className="text-[#F66345] text-lg font-bold mt-2 flex items-center">
                  Talk it out <Ionicons name="chatbubble-ellipses-outline" size={20} color="#F66345" />
                </Text>
              </View>
            </Link>
            <Ionicons name="people-outline" size={40} color="#F66345" />
          </TouchableOpacity>
        </Animated.View>

        {/* Music & Motivational Videos */}
        <View className="flex-row justify-between mb-5 bg-orange-100">
          <TouchableOpacity className="flex-1 p-4 rounded-lg bg-[#F66345] items-center mx-1">
            <Ionicons name="musical-notes-outline" size={28} color="#F4EFCA" />
            <Text className="text-[#F4EFCA] text-lg font-bold">Music</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 p-4 rounded-lg bg-[#F66345] items-center mx-1">
            <Ionicons name="videocam-outline" size={28} color="#F4EFCA" />
            <Text className="text-[#F4EFCA] text-lg font-bold">Motivational Videos</Text>
          </TouchableOpacity>
        </View>

        {/* Additional Sections */}
        <View className="flex-row justify-between mb-5">
          <TouchableOpacity className="flex-1 p-4 rounded-lg bg-[#F66345] items-center mx-1">
            <Ionicons name="medical-outline" size={28} color="#F4EFCA" />
            <Text className="text-[#F4EFCA] text-lg font-bold">Therapist</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 p-4 rounded-lg bg-[#F66345] items-center mx-1">
            <Ionicons name="book-outline" size={28} color="#F4EFCA" />
            <Text className="text-[#F4EFCA] text-lg font-bold">Courses for You</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between mb-5">
          <TouchableOpacity className="flex-1 p-4 rounded-lg bg-[#F66345] items-center mx-1">
            <Ionicons name="people-circle-outline" size={28} color="#F4EFCA" />
            <Text className="text-[#F4EFCA] text-lg font-bold">Join Community</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 p-4 rounded-lg bg-[#F66345] items-center mx-1">
            <Ionicons name="barbell-outline" size={28} color="#F4EFCA" />
            <Text className="text-[#F4EFCA] text-lg font-bold">Exercises</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
}
