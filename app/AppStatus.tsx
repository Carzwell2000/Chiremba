import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import { createClient } from '@supabase/supabase-js';
import auth from './Components/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Setup Supabase client
const supabaseUrl = "https://erpuslyknuetnqlehynl.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVycHVzbHlrbnVldG5xbGVoeW5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3ODMxMDUsImV4cCI6MjA2NDM1OTEwNX0.f1ubCigkh9u2ehWPeB_j4RyB5GEC70jHbl7T8NLnRdA"; // Use full anon key
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define Appointment type to include timestamp and formattedTime/formattedDate
// Define type
type Appointment = {
    patient_name: string;
    status: string;
    appointment_timestamp?: string;
    formattedTime?: string;
    formattedDate?: string;
};

const AppointmentStatusFetcher = () => {
    const [appointmentsData, setAppointmentsData] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    // Track Firebase user
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
        const fetchAppointmentStatus = async () => {
            if (!userId) return; // Don't fetch if user is not logged in

            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from('Appointments')
                .select('patient_name, status, appointment_timestamp')
                .eq('user_id', userId) // ✅ Filter by logged-in user
                .order('appointment_timestamp', { ascending: true });

            if (error) {
                console.error('Error fetching appointment data:', error);
                setError('Failed to fetch appointments.');
            } else {
                const formattedData = data.map(appt => {
                    let formattedTime = '';
                    let formattedDateDisplay = '';

                    if (appt.appointment_timestamp) {
                        const dateObj = new Date(appt.appointment_timestamp);
                        formattedTime = dateObj.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                        });

                        formattedDateDisplay = dateObj.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        });
                    }

                    return {
                        ...appt,
                        formattedTime,
                        formattedDate: formattedDateDisplay,
                    };
                });

                setAppointmentsData(formattedData);
            }

            setLoading(false);
        };

        if (userId) {
            fetchAppointmentStatus();
        }
    }, [userId]); // Fetch when userId becomes available

    return (
        <ScrollView style={tw`flex-1 bg-white px-4 pt-6`}>
            <Text style={tw`text-2xl font-bold text-gray-800 mb-4`}>Your Appointments</Text>

            {loading && <ActivityIndicator size="large" color="#0f766e" />}
            {error && <Text style={tw`text-red-600 mt-4`}>Error: {error}</Text>}

            {!loading && !error && (
                appointmentsData.length > 0 ? (
                    <View style={tw`bg-white rounded-lg shadow p-4`}>
                        {appointmentsData.map((appointment, index) => (
                            <View
                                key={index}
                                style={tw`flex-row justify-between items-center py-3 border-b border-gray-200`}
                            >
                                <Text style={tw`text-sm font-medium text-gray-800`}>
                                    {appointment.patient_name}
                                </Text>
                                <View style={tw`flex-col items-end`}>
                                    <Text
                                        style={tw.style(
                                            'text-xs font-semibold px-2 py-1 rounded-full',
                                            appointment.status === 'Confirmed'
                                                ? 'bg-green-100 text-green-800'
                                                : appointment.status === 'Pending'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : appointment.status === 'Rescheduled'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-red-100 text-red-800'
                                        )}
                                    >
                                        {appointment.status}
                                    </Text>

                                    {(appointment.status === 'Confirmed' || appointment.status === 'Rescheduled') && appointment.formattedDate && appointment.formattedTime && (
                                        <Text style={tw`text-xs text-gray-600 mt-1`}>
                                            on {appointment.formattedDate} at {appointment.formattedTime}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                ) : (
                    <Text style={tw`text-gray-500 mt-4`}>No appointments found.</Text>
                )
            )}
        </ScrollView>
    );
};

export default AppointmentStatusFetcher;