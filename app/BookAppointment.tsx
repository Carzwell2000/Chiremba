
import DateTimePicker from '@react-native-community/datetimepicker';
import { createClient } from '@supabase/supabase-js';

// Setup Supabase client
const supabaseUrl = "https://erpuslyknuetnqlehynl.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVycHVzbHlrbnVldG5xbGVoeW5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3ODMxMDUsImV4cCI6MjA2NDM1OTEwNX0.f1ubCigkh9u2ehWPeB_j4RyB5GEC70jHbl7T8NLnRdA"; // Use full anon key
const supabase = createClient(supabaseUrl, supabaseAnonKey);


import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Platform,
} from 'react-native';
import tw from 'twrnc';
import { useLocalSearchParams } from 'expo-router';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import auth from './Components/firebaseConfig'; // Adjust the import based on your project structure


type FormField = 'patientName' | 'doctorName' | 'reason';

const BookAppointmentForm = () => {
    const { doctorName } = useLocalSearchParams<{ doctorName?: string }>();

    const [formData, setFormData] = useState({
        patientName: '',
        doctorName: doctorName || '',
        reason: '',
    });

    const [appointmentDate, setAppointmentDate] = useState(new Date());
    const [appointmentTime, setAppointmentTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    // Track user login state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (doctorName) {
            setFormData((prev) => ({ ...prev, doctorName }));
        }
    }, [doctorName]);

    const handleChange = (name: FormField, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const getFormattedDate = () =>
        appointmentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

    const getFormattedTime = () =>
        appointmentTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        if (!formData.patientName || !formData.doctorName || !formData.reason) {
            Alert.alert('Validation Error', 'Please fill in all fields.');
            setLoading(false);
            return;
        }

        if (!userId) {
            Alert.alert('Error', 'User not authenticated.');
            setLoading(false);
            return;
        }

        try {
            const combinedDateTime = new Date(
                appointmentDate.getFullYear(),
                appointmentDate.getMonth(),
                appointmentDate.getDate(),
                appointmentTime.getHours(),
                appointmentTime.getMinutes(),
                appointmentTime.getSeconds()
            );

            const appointmentData = {
                patient_name: formData.patientName,
                doctor_name: formData.doctorName,
                appointment_timestamp: combinedDateTime.toISOString(),
                reason: formData.reason,
                status: 'pending',
                user_id: userId,
            };

            const { error: supabaseError } = await supabase
                .from('Appointments')
                .insert([appointmentData]);

            if (supabaseError) throw new Error(supabaseError.message);

            Alert.alert('Success', 'Appointment booked successfully!');
            setFormData({ patientName: '', doctorName: doctorName || '', reason: '' });
            setAppointmentDate(new Date());
            setAppointmentTime(new Date());
        } catch (err: any) {
            setError(err.message);
            Alert.alert('Error', err.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={tw`bg-white p-6 rounded-lg shadow-lg mx-4 my-8`}>
            <Text style={tw`text-2xl font-bold text-center text-teal-700 mb-4`}>
                Book Appointment
            </Text>

            {error && <Text style={tw`text-red-500 mb-3 text-center`}>{error}</Text>}

            <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>Patient Name</Text>
            <TextInput
                value={formData.patientName}
                onChangeText={(val) => handleChange('patientName', val)}
                placeholder="Enter patient name"
                editable={!loading}
                style={tw`border border-gray-300 rounded px-4 py-2 mb-4 bg-white`}
            />

            <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>Doctor Name</Text>
            <TextInput
                value={formData.doctorName}
                editable={false}
                style={tw`border border-gray-300 rounded px-4 py-2 mb-4 bg-gray-100 text-gray-700`}
            />

            <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>Appointment Date</Text>
            <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                disabled={loading}
                style={tw`border border-gray-300 rounded px-4 py-2 mb-4 bg-gray-100`}
            >
                <Text>{getFormattedDate()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={appointmentDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(_, date) => {
                        setShowDatePicker(false);
                        if (date) setAppointmentDate(date);
                    }}
                    minimumDate={new Date()}
                />
            )}

            <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>Appointment Time</Text>
            <TouchableOpacity
                onPress={() => setShowTimePicker(true)}
                disabled={loading}
                style={tw`border border-gray-300 rounded px-4 py-2 mb-4 bg-gray-100`}
            >
                <Text>{getFormattedTime()}</Text>
            </TouchableOpacity>
            {showTimePicker && (
                <DateTimePicker
                    value={appointmentTime}
                    mode="time"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(_, time) => {
                        setShowTimePicker(false);
                        if (time) setAppointmentTime(time);
                    }}
                />
            )}

            <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>Reason</Text>
            <TextInput
                value={formData.reason}
                onChangeText={(val) => handleChange('reason', val)}
                placeholder="Brief reason for appointment"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                editable={!loading}
                style={tw`border border-gray-300 rounded px-4 py-2 h-24 mb-4 bg-white`}
            />

            <TouchableOpacity
                onPress={handleSubmit}
                disabled={loading}
                style={tw`bg-teal-700 py-3 rounded-md items-center`}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={tw`text-white font-semibold`}>Book Appointment</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default BookAppointmentForm;

