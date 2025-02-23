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
      size={34} // Increased for better visibility
      color={focused ? "#00FFFF" : "#B0BEC5"} // Neon blue for active, light gray for inactive
      style={focused ? styles.iconActiveShadow : styles.iconShadow} // Improved outline effect
    />
  </View>
);

export default function Layout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "#65a7de", // Neon blue for active
        tabBarInactiveTintColor: "#B0BEC5", // Light gray for inactive
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon name="home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon name="chatbubble" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon name="person" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    width: width - 20, // Slightly reduced width for better positioning
    height: 64, // Increased height for better spacing
    backgroundColor: "rgba(26, 55, 77, 0.95)", // Semi-transparent for better contrast
    position: "absolute",
    bottom: 15, // Adjusted for better positioning
    left: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3, // Stronger for visibility
    shadowRadius: 10,
    elevation: 12,
  },
  iconWrapper: {
    padding: 14,
    borderRadius: 25,
  },
  iconWrapperActive: {
    backgroundColor: "rgba(0, 255, 255, 0.2)", // Light cyan glow for active tab
  },
  iconShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.5)", // Shadow for inactive icons
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  iconActiveShadow: {
    textShadowColor: "rgba(0, 255, 255, 0.9)", // Strong neon blue glow
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
});
