import { Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { Card } from "@/components/Card";
import { router } from "expo-router";

export default function UserList() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeTitle}>Bem Vindo,</Text>

          <TouchableOpacity onPress={() => router.push('/(dashboard)/profileuser/page')}>
            <Text style={styles.nameTitle}>João Ricardo</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push('/(dashboard)/profileuser/page')}>
          <Image source={{ uri: 'https://github.com/EngJao89.png' }} style={styles.profile}/>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.listTitle}>Cabelereiros</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </ScrollView>
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
    backgroundColor: Colors.zinc_800,
    paddingTop: 24,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 180,
  },
  header: {
    width: '100%',
    paddingTop: Platform.OS === "android" ? 44 : 0,
    marginTop: 24,
    marginBottom: 36,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  welcomeTitle: {
    color: Colors.zinc_500,
    fontSize: 24,
    fontWeight: '400',
  },
  nameTitle: {
    color: Colors.orange_600,
    fontSize: 36,
    fontWeight: 'bold',
  },
  listTitle: {
    color: Colors.zinc_100,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 36,
  },
  profile: {
    width: 56,
    height: 56,
    borderRadius: 32,
  },
});