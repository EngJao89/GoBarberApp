import { useEffect, useRef } from 'react';
import { Animated, Easing, SafeAreaView, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export function NotFound() {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        <Ionicons name="calendar-outline" size={100} color={Colors.zinc_500} />
      </Animated.View>
      <Text style={styles.title}>Agendamento não encontrado</Text>
      <Text style={styles.subtitle}>Toque no botão "+" para criar um novo</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.zinc_900,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: Colors.zinc_100,
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.zinc_100,
    fontSize: 20,
  },
});
