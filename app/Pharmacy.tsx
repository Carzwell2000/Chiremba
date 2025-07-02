import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from 'twrnc';
import Footer from './Components/Footer';

const PharmacyScreen = () => {
    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            {/* Header */}
            <View style={tw`flex-row justify-between items-center px-4 py-2`}>
                <Ionicons name="menu" size={28} />
                <Text style={tw`text-base font-semibold`}>Pharmacy</Text>
                <TouchableOpacity>
                    <Ionicons name="notifications-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={tw`px-4 pb-24`}>
                {/* Search bar */}
                <View style={tw`border border-teal-800 rounded-xl p-2 my-4`}>
                    <TextInput
                        placeholder="Search..."
                        placeholderTextColor="#999"
                        style={tw`text-sm px-2`}
                    />
                </View>

                {/* Online Consultation Title */}
                <Text style={tw`font-bold text-base mb-2`}>Online consultation</Text>

                {/* Pharmacies List */}
                {[
                    { name: 'NKG Pharmacy', location: 'Harare CBD' },
                    { name: 'XYZ Pharmacy', location: 'Bulawayo Province' },
                ].map((pharmacy, index) => (
                    <View
                        key={index}
                        style={tw`flex-row justify-between items-center mb-4`}
                    >
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
            </ScrollView>

            {/* Bottom Navigation Bar */}
            <View style={tw`absolute bottom-0 left-0 right-0 pb-2`}>
                <Footer />
            </View>
        </SafeAreaView>
    );
};

export default PharmacyScreen;
