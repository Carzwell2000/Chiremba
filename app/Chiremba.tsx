import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { router } from 'expo-router';

export default function OnboardingScreen() {
    return (
        <SafeAreaView style={tw`flex-1`}>
            <ImageBackground
                source={require('../assets/images/image1.jpg')} // Local background image
                style={tw`flex-1 justify-end`}
                resizeMode="cover"
            >
                {/* Bottom container */}
                <View style={tw`bg-white rounded-t-[40px] p-6`}>
                    <Text style={tw`text-center font-bold text-base mb-4`}>
                        Chiremba Assist Your Companion Guide in{'\n'}and raising your bundle of joy
                    </Text>

                    <Text style={tw`text-xs text-gray-600 text-center mb-6`}>
                        Find solutions to your pregnancy complications{'\n'}
                        Connect with other mothers{'\n'}
                        Get loan to assist you in your pregnancy{'\n'}
                        Record your child moments
                    </Text>

                    {/* Dots Indicator */}
                    <View style={tw`flex-row justify-center mb-6`}>
                        <View style={tw`w-5 h-2 rounded-full bg-teal-800 mx-1`} />
                        <View style={tw`w-2 h-2 rounded-full bg-gray-300 mx-1`} />
                        <View style={tw`w-2 h-2 rounded-full bg-gray-300 mx-1`} />
                    </View>

                    {/* Get Started Button */}
                    <TouchableOpacity
                        style={tw`bg-teal-700 rounded-lg py-4 px-10`}
                        onPress={() => router.push('/Login')}
                    >
                        <Text style={tw`text-white text-center font-semibold text-base`}>
                            Explore
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}
