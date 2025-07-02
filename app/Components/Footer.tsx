import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Link } from 'expo-router';

export default function FeatureBar() {
    return (
        <View style={tw`w-full`}>
            <View style={tw`bg-[#063440] rounded-2xl px-2 py-4 flex-row justify-around`}>
                <Link href='/Doctors' asChild>
                    <TouchableOpacity style={tw`items-center w-1/5`}>
                        <MaterialCommunityIcons name="notebook-outline" size={26} color="white" />
                        <Text style={tw`text-white text-xs mt-2 text-center`}>Pregnancy Assist</Text>
                    </TouchableOpacity>
                </Link>

                <Link href='/Message' asChild>
                    <TouchableOpacity style={tw`items-center w-1/5`}>
                        <FontAwesome5 name="building" size={26} color="white" />
                        <Text style={tw`text-white text-xs mt-2 text-center`}>Child Assist</Text>
                    </TouchableOpacity>
                </Link>

                <Link href='/Community' asChild>
                    <TouchableOpacity style={tw`items-center w-1/5`}>
                        <FontAwesome5 name="users" size={26} color="white" />
                        <Text style={tw`text-white text-xs mt-2 text-center`}>Mothers Community</Text>
                    </TouchableOpacity>
                </Link>

                <Link href='/Loans' asChild>
                    <TouchableOpacity style={tw`items-center w-1/5`}>
                        <FontAwesome5 name="money-check-alt" size={26} color="white" />
                        <Text style={tw`text-white text-xs mt-2 text-center`}>Maternal loans</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
}

