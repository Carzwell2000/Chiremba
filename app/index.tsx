
import { View } from "react-native";
import tw from "twrnc";
import Chiremba from "./Chiremba"; // Adjust the path as necessary
import "expo-router/entry";
import 'react-native-gesture-handler';

export default function Index() {
  return (
    <View style={tw`flex-1 justify-end bg-white  `}>
      <Chiremba />
    </View>
  );
}
