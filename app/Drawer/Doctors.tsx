import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://erpuslyknuetnqlehynl.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVycHVzbHlrbnVldG5xbGVoeW5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3ODMxMDUsImV4cCI6MjA2NDM1OTEwNX0.f1ubCigkh9u2ehWPeB_j4RyB5GEC70jHbl7T8NLnRdA";
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
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import Footer from '../Components/Footer';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

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
    const [replyCount, setReplyCount] = useState<number>(0);

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

    const fetchReplyCount = async () => {
        try {
            const { count, error } = await supabase
                .from('AppStatusReplies')
                .select('id', { count: 'exact', head: true })
                .eq('is_read', false);

            if (error) throw error;
            setReplyCount(count || 0);
        } catch (err: any) {
            console.log('Error fetching reply count:', err.message);
        }
    };

    useEffect(() => {
        fetchDoctors();
        fetchReplyCount();
    }, []);

    const handleBookAppointment = (doctor: Doctor) => {
        navigation.navigate('BookAppointment', {
            doctorName: `Dr. ${doctor.FirstName} ${doctor.LastName}`,
            doctorId: doctor.id,
        });
    };

    const header = (
        <View style={tw`flex-row justify-between items-center px-4 py-3 bg-white shadow-md`}>
            <Text style={tw`text-lg font-bold text-teal-900`}>Doctors</Text>
            <TouchableOpacity
                onPress={() => Alert.alert('Notifications', 'Navigate to notifications.')}
                style={tw`relative`}
            >
                <Ionicons name="notifications-outline" size={28} color="#047857" />
                {replyCount > 0 && (
                    <View style={tw`absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 justify-center items-center`}>
                        <Text style={tw`text-white text-xs font-bold`}>
                            {replyCount}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return (
            <SafeAreaView style={tw`flex-1 bg-gray-50 justify-center items-center`}>
                {header}
                <ActivityIndicator size="large" color="#047857" style={tw`mt-6`} />
                <Text style={tw`mt-2 text-gray-600`}>Loading doctors...</Text>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={tw`flex-1 bg-gray-50 justify-center items-center px-4`}>
                {header}
                <Text style={tw`text-red-600 text-center text-lg mb-4`}>
                    Oops! Something went wrong: {error}
                </Text>
                <TouchableOpacity
                    onPress={fetchDoctors}
                    style={tw`bg-teal-900 px-6 py-3 rounded-lg shadow`}
                >
                    <Text style={tw`text-white font-semibold text-center`}>
                        Retry
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={tw`flex-1 bg-gray-50`}>
            {header}
            <ScrollView style={tw`px-4 mt-3`} showsVerticalScrollIndicator={false}>
                {doctors.map((doctor) => (
                    <View
                        key={doctor.id}
                        style={tw`bg-white rounded-xl p-4 mb-4 shadow-md flex-row justify-between items-center`}
                    >
                        <View style={tw`flex-row items-center`}>
                            <View
                                style={tw`w-12 h-12 bg-teal-200 rounded-full mr-4 justify-center items-center`}
                            >
                                <Text style={tw`text-teal-900 font-bold`}>
                                    {doctor.FirstName.charAt(0)}
                                    {doctor.LastName.charAt(0)}
                                </Text>
                            </View>
                            <View>
                                <Text style={tw`text-lg font-semibold text-gray-800`}>
                                    Dr. {doctor.FirstName} {doctor.LastName}
                                </Text>
                                <Text style={tw`text-sm text-gray-500`}>
                                    {doctor.Specialization}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={tw`bg-teal-900 px-4 py-2 rounded-lg shadow`}
                            onPress={() => handleBookAppointment(doctor)}
                        >
                            <Text style={tw`text-white font-semibold text-sm`}>Book</Text>
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
