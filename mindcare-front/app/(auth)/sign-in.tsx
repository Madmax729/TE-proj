import { useSignIn } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }, [isLoaded, form]);

  return (
    <ScrollView className="flex-1 bg-gradient-to-b from-blue-400 to-purple-600">
      <View className="flex-1">
        <View className="relative w-full h-[250px] flex justify-end px-5">
          <Text className="text-3xl text-black font-JakartaSemiBold mb-5">
            Welcome 👋
          </Text>
        </View>

        <View className="p-5 bg-white rounded-t-3xl shadow-lg">
          <InputField
            label="Email"
            placeholder="Enter email"
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />

          <InputField
            label="Password"
            placeholder="Enter password"
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className="mt-6 bg-gradient-to-r from-green-400 to-blue-500"
          />

          <OAuth />

          <Link href="/sign-up" className="text-lg text-center text-gray-300 mt-10">
            Don't have an account? <Text className="text-blue-400">Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;