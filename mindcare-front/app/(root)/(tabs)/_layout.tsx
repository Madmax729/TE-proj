import { Tabs } from "expo-router";
import { View, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window"); // Full screen width

const TabIcon = ({
  name,
  focused,
}: {
  name: keyof typeof Ionicons.glyphMap;
  focused: boolean;
}) => (
  <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
    <Ionicons 
      name={name} 
      size={30} // Slightly larger for better visibility
      color={focused ? "#FFFFFF" : "#D3D3D3"} // Improved contrast for outline
      style={styles.iconShadow} // Apply stroke effect
    />
  </View>
);

export default function Layout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#D3D3D3",
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon name="home-outline" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon name="chatbubble-outline" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon name="person-outline" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    width: width, // Full width
    height: 58, // Reduced for minimalism
    backgroundColor: "#1A374D", // Deep navy blue
    position: "absolute",
    bottom: 10, // Prevents too low positioning
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  iconWrapper: {
    padding: 10,
    borderRadius: 15,
  },
  iconWrapperActive: {
    backgroundColor: "rgba(255, 255, 255, 0.12)", // Subtle glow for active tab
  },
  iconShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.6)", // Black shadow to create an outline
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
