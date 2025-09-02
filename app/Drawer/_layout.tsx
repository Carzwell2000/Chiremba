import React from "react";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { withLayoutContext } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const { Navigator } = createDrawerNavigator();
const Drawer = withLayoutContext(Navigator);

function CustomDrawerContent(props: any) {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={tw`flex-1`}>
            <View style={tw`px-5`}>

                {/* Doctors Link */}
                <TouchableOpacity
                    onPress={() => props.navigation.navigate("Doctors")}
                    style={tw`flex-row items-center my-4`}
                >
                    <MaterialIcons name="medical-services" size={24} color="black" />
                    <Text style={tw`text-lg ml-3`}>Doctors</Text>
                </TouchableOpacity>

                {/* Dashboard Link */}
                <TouchableOpacity
                    onPress={() => props.navigation.navigate("Dashboard")}
                    style={tw`flex-row items-center my-4`}
                >
                    <AntDesign name="dashboard" size={24} color="black" />
                    <Text style={tw`text-lg ml-3`}>Dashboard</Text>
                </TouchableOpacity>

            </View>
        </DrawerContentScrollView>
    );
}

export default function DrawerLayout() {
    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{ headerShown: true }}
        >
            <Drawer.Screen name="Doctors" options={{ title: "Doctors" }} />
            <Drawer.Screen name="Dashboard" options={{ title: "Dashboard" }} />
        </Drawer>
    );
}
