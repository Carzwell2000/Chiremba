import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import { createClient } from '@supabase/supabase-js';

// Setup Supabase client
const supabaseUrl = "https://erpuslyknuetnqlehynl.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVycHVzbHlrbnVldG5xbGVoeW5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3ODMxMDUsImV4cCI6MjA2NDM1OTEwNX0.f1ubCigkh9u2ehWPeB_j4RyB5GEC70jHbl7T8NLnRdA"; // Use full anon key
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define Appointment type to include timestamp and formattedTime/formattedDate
type Appointment = {
    patient_name: string;
    status: string;
    appointment_timestamp?: string; // Original timestamp from DB
    formattedTime?: string; // Formatted time string (e.g., "02:30 PM")
    formattedDate?: string; // Formatted date string (e.g., "July 11, 2025")
};

const AppointmentStatusFetcher = () => {
    const [appointmentsData, setAppointmentsData] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAppointmentStatusAndPatientNames = async () => {
            setLoading(true);
            setError(null);

            // Ensure 'appointment_timestamp' is selected from your Supabase table
            const { data, error } = await supabase
                .from('Appointments')
                .select('patient_name, status, appointment_timestamp') // <<< --- Make sure timestamp is fetched!
                .order('appointment_timestamp', { ascending: true });

            if (error) {
                console.error('Error fetching appointment data:', error);
                setError('Failed to fetch appointment data. Please try again.');
            } else {
                // Format the data to include readable time and date
                const formattedData = data ? data.map(appt => {
                    let formattedTime = '';
                    let formattedDateDisplay = ''; // Initialize formattedDateDisplay
                    if (appt.appointment_timestamp) {
                        const dateObj = new Date(appt.appointment_timestamp);
                        formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

                        // Format the date without the weekday
                        formattedDateDisplay = dateObj.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        });
                    }
                    return {
                        ...appt,
                        formattedTime: formattedTime, // Store formatted time
                        formattedDate: formattedDateDisplay, // Store formatted date
                    };
                }) : [];
                setAppointmentsData(formattedData);
            }
            setLoading(false);
        };

        fetchAppointmentStatusAndPatientNames();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <ScrollView style={tw`flex-1 bg-white px-4 pt-6`}>
            <Text style={tw`text-2xl font-bold text-gray-800 mb-4`}>Patient Appointment Statuses</Text>

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
                                            // Apply status-based colors
                                            appointment.status === 'Confirmed'
                                                ? 'bg-green-100 text-green-800'
                                                : appointment.status === 'Pending'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : appointment.status === 'Rescheduled'
                                                        ? 'bg-blue-100 text-blue-800' // Added blue for Rescheduled
                                                        : 'bg-red-100 text-red-800' // Default for 'Cancelled' or other
                                        )}
                                    >
                                        {appointment.status}
                                    </Text>
                                    {/* Display scheduled date and time if status is 'Confirmed' or 'Rescheduled' */}
                                    {(appointment.status === 'Confirmed' || appointment.status === 'Rescheduled') && appointment.formattedTime && appointment.formattedDate && (
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