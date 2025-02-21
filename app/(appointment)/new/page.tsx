import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import { Colors } from "@/constants/Colors";

export default function Appointment () {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Ionicons name="arrow-back-outline" size={32} color={Colors.zinc_200}/>
          </View>

          <View>
            <Text style={styles.headerTitle}>Agendamento</Text>
          </View>
          

          <View>
            <Image source={{ uri: 'https://github.com/EngJao89.png' }} style={styles.profile}/>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.zinc_900,
  },
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 180,
  },
  header: {
    width: '100%',
    marginBottom: 36,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'baseline',
  },
  headerTitle: {
    color: Colors.zinc_100,
    fontSize: 28,
    fontWeight: 'bold',
  },
  profile: {
    width: 56,
    height: 56,
    borderRadius: 32,
  },
});

