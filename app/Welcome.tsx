import { useRouter } from 'expo-router';
import React from 'react';
import {
    ImageBackground,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

const backgroundImage = require('../assets/images/image1.jpg');

const WelcomeScreen = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={tw`flex-1`}>
            <ImageBackground
                source={backgroundImage}
                resizeMode="cover"
                style={tw`flex-1 justify-end items-center pb-10`}
            >
                <TouchableOpacity
                    style={tw`bg-teal-700 rounded-lg py-4 px-10`}
                    onPress={() => router.push('/Login')}
                >
                    <Text style={tw`text-white text-center font-semibold text-base`}>
                        Explore
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default WelcomeScreen;