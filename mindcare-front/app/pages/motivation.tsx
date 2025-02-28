import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { WebView } from "react-native-webview";
import Icon from "react-native-vector-icons/AntDesign";

const videosData = [
  {
    id: "1",
    title: "Overcome Depression & Anxiety - Motivational Video",
    url: "https://www.youtube.com/watch?v=ga-MniJxQz8",
    thumbnail: require("../../assets/images/1.jpg"),
    liked: false,
  },
  {
    id: "2",
    title: "Want Stable Mental Health? Take Charge Of Your Feelings",
    url: "https://www.youtube.com/watch?v=O9qRyFOLdQk",
    thumbnail: require("../../assets/images/2.jpg"),
    liked: false,
  },
  {
    id: "3",
    title: "YOU ARE STRONG - Inspiring Speech On Depression & Mental Health",
    url: "https://www.youtube.com/watch?v=-GXfLY4-d8w",
    thumbnail: require("../../assets/images/4.jpg"),
    liked: false,
  },
];

const VideoCard = ({ video, onSelect, onLike }) => (
  <View className="bg-white p-4 mb-4 rounded-xl shadow-lg">
    <Image source={video.thumbnail} className="w-full h-44 rounded-xl mb-3" />
    <Text className="text-lg font-semibold text-center text-gray-800 mb-2">{video.title}</Text>
    <View className="flex-row justify-between items-center">
      <TouchableOpacity 
        className="bg-orange-700 py-3 px-5 rounded-lg flex-1 mr-2 shadow-md"
        onPress={() => onSelect(video.url)}
      >
        <Text className="text-white text-center text-sm font-bold">▶ Watch Now</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onLike(video.id)} className="py-3 px-5">
        <Icon name={video.liked ? "like1" : "like2"} size={24} color={video.liked ? "blue" : "gray"} />
      </TouchableOpacity>
    </View>
  </View>
);

export default function MotivationVideosPage() {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState(videosData);

  const handleLike = (id) => {
    setVideos((prevVideos) =>
      prevVideos
        .map((video) => (video.id === id ? { ...video, liked: !video.liked } : video))
        .sort((a, b) => b.liked - a.liked || a.id - b.id)
    );
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <TouchableOpacity onPress={() => router.push("/(root)/(tabs)/home")} className="mb-3">
        <Text className="text-lg font-semibold text-gray-700">← Back</Text>
      </TouchableOpacity>
      <Text className="text-2xl font-bold text-center text-orange-800 mb-4">
        ✨ Motivational Videos ✨
      </Text>
      {selectedVideo ? (
        <WebView source={{ uri: selectedVideo }} className="w-full h-64 rounded-xl mb-4" />
      ) : (
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <VideoCard video={item} onSelect={setSelectedVideo} onLike={handleLike} />}
        />
      )}
    </View>
  );
}
