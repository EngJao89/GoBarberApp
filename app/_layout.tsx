import { Stack } from 'expo-router';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { StatusBar, Platform } from 'react-native';
import 'react-native-reanimated';
import { Colors } from '@/constants/Colors';

export default function RootLayout() {

  return (
    <>
      <Stack
        screenOptions={{
          animation: 'none',
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen name="index" options={{headerShown: false}}/>

        <Stack.Screen name="(auth)/registeruser/page" options={{headerShown: false}}/>
        <Stack.Screen name="(auth)/signinbarber/page" options={{headerShown: false}}/>
        <Stack.Screen name="(auth)/registerbarber/page" options={{headerShown: false}}/>
        <Stack.Screen name="(auth)/successuser/page" options={{headerShown: false}}/>
        <Stack.Screen name="(auth)/successbarber/page" options={{headerShown: false}}/>

        <Stack.Screen name="(dashboard)/barberlist/page" options={{headerShown: false}}/>
        <Stack.Screen name="(dashboard)/userlist/page" options={{headerShown: false}}/>
        <Stack.Screen name="(dashboard)/history-user/page" options={{headerShown: false}}/>
        <Stack.Screen name="(dashboard)/profileuser/[id]" options={{headerShown: false}}/>
        <Stack.Screen name="(dashboard)/profilebarber/[id]" options={{headerShown: false}}/>

        <Stack.Screen name="(appointment)/new/page" options={{headerShown: false}}/>
        <Stack.Screen name="(appointment)/successschedule/page" options={{headerShown: false}}/>
        <Stack.Screen name="(appointment)/detailsuser/[id]" options={{headerShown: false}}/>
        <Stack.Screen name="(appointment)/detailsbarber/[id]" options={{headerShown: false}}/>
        <Stack.Screen name="(appointment)/add-availability/page" options={{headerShown: false}}/>
      </Stack>

      {Platform.OS === 'android' && (
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.zinc_900}
          translucent={false}
        />
      )}
      <ExpoStatusBar style="light" />
    </>
  );
}
