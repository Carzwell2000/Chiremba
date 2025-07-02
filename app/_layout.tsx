import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack >
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="Login" options={{ headerShown: false }} />
    <Stack.Screen name="SignUp" options={{ headerShown: false }} />
    <Stack.Screen name="Home" options={{ headerShown: false }} />
    <Stack.Screen name="Community" options={{ headerShown: false }} />
    <Stack.Screen name="Doctors" options={{ headerShown: false }} />
    <Stack.Screen name="Pharmacy" options={{ headerShown: false }} />
    <Stack.Screen name=" Welcome" options={{ headerShown: false }} />
    <Stack.Screen name="Loans" options={{ headerShown: false }} />
    <Stack.Screen name="Message" options={{ headerShown: false }} />
    <Stack.Screen name="Chiremba" options={{ headerShown: false }} />

  </Stack >
}
