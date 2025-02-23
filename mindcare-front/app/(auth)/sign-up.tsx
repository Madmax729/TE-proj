import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <Animated.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa', opacity: fadeAnim }}>
      <View className="w-80 p-6 bg-white shadow-lg rounded-2xl">
        {pendingVerification ? (
          <>
            <Text className="text-lg font-semibold text-gray-800 mb-4">Verify Your Email</Text>
            <TextInput
              value={code}
              placeholder="Enter verification code"
              onChangeText={setCode}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-center"
            />
            <TouchableOpacity className="bg-blue-500 py-3 rounded-lg shadow-md" onPress={onVerifyPress}>
              <Text className="text-white text-center font-semibold">Verify</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text className="text-lg font-semibold text-gray-800 mb-4">Sign Up</Text>
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Enter email"
              onChangeText={setEmailAddress}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            />
            <TextInput
              value={password}
              placeholder="Enter password"
              secureTextEntry
              onChangeText={setPassword}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            />
            <TouchableOpacity className="bg-blue-500 py-3 rounded-lg shadow-md" onPress={onSignUpPress}>
              <Text className="text-white text-center font-semibold">Continue</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </Animated.View>
  );
}
