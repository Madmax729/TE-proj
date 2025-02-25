import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { useState, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { Feather } from "@expo/vector-icons";
import { useClerk } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";

export default function ProfileScreen() {
  const { signOut } = useClerk();
  const [name, setName] = useState("Mayank Wankhede");
  const [email, setEmail] = useState("wankhedemayank258@gmail.com");
  const [hobbies, setHobbies] = useState("Gaming, Reading, Coding");
  const [profession, setProfession] = useState("Student");
  const [location, setLocation] = useState("Mumbai, India");
  const [bio, setBio] = useState("Passionate about coding and technology!");

  const [showButton, setShowButton] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    setShowButton(isBottom);
  };

  const confirmSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", style: "destructive", onPress: handleSignOut }
    ]);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      Linking.openURL(Linking.createURL("/"));
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const profileFields = [
    { label: "Name", value: name, onChange: setName },
    { label: "Email", value: email, onChange: setEmail },
    { label: "Hobbies", value: hobbies, onChange: setHobbies },
    { label: "Profession", value: profession, onChange: setProfession },
    { label: "Location", value: location, onChange: setLocation },
    { label: "Bio", value: bio, onChange: setBio, multiline: true },
  ];

  return (
    <LinearGradient colors={["#4c669f", "#11d7db", "#192f6a"]} className="flex-1">
      <View className="flex-1 pb-12">
        {/* Header with Sign Out Button */}
        <View className="flex-row justify-between items-center px-6 pt-12">
          <Text className="text-white text-3xl font-bold">Profile</Text>
          <TouchableOpacity onPress={confirmSignOut} className="flex-row items-center p-2">
            <Feather name="log-out" size={20} color="white" />
            <Text className="text-white text-lg ml-2">Sign Out</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollViewRef}
          className="flex-1 p-6 pb-4"
          contentContainerStyle={{ minHeight: "100%" }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {/* Profile Header */}
          <MotiView
            from={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="flex items-center mb-5"
          >
            <View className="w-28 h-28 rounded-full border-4 border-yellow-500 flex items-center justify-center overflow-hidden">
              <Image source={{ uri: "https://via.placeholder.com/150" }} className="w-24 h-24 rounded-full" />
            </View>

            <Text className="text-3xl font-bold mt-4 text-white">Hello, {name.split(" ")[0]}!</Text>
            <Text className="text-gray-200 text-lg">Welcome to your profile</Text>
          </MotiView>

          {/* Editable Fields */}
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-6"
          >
            {profileFields.map((field, index) => (
              <ProfileField
                key={field.label}
                label={field.label}
                value={field.value}
                onChange={field.onChange}
                multiline={field.multiline}
                isLast={index === profileFields.length - 1}
              />
            ))}
          </MotiView>
        </ScrollView>
      </View>

      {/* Save Button - Appears after full scroll */}
      {showButton && (
        <View className="absolute bottom-10 left-0 right-0 mb-5 flex items-center">
          <TouchableOpacity className="w-11/12 rounded-full shadow-lg overflow-hidden">
            <LinearGradient colors={["#6a11cb", "#2575fc"]} className="py-3 px-8 flex items-center">
              <Text className="text-white font-bold text-lg">Save Changes</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
}

const ProfileField = ({
  label,
  value,
  onChange,
  multiline = false,
  isLast = false,
}: {
  label: string;
  value: string;
  onChange: (text: string) => void;
  multiline?: boolean;
  isLast?: boolean;
}) => (
  <View className={`bg-[#f8f8ff] p-3  rounded-xl shadow-md mt-2 border border-gray-300 ${isLast ? "mb-24" : ""}`}>
    <Text className="text-gray-700 text-sm font-semibold">{label}</Text>
    <View className="flex-row items-center mt-2">
      <TextInput
        value={value}
        onChangeText={onChange}
        multiline={multiline}
        className="flex-1 text-lg text-gray-800"
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
      <Feather name="edit-3" size={18} color="gray" />
    </View>
  </View>
);
