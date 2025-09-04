


import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://erpuslyknuetnqlehynl.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVycHVzbHlrbnVldG5xbGVoeW5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3ODMxMDUsImV4cCI6MjA2NDM1OTEwNX0.f1ubCigkh9u2ehWPeB_j4RyB5GEC70jHbl7T8NLnRdA";
const supabase = createClient(supabaseUrl, supabaseAnonKey);





import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import tw from "twrnc"; // ✅ Tailwind for RN
import { Link } from 'expo-router';


const DashboardOverview = () => {
    const [approvedappointments, setApprovedappointments] = useState<any[]>([]);
    const [rescheduledappointments, setRescheduledappointments] = useState<any[]>([]);

    useEffect(() => {
        fetchAllCounts();
    }, []);

    const fetchAllCounts = async () => {
        const { data: approved } = await supabase.from("Approvedappointments").select("*");
        const { data: rescheduled } = await supabase.from("Rescheduledappointments").select("*");

        setApprovedappointments(approved || []);
        setRescheduledappointments(rescheduled || []);
    };

    const Card = ({
        title,
        count,
        icon,
        color,
    }: {
        title: string;
        count: number;
        icon: string;
        color: string;
    }) => (
        <View style={tw`bg-white rounded-2xl p-4 flex-row items-center shadow`}>
            <Icon name={icon} size={22} color={color} style={tw`mr-3`} />
            <View>
                <Text style={tw`text-sm text-gray-600`}>{title}</Text>
                <Text style={tw`text-lg font-bold`}>{count}</Text>
            </View>
        </View>
    );

    return (
        <ScrollView style={tw`flex-1 bg-blue-50 p-4`}>
            <Text style={tw`text-lg font-bold mb-2`}>Dashboard Overview</Text>

            <Text style={tw`text-lg font-bold text-center mb-3`}>Appointments</Text>
            <View style={tw`flex-row`}>
                <Link href="/Drawer/ApprovedAppointments" asChild>
                    <TouchableOpacity style={tw`flex-1 mx-1`}>
                        <Card
                            title="Approved"
                            count={approvedappointments.length}
                            icon="thumbs-up"
                            color="#22c55e"
                        />
                    </TouchableOpacity>
                </Link>

                <Link href="/Drawer/RescheduledAppointments" asChild>
                    <TouchableOpacity style={tw`flex-1 ml-2`}>
                        <Card
                            title="Rescheduled"
                            count={rescheduledappointments.length}
                            icon="clock"
                            color="#f97316"
                        />
                    </TouchableOpacity>
                </Link>
            </View>
        </ScrollView>
    );
};

export default DashboardOverview;
;
