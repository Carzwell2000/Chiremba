import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Alert, // Import Alert for displaying messages
    ActivityIndicator, // Added for a visual loading indicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import auth from './Components/firebaseConfig'; // Adjust path to your firebaseConfig.js
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';


const backgroundImage = require('../assets/images/image1.jpg'); // Your actual image

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // To manage loading state

    const router = useRouter(); // Initialize the router for navigation

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password.");
            return;
        }

        setLoading(true); // Start loading
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User logged in:", user.email);
            // Alert.alert("Success", "Logged in successfully!"); // Optional: show success message

            // Navigate to the Home screen after successful login
            router.replace('/Home'); // Use replace to prevent going back to login screen
        } catch (error) {
            let errorMessage = "An unknown error occurred.";

            // Attempt to cast error to FirebaseError or check for common properties
            const firebaseError = error;

            if (
                typeof firebaseError === 'object' &&
                firebaseError !== null &&
                'code' in firebaseError &&
                typeof (firebaseError as any).code === 'string'
            ) {
                switch ((firebaseError as any).code) {
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
                        errorMessage = (firebaseError as any).message || errorMessage;
                }
            } else if (
                typeof firebaseError === 'object' &&
                firebaseError !== null &&
                'message' in firebaseError &&
                typeof (firebaseError as any).message === 'string'
            ) {
                errorMessage = (firebaseError as any).message;
            }
            Alert.alert("Login Error", errorMessage);
            console.error("Login error:", error);
        } finally {
            setLoading(false); // End loading
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
                {/* Optional spacing from top if needed */}
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
                            <Text style={tw`text-black font-semibold`}>
                                {/* Ensure '/SignUp' or '/Register' matches your expo-router file structure */}
                                <Link href="/SignUp">Register</Link>
                            </Text>
                        </Text>

                        <TextInput
                            style={tw`w-full border border-gray-300 rounded-lg p-3 mb-4`}
                            placeholder="Enter your email"
                            placeholderTextColor="#555"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={setEmail}
                            value={email}
                            editable={!loading} // Disable input when loading
                        />

                        <TextInput
                            style={tw`w-full border border-gray-300 rounded-lg p-3 mb-6`}
                            placeholder="Enter your password"
                            placeholderTextColor="#555"
                            secureTextEntry
                            onChangeText={setPassword}
                            value={password}
                            editable={!loading} // Disable input when loading
                        />

                        <TouchableOpacity
                            style={tw`bg-teal-700 rounded-lg py-4 ${loading ? 'opacity-50' : ''}`}
                            onPress={handleLogin}
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" /> // Show spinner when loading
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