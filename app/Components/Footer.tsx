import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Link } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function FeatureBar() {
    return (
        <View style={tw`w-full`}>
            <View style={tw`bg-[#063440] rounded-2xl px-2 py-4 flex-row justify-around`}>

                {/* Doctors is now inside drawer folder */}
                <Link href='/Drawer/Doctors' asChild>
                    <TouchableOpacity style={tw`items-center w-1/5`}>
                        <MaterialCommunityIcons name="human-pregnant" size={24} color="white" />
                        <Text style={tw`text-white text-xs mt-2 text-center`}>Pregnancy Assist</Text>
                    </TouchableOpacity>
                </Link>

                <Link href='/Message' asChild>
                    <TouchableOpacity style={tw`items-center w-1/5`}>
                        <FontAwesome6 name="hands-holding-child" size={24} color="white" />
                        <Text style={tw`text-white text-xs mt-2 text-center`}>Child Assist</Text>
                    </TouchableOpacity>
                </Link>

                <Link href='/Community' asChild>
                    <TouchableOpacity style={tw`items-center w-1/5`}>
                        <MaterialCommunityIcons name="google-circles-communities" size={24} color="white" />
                        <Text style={tw`text-white text-xs mt-2 text-center`}> Community</Text>
                    </TouchableOpacity>
                </Link>

                <Link href='/Loans' asChild>
                    <TouchableOpacity style={tw`items-center w-1/5`}>
                        <FontAwesome name="money" size={24} color="white" />
                        <Text style={tw`text-white text-xs mt-2 text-center`}> loans</Text>
                    </TouchableOpacity>
                </Link>

            </View>
        </View>
    );
}
