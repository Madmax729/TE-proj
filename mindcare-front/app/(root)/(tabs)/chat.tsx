import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [historyVisible, setHistoryVisible] = useState(false);

    const historyOffset = useSharedValue(-250); // Initially hidden

    const toggleHistory = () => {
        if (historyVisible) {
            historyOffset.value = withTiming(-250, { duration: 300 });
        } else {
            historyOffset.value = withTiming(0, { duration: 300 });
        }
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
            historyOffset.value = withTiming(-250, { duration: 300 });
            setHistoryVisible(false);
        }
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={closeHistoryOnClick}>
            <SafeAreaView style={styles.container}>
                <Animated.View style={[styles.historyPanel, { transform: [{ translateX: historyOffset }] }]}>
                    <Text style={styles.historyTitle}>Chat History</Text>
                    <ScrollView>
                        {messages.filter((msg) => msg.sender === "user").map((msg, index) => (
                            <Text key={index} style={styles.historyItem}>{msg.text}</Text>
                        ))}
                    </ScrollView>
                </Animated.View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.chatContainer}
                >
                    <TouchableOpacity onPress={toggleHistory} style={styles.historyButton}>
                        <Text style={styles.historyText}>☰</Text>
                    </TouchableOpacity>

                    <ScrollView style={styles.messageContainer}>
                        {messages.map((msg, index) => (
                            <View
                                key={index}
                                style={[styles.messageBubble, msg.sender === "user" ? styles.userBubble : styles.botBubble]}
                            >
                                <Text style={styles.messageText}>{msg.text}</Text>
                            </View>
                        ))}
                    </ScrollView>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Type a message..."
                            placeholderTextColor="#AAA"
                            value={input}
                            onChangeText={setInput}
                        />
                        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                            <Text style={styles.sendText}>➤</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E1E2E",
    },
    chatContainer: {
        flex: 1,
        padding: 15,
        justifyContent: "space-between",
    },
    historyButton: {
        position: "absolute",
        left: 10,
        top: 30, // Adjusted to avoid the notch
        zIndex: 10,
        backgroundColor: "#3A3F5A",
        padding: 10,
        borderRadius: 5,
    },
    historyText: {
        color: "#FFF",
        fontSize: 18,
    },
    messageContainer: {
        flex: 1,
        marginTop: 60, // Avoid overlap with history button
        marginBottom: 10,
    },
    messageBubble: {
        maxWidth: "75%",
        padding: 10,
        marginBottom: 8,
        borderRadius: 8,
    },
    userBubble: {
        backgroundColor: "#4A90E2",
        alignSelf: "flex-end",
    },
    botBubble: {
        backgroundColor: "#44475A",
        alignSelf: "flex-start",
    },
    messageText: {
        color: "#FFF",
    },
    inputContainer: {
        flexDirection: "row",
        backgroundColor: "#22252A",
        padding: 10,
        borderRadius: 10,
    },
    input: {
        flex: 1,
        color: "#FFF",
        paddingHorizontal: 10,
    },
    sendButton: {
        backgroundColor: "#4A90E2",
        padding: 10,
        borderRadius: 8,
    },
    sendText: {
        color: "#FFF",
        fontSize: 16,
    },
    historyPanel: {
        position: "absolute",
        left: 0,
        top: 30, // Adjusted to avoid notch
        bottom: 0,
        width: 250,
        backgroundColor: "#3A3F5A",
        padding: 15,
        zIndex: 5,
    },
    historyTitle: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    historyItem: {
        color: "#AAA",
        fontSize: 14,
        marginBottom: 5,
    },
});

export default ChatScreen;
