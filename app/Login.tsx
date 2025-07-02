import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import auth from './Components/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';

const backgroundImage = require('../assets/images/image1.jpg');

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password.");
            return;
        }

        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User logged in:", user.email);
            router.replace('/Home');
        } catch (error) {
            let errorMessage = "An unknown error occurred.";
            const firebaseError = error as { code?: string; message?: string };

            if (
                typeof firebaseError === 'object' &&
                firebaseError !== null &&
                'code' in firebaseError &&
                typeof firebaseError.code === 'string'
            ) {
                switch (firebaseError.code) {
                    case 'auth/invalid-email':
                        errorMessage = "That email address is invalid.";
                        break;
                    case 'auth/user-disabled':
                        errorMessage = "This user account has been disabled.";
                        break;
                    case 'auth/user-not-found':
                        errorMessage = "No user found with that email. Please register first.";
                        break;
                    case 'auth/wrong-password':
                        errorMessage = "Incorrect password. Please try again.";
                        break;
                    default:
                        errorMessage = firebaseError.message || errorMessage;
                }
            } else if (
                typeof firebaseError === 'object' &&
                firebaseError !== null &&
                'message' in firebaseError &&
                typeof firebaseError.message === 'string'
            ) {
                errorMessage = firebaseError.message;
            }
            Alert.alert("Login Error", errorMessage);
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={tw`flex-1`}>
            <ImageBackground
                source={backgroundImage}
                style={[
                    tw`flex-1`,
                    {
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    },
                ]}
                resizeMode="cover"
            >
                <View style={tw`flex-1 justify-end w-full`}>
                    <View
                        style={[
                            tw`w-full px-6 pt-6 pb-10`,
                            {
                                backgroundColor: 'white',
                                borderTopLeftRadius: 30,
                                borderTopRightRadius: 30,
                            },
                        ]}
                    >
                        <Text style={tw`text-center text-xl font-bold mb-1`}>Log in</Text>
                        <Text style={tw`text-center text-gray-600 mb-6`}>
                            Don’t have an account?{' '}
                            <Link href="/SignUp">
                                <Text style={tw`text-black font-semibold`}>Register</Text>
                            </Link>
                        </Text>

                        <TextInput
                            style={tw`w-full border border-gray-300 rounded-lg p-3 mb-4`}
                            placeholder="Enter your email"
                            placeholderTextColor="#555"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={setEmail}
                            value={email}
                            editable={!loading}
                        />

                        <TextInput
                            style={tw`w-full border border-gray-300 rounded-lg p-3 mb-6`}
                            placeholder="Enter your password"
                            placeholderTextColor="#555"
                            secureTextEntry
                            onChangeText={setPassword}
                            value={password}
                            editable={!loading}
                        />

                        <TouchableOpacity
                            style={tw`bg-teal-700 rounded-lg py-4 ${loading ? 'opacity-50' : ''}`}
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={tw`text-white text-center font-semibold text-base`}>
                                    Log In
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default LoginScreen;
