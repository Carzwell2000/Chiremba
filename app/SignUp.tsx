import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import auth from './Components/firebaseConfig'; // Adjust path if needed
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'expo-router';

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password.");
            return;
        }

        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            Alert.alert("Success", "Account created successfully!");
            console.log("User registered:", user.email);
        } catch (error) {
            let errorMessage = "An unknown error occurred.";
            if (typeof error === 'object' && error !== null && 'code' in error) {
                const firebaseError = error;
                switch (firebaseError.code) {
                    case 'auth/email-already-in-use':
                        errorMessage = "That email address is already in use!";
                        break;
                    case 'auth/invalid-email':
                        errorMessage = "That email address is invalid.";
                        break;
                    case 'auth/operation-not-allowed':
                        errorMessage = "Email/password accounts are not enabled.";
                        break;
                    case 'auth/weak-password':
                        errorMessage = "Password is too weak.";
                        break;
                    default:
                        errorMessage = (firebaseError as any).message;
                }
            } else if (typeof error === 'object' && error !== null && 'message' in error) {
                errorMessage = (error as { message: string }).message;
            }
            Alert.alert("Registration Error", errorMessage);
            console.error("Registration error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={tw`flex-1`}
            >
                {/* Logo */}
                <View style={tw`items-center mt-10`}>
                    <Image
                        source={require('../assets/icons/icon1.jpg')}
                        style={{ width: 180, height: 100, resizeMode: 'contain' }}
                    />
                </View>

                {/* Form */}
                <View style={tw`flex-1 items-center justify-center px-6`}>
                    <Text style={tw`text-base text-gray-600 mt-6`}>Create an account</Text>
                    <Text style={tw`text-sm text-gray-500 mb-6`}>
                        Already have an account?{' '}
                        <Link href="/Login">
                            <Text style={tw`text-lg text-black`}>Log in</Text>
                        </Link>
                    </Text>

                    <TextInput
                        placeholder="Enter your email"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                        style={tw`w-full border rounded-xl border-teal-800 p-3 mb-4 text-sm`}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#999"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        style={tw`w-full border rounded-xl border-teal-800 p-3 mb-6 text-sm`}
                    />
                </View>

                {/* Register Button */}
                <View style={tw`px-6 pb-8`}>
                    <TouchableOpacity
                        style={tw`w-full bg-teal-800 py-4 rounded-xl ${loading ? 'opacity-50' : ''}`}
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        <Text style={tw`text-white text-center`}>
                            {loading ? 'Registering...' : 'Register'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
