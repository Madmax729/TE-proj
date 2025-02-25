import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

const { width } = Dimensions.get("window");
const HISTORY_WIDTH = width * 0.7;

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [historyVisible, setHistoryVisible] = useState(false);

    const historyOffset = useSharedValue(-HISTORY_WIDTH);

    const toggleHistory = () => {
        historyOffset.value = withTiming(historyVisible ? -HISTORY_WIDTH : 0, { duration: 300 });
        setHistoryVisible(!historyVisible);
    };

    const sendMessage = () => {
        if (input.trim() === "") return;
        const userMessage = { text: input, sender: "user" };
        const botResponse = { text: `Response: ${input}`, sender: "bot" };
        setMessages([...messages, userMessage, botResponse]);
        setInput("");
    };

    const closeHistoryOnClick = () => {
        if (historyVisible) {
            historyOffset.value = withTiming(-HISTORY_WIDTH, { duration: 300 });
            setHistoryVisible(false);
        }
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={closeHistoryOnClick}>
            <SafeAreaView className="flex-1 bg-[#121212]">
                <Animated.View
                    style={{ transform: [{ translateX: historyOffset.value }], width: HISTORY_WIDTH }}
                    className="absolute left-0 top-0 bottom-0 bg-[#1E1E1E] p-4 z-10 shadow-lg rounded-r-lg"
                >
                    <Text className="text-white text-lg font-semibold mb-3">Chat History</Text>
                    <ScrollView className="space-y-2">
                        {messages.filter((msg) => msg.sender === "user").map((msg, index) => (
                            <View key={index} className="bg-[#252525] p-2 rounded-md shadow-sm">
                                <Text className="text-gray-300 text-sm">{msg.text}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </Animated.View>

                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 p-4 justify-between">
                    <TouchableOpacity onPress={toggleHistory} className="absolute left-2 top-4 bg-[#252525] p-2 rounded">
                        <Text className="text-gray-300 text-lg">☰</Text>
                    </TouchableOpacity>

                    <ScrollView className="flex-1 mt-12 mb-2">
                        {messages.map((msg, index) => (
                            <View key={index} className={`max-w-[75%] p-3 mb-2 rounded-lg ${msg.sender === "user" ? "bg-blue-600 self-end" : "bg-[#252525] self-start"}`}>
                                <Text className="text-white">{msg.text}</Text>
                            </View>
                        ))}
                    </ScrollView>

                    <View className="flex-row bg-[#1E1E1E] p-3 mb-8 rounded-lg shadow-md">
                        <TextInput
                            className="flex-1 text-white px-3"
                            placeholder="Type a message..."
                            placeholderTextColor="#777"
                            value={input}
                            onChangeText={setInput}
                        />
                        <TouchableOpacity onPress={sendMessage} className="bg-blue-600 p-3 rounded-lg">
                            <Text className="text-white text-lg">➤</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default ChatScreen;
