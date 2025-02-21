import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { Card } from "@/components/Card";

export default function UserList() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeTitle}>Bem Vindo,</Text>
          <Text style={styles.nameTitle}>João Ricardo</Text>
        </View>

        <Image source={{ uri: 'https://github.com/EngJao89.png' }} style={styles.profile}/>
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