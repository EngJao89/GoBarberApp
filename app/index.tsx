import { SafeAreaView, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.zinc_800}}>
      <View>
        <Text>Go Barber</Text>
      </View>
    </SafeAreaView>
  )
}
