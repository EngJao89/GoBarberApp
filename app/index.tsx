import { 
  Image, 
  SafeAreaView, 
  StyleSheet, 
  Text,  
  TouchableOpacity, 
  View 
} from "react-native";
import { router } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

import logo from "../assets/images/logo.png";
import { Colors } from "@/constants/Colors";
import { FormSignInUser } from "@/components/FormSignInUser";

export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.contentLogo}>
          <Image source={logo}/>
        </View>

        <View style={styles.titleContent}>
          <Text style={styles.title}>Login Usuários</Text>
        </View>

        <FormSignInUser />
      </View>

      <View style={styles.divider}></View>

      <View style={styles.footer}>
        <TouchableOpacity 
          onPress={()=> router.push('/(auth)/registeruser/page')} 
          style={styles.buttonFooter}
        >
          <Ionicons name="enter-outline" size={16} style={styles.iconButton}/>
          <Text style={styles.textFooter}>Criar uma conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
    backgroundColor: Colors.zinc_600,
    height: 1,
    width: '100%',
    marginTop: 156,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  iconButton: {
    color: Colors.orange_700,
    marginRight: 8,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.zinc_800,
    justifyContent: 'space-between',
  },
  textFooter: {
    color: Colors.orange_700,
    fontWeight: "bold",
  },
  titleContent: {
    marginTop: 64,
  },
  title: {
    fontSize: 24,
    color: Colors.zinc_50,
    fontWeight: 'bold',
  },
});
