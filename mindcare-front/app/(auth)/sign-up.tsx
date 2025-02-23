import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  // Sign-up function
  const onSignUpPress = async () => {
    if (!isLoaded) {
      Alert.alert("Error", "Sign-up service is not loaded yet. Try again.");
      return;
    }

    try {
      console.log("Creating user:", form.email);
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      console.log("Preparing email verification...");
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification((prev) => ({
        ...prev,
        state: "pending",
        error: "",
      }));
    } catch (err) {
      console.error("Sign-up Error:", err);
      Alert.alert("Error", err.errors?.[0]?.longMessage || "Sign-up failed.");
    }
  };

  // Email Verification Function
  const onPressVerify = async () => {
    if (!isLoaded) {
      Alert.alert("Error", "Verification service is not loaded yet. Try again.");
      return;
    }

    try {
      console.log("Attempting verification with code:", verification.code);
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      console.log("Verification Response:", completeSignUp);

      if (completeSignUp.status === "complete") {
        console.log("User verified! Setting session...");
        await setActive({ session: completeSignUp.createdSessionId });

        setVerification((prev) => ({
          ...prev,
          state: "success",
          error: "",
        }));

        setShowSuccessModal(true);
      } else {
        console.warn("Verification failed. Response:", completeSignUp);
        setVerification((prev) => ({
          ...prev,
          error: "Verification failed. Please try again.",
          state: "failed",
        }));
      }
    } catch (err) {
      console.error("Verification Error:", err);
      setVerification((prev) => ({
        ...prev,
        error: err.errors?.[0]?.longMessage || "An unknown error occurred.",
        state: "failed",
      }));
    }
  };

  return (
    <ScrollView className="flex-1 bg-gradient-to-b from-blue-400 to-purple-600">
      <View className="flex-1">
        <View className="relative w-full h-[250px] flex justify-end px-5">
          <Text className="  text-3xl text-black font-JakartaSemiBold mb-5">Create Your Account</Text>
        </View>
        <View className="p-5 bg-white rounded-t-3xl shadow-lg">
          <InputField
            label="Name"
            placeholder="Enter name"
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
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
          <CustomButton title="Sign Up" onPress={onSignUpPress} className="mt-6 bg-gradient-to-r from-green-400 to-blue-500" />
          <OAuth />
          <Link href="/sign-in" className="text-lg text-center text-gray-300 mt-10">
            Already have an account? <Text className="text-blue-600">Log In</Text>
          </Link>
        </View>
         {/* Verification Modal */}
         <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") {
              setShowSuccessModal(true);
            }
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="font-JakartaExtraBold text-2xl mb-2">Verification</Text>
            <Text className="font-Jakarta mb-5">
              We've sent a verification code to {form.email}.
            </Text>
            <InputField
              label={"Code"}
              placeholder={"12345"}
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) => setVerification({ ...verification, code })}
            />
            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">{verification.error}</Text>
            )}
            <CustomButton
              title="Verify Email"
              onPress={onPressVerify}
              className="mt-5 bg-success-500"
            />
          </View>
        </ReactNativeModal>

        {/* Success Modal */}
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-3xl font-JakartaBold text-center">Verified</Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              You have successfully verified your account.
            </Text>
            <CustomButton
              title="Browse Home"
              onPress={() => router.push(`/(root)/(tabs)/home`)}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
