import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from "react-native";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";  
const API_URL = "https://your-music-api.com/tracks"; // Replace with a real music API

const MusicScreen = () => {
  const router = useRouter();
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // ✅ Ensure correct access to tracks
        if (Array.isArray(data)) {
          setSongs(data);
          setFilteredSongs(data);
        } else if (data.tracks && Array.isArray(data.tracks)) {
          setSongs(data.tracks);
          setFilteredSongs(data.tracks);
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (error) {
        console.error("Error fetching music:", error);
        // Fallback mock data
        setSongs([
          {
            id: "1",
            title: "Nature Sound",
            artist: "Relaxing Sounds",
            preview: "https://sample-music-url.com/song1.mp3",
            image: "https://example.com/image1.jpg",
          },
          {
            id: "2",
            title: "Ocean Waves",
            artist: "Calm Audio",
            preview: "https://sample-music-url.com/song2.mp3",
            image: "https://example.com/image2.jpg",
          },
        ]);
        setFilteredSongs(songs);
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, []);

  useEffect(() => {
    if (search) {
      setFilteredSongs(
        songs.filter((song) =>
          song.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredSongs(songs);
    }
  }, [search, songs]);

  const playSound = async (url) => {
    if (sound) {
      await sound.unloadAsync();
    }

    try {
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
      setSound(newSound);
      setCurrentTrack(url);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPosition(status.positionMillis);
          setDuration(status.durationMillis || 1);
        }
      });

      await newSound.playAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const togglePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const seekForward = async () => {
    if (sound) {
      await sound.setPositionAsync(position + 15000);
    }
  };

  const seekBackward = async () => {
    if (sound) {
      await sound.setPositionAsync(Math.max(position - 15000, 0));
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
      <Stack.Screen options={{ headerShown: false }} />
      {/* Header */}
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#333" }}>←</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", marginVertical: 10 }}>
        Relaxing Music
      </Text>

      {/* Search Bar */}
      <TextInput
        style={{
          backgroundColor: "#f1f1f1",
          padding: 12,
          borderRadius: 10,
          marginBottom: 10,
          fontSize: 16,
        }}
        placeholder="Search for sounds..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="#888" />
      ) : (
        <FlatList
          data={filteredSongs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#f9f9f9",
                padding: 10,
                borderRadius: 10,
                marginBottom: 10,
              }}
              onPress={() => playSound(item.preview)}
            >
              <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 10 }} />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.title}</Text>
                <Text style={{ color: "#666" }}>{item.artist}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Music Controls */}
      {currentTrack && (
        <View
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
            backgroundColor: "white",
            padding: 15,
            borderRadius: 15,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 10,
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: "https://example.com/now-playing.jpg" }} // Replace with actual album art
            style={{ width: 100, height: 100, borderRadius: 10 }}
          />
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 5 }}>Now Playing</Text>

          {/* Seek Bar */}
          <View style={{ width: "100%", height: 5, backgroundColor: "#ddd", marginVertical: 10 }}>
            <View style={{ width: `${(position / duration) * 100}%`, height: "100%", backgroundColor: "#4CAF50" }} />
          </View>

          {/* Controls */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 10 }}>
            <TouchableOpacity onPress={seekBackward}>
              <Text style={{ fontSize: 24 }}>⏪</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={togglePlayPause}>
              <Text style={{ fontSize: 24 }}>{isPlaying ? "⏸" : "▶"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={seekForward}>
              <Text style={{ fontSize: 24 }}>⏩</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default MusicScreen;
