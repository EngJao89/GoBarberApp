import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}}/>

        <Stack.Screen name="(auth)/registeruser/page" options={{headerShown: false}}/>
        <Stack.Screen name="(auth)/signinbarber/page" options={{headerShown: false}}/>
        <Stack.Screen name="(auth)/registerbarber/page" options={{headerShown: false}}/>
        <Stack.Screen name="(auth)/successuser/page" options={{headerShown: false}}/>
        <Stack.Screen name="(auth)/successbarber/page" options={{headerShown: false}}/>

        <Stack.Screen name="(dashboard)/userlist/page" options={{headerShown: false}}/>
        <Stack.Screen name="(dashboard)/profileuser/page" options={{headerShown: false}}/>
        <Stack.Screen name="(dashboard)/profilebarber/page" options={{headerShown: false}}/>

        <Stack.Screen name="(appointment)/new/page" options={{headerShown: false}}/>
      </Stack>

      <StatusBar style="light" />
    </>
  );
}
