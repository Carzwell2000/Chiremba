import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import Footer from './Components/Footer';
import { Link } from 'expo-router';

const Home = () => {
    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            {/* Header */}
            <View style={tw`flex-row justify-between items-center px-4 py-2`}>
                <Ionicons name="menu" size={28} />
                <Text style={tw`text-lg font-semibold`}>Home</Text>
                <TouchableOpacity>
                    <Ionicons name="person-circle-outline" size={28} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={tw`px-4 pb-36`}>
                {/* Top Banner Placeholder */}
                <View style={tw`h-20 bg-blue-100 rounded-xl mb-4`} />

                {/* Emergency Doctor Section */}
                <Text style={tw`font-bold text-base mb-2`}>Emergency Doctor/Nurse consultation</Text>
                {[1, 2].map((item) => (
                    <View key={item} style={tw`flex-row justify-between items-center mb-3`}>
                        <View style={tw`flex-row items-center`}>
                            <View style={tw`w-12 h-12 bg-gray-300 rounded-lg mr-3`} />
                            <View>
                                <Text style={tw`font-semibold`}>Dr Ziroro</Text>
                                <Text style={tw`text-gray-500 text-sm`}>General Doctor</Text>
                                <Text style={tw`text-gray-500 text-sm`}>(120 Reviews)</Text>
                            </View>
                        </View>
                        <Ionicons name="ellipsis-vertical" size={20} color="#999" />
                    </View>
                ))}

                {/* Mothers Community Card */}
                <View style={tw`flex-row items-center bg-gray-100 rounded-xl p-3 mb-4`}>
                    <Image
                        source={require('../assets/images/image1.jpg')}
                        style={tw`w-40 h-40 rounded-lg mr-3 mt-3 mb-3 ml-3 px-3 py-3`}
                    />
                    <TouchableOpacity style={tw`bg-teal-900 px-4 py-4 rounded-full`}>
                        <Text style={tw`text-white font-semibold`}>
                            <Link href='/Community'>Join Mothers Community</Link>
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Pharmacy Section */}
                <Text style={tw`font-bold text-base mb-2`}>24/7 Pharmacy</Text>
                {[
                    { name: 'NKG Pharmacy', location: 'Harare CBD' },
                    { name: 'XYZ Pharmacy', location: 'Bulawayo Province' },
                ].map((pharmacy, idx) => (
                    <View key={idx} style={tw`flex-row justify-between items-center mb-3`}>
                        <View style={tw`flex-row items-center`}>
                            <View style={tw`w-12 h-12 bg-gray-300 rounded-lg mr-3`} />
                            <View>
                                <Text style={tw`font-semibold`}>{pharmacy.name}</Text>
                                <Text style={tw`text-gray-500 text-sm`}>{pharmacy.location}</Text>
                                <Text style={tw`text-gray-500 text-sm`}>(120 Reviews)</Text>
                            </View>
                        </View>
                        <Ionicons name="ellipsis-vertical" size={20} color="#999" />
                    </View>
                ))}

                {/* Baby/Pregnancy Section Buttons */}
                <Text style={tw`font-bold text-base mt-4 mb-2`}>Manage baby/pregnancy</Text>
                <View style={tw`flex-row justify-between mt-4 mb-10`}>
                    <TouchableOpacity style={tw`bg-teal-800 py-2 px-4 w-35 h-30 rounded-xl justify-center`}>
                        <Text style={tw`text-white text-center`}>Weight tracker</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`bg-teal-800 py-2 px-4 w-35 h-30 rounded-xl justify-center`}>
                        <Text style={tw`text-white text-center`}>Upcoming medical visit</Text>
                    </TouchableOpacity>
                </View>

                <View style={tw`absolute bottom-0 left-0 right-0 pb-2`}>
                    <Footer />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
