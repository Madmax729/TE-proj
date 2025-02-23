import React from "react";
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

  React.useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.exp) });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <LinearGradient colors={["#4c669f", "#11d7db", "#192f6a"]} style={{ flex: 1, padding: 20 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Welcome Card */}
        <Animated.View
          style={[
            {
              minHeight: 200,
              padding: 20,
              borderRadius: 10,
              backgroundColor: "#192f6a",
              marginBottom: 30,
              position: "relative",
            },
            animatedStyle,
          ]}
        >
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "#fff", marginTop: 30 }}>
            Welcome back, {user?.firstName || "User"}!
          </Text>
          <Text style={{ fontSize: 16, color: "#e0f7fa", marginTop: 40 }}>
            "Every day may not be good, but there's something good in every day."
          </Text>
          <TouchableOpacity style={{ position: "absolute", top: 15, right: 15 }}>
            <Link href="/profile">
              <Ionicons name="person-circle-outline" size={32} color="#fff" />
            </Link>
          </TouchableOpacity>
        </Animated.View>

        {/* 1-on-1 Sessions */}
        <Animated.View style={[{ alignItems: "center", marginBottom: 20 }, animatedStyle]}>
          <TouchableOpacity
            style={{
              width: "100%",
              padding: 20,
              borderRadius: 15,
              backgroundColor: "#11d7db",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link href="/chat">
              <View style={{ flex: 1, alignItems: "flex-start" }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "#192f6a" }}>
                  1 on 1 Sessions
                </Text>
                <Text style={{ fontSize: 14, color: "#4c669f", marginTop: 5 }}>
                  Let's open up to the things that matter the most.
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    color: "#FF7A00",
                    marginTop: 10,
                  }}
                >
                  Talk it out <Ionicons name="chatbubble-ellipses-outline" size={22} color="#FF7A00" />
                </Text>
              </View>
            </Link>
            <View style={{ marginLeft: 10 }}>
              <Ionicons name="people-outline" size={40} color="#192f6a" />
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Music & Motivational Videos */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              padding: 15,
              borderRadius: 10,
              backgroundColor: "#192f6a",
              alignItems: "center",
              marginHorizontal: 5,
            }}
          >
            <Ionicons name="musical-notes-outline" size={28} color="#fff" />
            <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>Music</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              padding: 15,
              borderRadius: 10,
              backgroundColor: "#192f6a",
              alignItems: "center",
              marginHorizontal: 5,
            }}
          >
            <Ionicons name="videocam-outline" size={28} color="#fff" />
            <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>
              Motivational Videos
            </Text>
          </TouchableOpacity>
        </View>

        {/* Additional Sections */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              padding: 15,
              borderRadius: 10,
              backgroundColor: "#192f6a",
              alignItems: "center",
              marginHorizontal: 5,
            }}
          >
            <Ionicons name="medical-outline" size={28} color="#fff" />
            <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>Therapist</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              padding: 15,
              borderRadius: 10,
              backgroundColor: "#192f6a",
              alignItems: "center",
              marginHorizontal: 5,
            }}
          >
            <Ionicons name="book-outline" size={28} color="#fff" />
            <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>Courses for You</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              padding: 15,
              borderRadius: 10,
              backgroundColor: "#192f6a",
              alignItems: "center",
              marginHorizontal: 5,
            }}
          >
            <Ionicons name="people-circle-outline" size={28} color="#fff" />
            <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>Join Community</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              padding: 15,
              borderRadius: 10,
              backgroundColor: "#192f6a",
              alignItems: "center",
              marginHorizontal: 5,
            }}
          >
            <Ionicons name="barbell-outline" size={28} color="#fff" />
            <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>Exercises</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
