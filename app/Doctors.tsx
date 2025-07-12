import { createClient } from '@supabase/supabase-js';


const supabaseUrl = "https://erpuslyknuetnqlehynl.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVycHVzbHlrbnVldG5xbGVoeW5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3ODMxMDUsImV4cCI6MjA2NDM1OTEwNX0.f1ubCigkh9u2ehWPeB_j4RyB5GEC70jHbl7T8NLnRdA"; // Use full anon key
const supabase = createClient(supabaseUrl, supabaseAnonKey);

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Entypo } from '@expo/vector-icons';
import tw from 'twrnc';
import Footer from './Components/Footer'; // Update if needed
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './navigation/types'; // Update if needed


type Doctor = {
    id: string;
    FirstName: string;
    LastName: string;
    Specialization: string;

};

export default function DoctorsScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDoctors = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error: supabaseError } = await supabase
                .from('Doctors')
                .select('id, FirstName, LastName, Specialization');

            if (supabaseError) throw supabaseError;
            setDoctors(data || []);
        } catch (err: any) {
            setError(err.message || 'Unknown error');
            Alert.alert('Error', 'Failed to load doctors: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const handleBookAppointment = (doctor: Doctor) => {
        navigation.navigate('BookAppointment', {
            doctorName: `Dr. ${doctor.FirstName} ${doctor.LastName}`,
            doctorId: doctor.id,
        });
    };

    if (loading) {
        return (
            <SafeAreaView style={tw`flex-1 bg-white justify-center items-center`}>
                <ActivityIndicator size="large" color="#047857" />
                <Text style={tw`mt-2 text-gray-700`}>Loading doctors...</Text>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={tw`flex-1 bg-white justify-center items-center px-4`}>
                <Text style={tw`text-red-600 text-center text-lg mb-4`}>
                    Oops! Something went wrong: {error}
                </Text>
                <TouchableOpacity onPress={fetchDoctors} style={tw`bg-blue-500 px-5 py-2 rounded-lg`}>
                    <Text style={tw`text-white font-semibold`}>Retry Loading Doctors</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            {/* Header */}
            <View style={tw`flex-row justify-between items-center px-4 py-3`}>
                <Entypo name="menu" size={24} color="black" />
                <Text style={tw`text-lg font-semibold`}>Doctors</Text>
                <Ionicons name="notifications-outline" size={24} color="black" />
            </View>

            <ScrollView style={tw`px-4`} showsVerticalScrollIndicator={false}>
                <Text style={tw`font-semibold text-base mb-4`}>Available Doctors</Text>

                {doctors.map((doctor) => (
                    <View
                        key={doctor.id}
                        style={tw`flex-row items-center justify-between mb-4 pb-2 border-b border-gray-100`}
                    >
                        <View style={tw`flex-row items-center`}>
                            <View style={tw`w-12 h-12 bg-gray-500 rounded-lg mr-3 justify-center items-center`}>
                                <Text style={tw`text-white font-bold`}>
                                    {doctor.FirstName?.charAt(0)}
                                    {doctor.LastName?.charAt(0)}
                                </Text>
                            </View>
                            <View>
                                <Text style={tw`font-bold`}>
                                    Dr. {doctor.FirstName} {doctor.LastName}
                                </Text>
                                <Text style={tw`text-xs text-gray-500`}>
                                    {doctor.Specialization}
                                </Text>



                            </View>
                        </View>
                        <TouchableOpacity
                            style={tw`bg-teal-900 px-4 py-2 rounded-lg`}
                            onPress={() => handleBookAppointment(doctor)}
                        >
                            <Text style={tw`text-white text-xs`}>Book Appointment</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>


            <View style={tw`absolute bottom-0 left-0 right-0 pb-2`}>
                <Footer />
            </View>
        </SafeAreaView>
    );
}



