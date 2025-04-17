import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import logo from "../../../assets/images/logo.png";
import { Colors } from "@/constants/Colors";
import { FormRegisterBarber } from "@/components/FormRegisterBarber";

export default function RegisterUser() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.contentLogo}>
          <Image source={logo}/>
        </View>

        <View style={styles.titleContent}>
          <Text style={styles.title}>Crie sua conta</Text>
        </View>

        <FormRegisterBarber />
      </View>

      <View style={styles.divider}></View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.buttonFooter} onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={16} style={styles.iconButton}/>
          <Text style={styles.textFooter}>Voltar para o login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.zinc_800,
    justifyContent: 'space-between',
  },
  buttonFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 16,
  },
  contentLogo:{
    marginTop: 96,
  },
  divider: {
    backgroundColor: Colors.zinc_700,
    height: 1,
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -6,
    paddingBottom: 2,
  },
  iconButton: {
    color: Colors.zinc_300,
    marginRight: 8,
  },
  titleContent: {
    marginTop: 64,
  },
  title: {
    fontSize: 24,
    color: Colors.zinc_50,
    fontWeight: 'bold',
  },
  textFooter: {
    color: Colors.zinc_300,
    fontWeight: "bold",
  },
});