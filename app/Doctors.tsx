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
import { Ionicons, Entypo } from '@expo/vector-icons';
import tw from 'twrnc';
import Footer from './Components/Footer'; // Adjust the path as necessary
export default function DoctorsScreen() {
    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            {/* Header */}
            <View style={tw`flex-row justify-between items-center px-4 py-3`}>
                <Entypo name="menu" size={24} color="black" />
                <Text style={tw`text-lg font-semibold`}>Doctors</Text>
                <Ionicons name="notifications-outline" size={24} color="black" />
            </View>

            {/* Search */}
            <View style={tw`px-4 mb-4`}>
                <TextInput
                    placeholder="Search doctor..."
                    style={tw`border border-teal-800 rounded-xl px-4 py-2`}
                />
            </View>

            <ScrollView style={tw`px-4`} showsVerticalScrollIndicator={false}>
                <Text style={tw`font-semibold text-base mb-4`}>Online consultation</Text>

                {/* Doctor 1 */}
                <View style={tw`flex-row items-center justify-between mb-4`}>
                    <View style={tw`flex-row items-center`}>
                        <View style={tw`w-12 h-12 bg-gray-300 rounded-lg mr-3`} />
                        <View>
                            <Text style={tw`font-bold`}>Dr Chimanyiwa</Text>
                            <Text style={tw`text-xs text-gray-500`}>General Doctor</Text>
                            <Text style={tw`text-xs text-gray-500`}>View profile</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={tw`bg-teal-900 px-4 py-2 rounded-lg`}>
                        <Text style={tw`text-white text-xs`}>Book Appointment</Text>
                    </TouchableOpacity>
                </View>

                {/* Doctor 2 */}
                <View style={tw`flex-row items-center justify-between mb-4`}>
                    <View style={tw`flex-row items-center`}>
                        <View style={tw`w-12 h-12 bg-gray-300 rounded-lg mr-3`} />
                        <View>
                            <Text style={tw`font-bold`}>Dr Ziroro</Text>
                            <Text style={tw`text-xs text-gray-500`}>General Doctor</Text>
                            <Text style={tw`text-xs text-gray-500`}>(Not available)</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={tw`bg-teal-900 px-4 py-2 rounded-lg`}>
                        <Text style={tw`text-white text-xs`}>Book Appointment</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Bottom Tab Navigation */}
            <View style={tw`absolute bottom-0 left-0 right-0 pb-2`}>
                <Footer />
            </View>
        </SafeAreaView>
    );
}
