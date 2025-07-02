import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import Footer from './Components/Footer';

const MessageScreen = () => {
    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={tw`flex-1`}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={80}
                >
                    {/* Header */}
                    <View style={tw`flex-row justify-between items-center px-4 py-2 mt-10`}>
                        <Ionicons name="menu" size={28} />
                        <Text style={tw`text-base font-semibold`}>Message</Text>
                        <TouchableOpacity>
                            <Ionicons name="person-circle-outline" size={28} />
                        </TouchableOpacity>
                    </View>

                    {/* Content Area */}
                    <ScrollView contentContainerStyle={tw`flex-grow px-4 pb-32`}>
                        <View style={tw`flex-1`} />

                        {/* Input Card */}
                        <View style={tw`mt-4`}>
                            <View style={tw`border border-teal-900 rounded-xl p-3`}>
                                <TextInput
                                    placeholder="Describe your challenge or solution and get recommendation from Chiremba Assist"
                                    placeholderTextColor="#444"
                                    multiline
                                    style={tw`text-sm text-black`}
                                />
                            </View>
                        </View>
                    </ScrollView>

                    {/* Sticky Footer */}
                    <View style={tw`absolute bottom-0 left-0 right-0 pb-2`}>
                        <Footer />
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default MessageScreen;
