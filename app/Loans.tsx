import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import tw from 'twrnc';
import Footer from './Components/Footer'; // Adjust the path as necessary

export default function LoansScreen() {
    return (
        <View style={tw`flex-1 bg-white`}>
            {/* Header */}
            <View style={tw`flex-row justify-between items-center px-4 pt-4 mt-10`}>
                <Text style={tw`text-lg font-bold`}>Loans</Text>
                <TouchableOpacity>
                    <View style={tw`w-8 h-8 rounded-full border border-black items-center justify-center`}>
                        <Text>👤</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={tw`px-4 mt-4`}>
                <TextInput
                    placeholder="Search microfinance..."
                    style={tw`border border-gray-400 rounded-xl h-12 px-4`}
                />
            </View>

            {/* Section Title */}
            <Text style={tw`font-bold text-base px-4 mt-5`}>Micro Finances</Text>

            {/* Loan Options */}
            <ScrollView style={tw`px-4 mt-2 mb-20`}>
                {/* First Loan Option */}
                <View style={tw`flex-row items-center justify-between mb-4`}>
                    <View style={tw`flex-row items-center`}>
                        <View style={tw`w-12 h-12 bg-gray-300 rounded-lg mr-3`} />
                        <View>
                            <Text style={tw`font-bold`}>Makeba Pay</Text>
                            <Text style={tw`text-xs text-gray-500`}>Micro Finance</Text>
                            <Text style={tw`text-xs text-blue-500`}>View profile</Text>
                        </View>
                    </View>
                    <Link href='/Applyloan' style={tw`bg-[#03383f] px-4 py-2 rounded-xl`}>
                        <Text style={tw`text-white text-sm`}>Apply for loan</Text>
                    </Link>
                </View>

                {/* Second Loan Option */}
                <View style={tw`flex-row items-center justify-between mb-4`}>
                    <View style={tw`flex-row items-center`}>
                        <View style={tw`w-12 h-12 bg-gray-300 rounded-lg mr-3`} />
                        <View>
                            <Text style={tw`font-bold text-gray-500`}>Micro Finance</Text>
                            <Text style={tw`text-xs text-gray-500`}>View profile</Text>
                        </View>
                    </View>
                    <Link href='/Applyloan' style={tw`bg-[#03383f] px-4 py-2 rounded-xl`}>
                        <Text style={tw`text-white text-sm`}>Apply for loan</Text>
                    </Link>
                </View>
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={tw`absolute bottom-0 left-0 right-0 pb-2`}>
                <Footer />
            </View>
        </View>
    );
}
