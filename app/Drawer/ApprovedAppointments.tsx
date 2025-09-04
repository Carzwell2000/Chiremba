

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://erpuslyknuetnqlehynl.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVycHVzbHlrbnVldG5xbGVoeW5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3ODMxMDUsImV4cCI6MjA2NDM1OTEwNX0.f1ubCigkh9u2ehWPeB_j4RyB5GEC70jHbl7T8NLnRdA";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import tw from "twrnc";
import auth from '../Components/firebaseConfig'; // ✅ make sure this exports auth

const ApprovedAppointments = () => {
    const [approvedAppointments, setApprovedAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchApprovedAppointments = async () => {
        setLoading(true);

        try {
            // ✅ Get current Firebase user
            const user = auth.currentUser; // 👈 fixed
            if (!user) {
                console.error("No user logged in");
                setApprovedAppointments([]);
                setLoading(false);
                return;
            }

            // ✅ Fetch only this user's approved appointments from Supabase
            const { data, error } = await supabase
                .from("Approvedappointments")
                .select("*")
                .eq("user_id", user.uid) // filter by Firebase UID
                .order("appointment_timestamp", { ascending: true });

            if (error) {
                console.error("Failed to fetch approved appointments:", error.message);
                setApprovedAppointments([]);
            } else {
                const formattedData = data.map((appt) => {
                    const dt = new Date(appt.appointment_timestamp);
                    return {
                        ...appt,
                        formattedDateTime: `${dt.toLocaleDateString()} ${dt.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}`,
                    };
                });
                setApprovedAppointments(formattedData || []);
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            setApprovedAppointments([]);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchApprovedAppointments();
    }, []);

    const renderItem = ({ item }: { item: any }) => (
        <View style={tw`flex-row justify-between items-center p-3 border-b border-gray-200`}>
            <View>
                <Text style={tw`text-base font-semibold text-gray-800`}>{item.patient_name}</Text>
                <Text style={tw`text-sm text-gray-500`}>{item.formattedDateTime}</Text>
            </View>
            <Text
                style={tw`px-3 py-1 rounded-full text-xs font-bold ${item.status === "approved" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
            >
                {item.status}
            </Text>
        </View>
    );

    return (
        <View style={tw`flex-1 bg-white p-4`}>
            <Text style={tw`text-xl font-bold mb-4 text-center`}>Approved Appointments</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#22c55e" style={tw`mt-10`} />
            ) : approvedAppointments.length === 0 ? (
                <Text style={tw`text-center text-gray-500 mt-10`}>No approved appointments found.</Text>
            ) : (
                <FlatList
                    data={approvedAppointments}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
};

export default ApprovedAppointments;
