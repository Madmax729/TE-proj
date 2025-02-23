import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform } from "react-native";
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
    Alert.alert(
      "Sign Out", 
      "Are you sure you want to sign out?", 
      [
        { text: "Cancel", style: "cancel" },
        { text: "Sign Out", style: "destructive", onPress: handleSignOut }
      ]
    );
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      Linking.openURL(Linking.createURL("/"));
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <LinearGradient colors={["#4c669f", "#11d7db", "#192f6a"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        {/* Top Bar with Sign Out Button */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingTop: 50 }}>
          <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>Profile</Text>
          <TouchableOpacity onPress={confirmSignOut} style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
            <Feather name="log-out" size={20} color="white" />
            <Text style={{ color: "white", fontSize: 18, marginLeft: 5 }}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <MotiView
            from={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            style={{ alignItems: "center", marginBottom: 20 }}
          >
            {/* Profile Avatar */}
            <View style={{ width: 110, height: 110, borderRadius: 55, borderWidth: 3, borderColor: "#FFD700", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
              <Image
                source={{ uri: "https://via.placeholder.com/150" }} 
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            </View>

            <Text style={{ fontSize: 24, fontWeight: "bold", color: "white", marginTop: 10 }}>Hello, {name.split(" ")[0]}!</Text>
            <Text style={{ fontSize: 16, color: "lightgray" }}>Welcome to your profile</Text>
          </MotiView>

          {/* Editable Fields */}
          {[
            { label: "Name", value: name, onChange: setName },
            { label: "Email", value: email, onChange: setEmail },
            { label: "Hobbies", value: hobbies, onChange: setHobbies },
            { label: "Profession", value: profession, onChange: setProfession },
            { label: "Location", value: location, onChange: setLocation },
            { label: "Bio", value: bio, onChange: setBio, multiline: true },
          ].map((field, index) => (
            <View key={index} style={{ backgroundColor: "white", padding: 15, borderRadius: 10, shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 5, marginBottom: 15 }}>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "gray" }}>{field.label}</Text>
              <TextInput
                value={field.value}
                onChangeText={field.onChange}
                multiline={field.multiline}
                style={{ fontSize: 16, color: "black", paddingVertical: 5 }}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
              />
            </View>
          ))}
        </ScrollView>

        {/* Save Button - Appears when scrolled to bottom */}
        {showButton && (
          <View style={{ position: "absolute", bottom: 20, left: 0, right: 0, alignItems: "center" }}>
            <TouchableOpacity style={{ width: "90%", borderRadius: 50, overflow: "hidden", shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 5 }}>
              <LinearGradient colors={["#6a11cb", "#2575fc"]} style={{ paddingVertical: 12, alignItems: "center" }}>
                <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Save Changes</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
    