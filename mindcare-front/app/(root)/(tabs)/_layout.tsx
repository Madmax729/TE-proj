import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TabIcon = ({ name, focused }) => (
  <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
    <Ionicons 
      name={name} 
      size={30} 
      color={focused ? "#00FFFF" : "#B0BEC5"} 
      style={focused ? styles.iconActiveShadow : styles.iconShadow} 
    />
  </View>
);

export default function Layout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#B0BEC5",
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
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: "rgba(26, 55, 77, 0.95)",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 12,
  },
  iconWrapper: {
    padding: 12,
    borderRadius: 20,
  },
  iconWrapperActive: {
    backgroundColor: "rgba(0, 255, 255, 0.2)",
  },
  iconShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  iconActiveShadow: {
    textShadowColor: "rgba(0, 255, 255, 1)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
});
