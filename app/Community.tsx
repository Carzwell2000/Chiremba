import { Entypo, Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import Footer from './Components/Footer';

export default function CommunityScreen() {
    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <ScrollView
                style={tw`bg-white`}
                contentContainerStyle={tw`p-4 pb-32`} // Added bottom padding for Footer visibility
            >
                {/* Header */}
                <View style={tw`flex-row justify-between items-center px-4 py-3 mb-4`}>
                    <Entypo name="menu" size={24} color="black" />
                    <Text style={tw`text-lg font-semibold`}>Community</Text>
                    <Ionicons name="notifications-outline" size={24} color="black" />
                </View>

                {/* Post Input */}
                <TextInput
                    placeholder="Write your post here"
                    style={tw`border border-teal-800 rounded-xl p-3 mb-4 min-h-16`}
                    multiline
                />

                {/* Images Row */}
                <View style={tw`flex-row justify-between mt-6 mb-4`}>
                    <Image
                        style={tw`w-24 h-32 rounded-xl`}
                        source={require('../assets/images/image3.png')}
                    />
                    <Image
                        style={tw`w-24 h-32 rounded-xl`}
                        source={require('../assets/images/image4.png')}
                    />
                    <Image
                        style={tw`w-24 h-32 rounded-xl`}
                        source={require('../assets/images/image5.png')}
                    />
                </View>

                {/* User Info */}
                <View style={tw`flex-row items-center mt-6 mb-2`}>
                    <View style={tw`w-12 h-12 bg-gray-300 rounded-full mr-3`} />
                    <Text style={tw`font-bold text-base`}>Mai Shalom</Text>
                </View>

                {/* Description */}
                <Text style={tw`text-gray-800 text-sm mb-4`}>
                    Find solutions to your pregnancy complications{"\n"}
                    Connect with other mothers{"\n"}
                    Get loan to assist you in your pregnancy{"\n"}
                    Record your child moments
                </Text>

                {/* Bottom Image */}
                <Image
                    style={tw`w-full h-56 rounded-2xl mt-4`}
                    source={require('../assets/images/image6.jpg')}
                    resizeMode="cover"
                />

                {/* Reactions */}
                <View style={tw`flex-row justify-around items-center mt-6`}>
                    <TouchableOpacity>
                        <Text style={tw`text-xl`}>👍</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={tw`text-xl`}>💬</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={tw`text-xl`}>↗️</Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <View style={tw`absolute bottom-0 left-0 right-0`}>
                    <Footer />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
