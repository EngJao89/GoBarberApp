import { 
  Image, 
  Pressable, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import logo from "../assets/images/logo.png";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

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

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={16} style={styles.icon}/>
            <TextInput 
              placeholder='E-mail' 
              placeholderTextColor={Colors.zinc_500}  
              style={styles.input}
            />
          </View>
          

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={16} style={styles.icon}/>
            <TextInput 
              placeholder='Senha' 
              placeholderTextColor={Colors.zinc_500} 
              style={styles.input}
            />
          </View>

          <TouchableOpacity onPress={() => router.push('/(dashboard)/userlist/page')} style={styles.button}>
            <Text>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgot}>
            <Text style={styles.textGhost}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
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
  safeArea: {
    flex: 1,
    backgroundColor: Colors.zinc_800,
    justifyContent: 'space-between',
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 16,
  },
  contentLogo:{
    marginTop: 96,
  },
  titleContent: {
    marginTop: 64,
  },
  title: {
    fontSize: 24,
    color: Colors.zinc_50,
    fontWeight: 'bold',
  },
  form: {
    width: "100%", 
    padding: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.zinc_950,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
  },
  icon: {
    color: Colors.zinc_500,
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: Colors.zinc_50,
  },
  button: {
    backgroundColor: Colors.orange_600,
    marginTop: 16,
    marginBottom: 8,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  forgot: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
  },
  textGhost: {
    color: Colors.zinc_50,
    fontWeight: "bold",
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
  buttonFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  textFooter: {
    color: Colors.orange_700,
    fontWeight: "bold",
  },
  iconButton: {
    color: Colors.orange_700,
    marginRight: 8,
  },
});
