import { Animated, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useEffect, useRef } from "react";

import { Colors } from "@/constants/Colors";

export function Loading() {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={{ color: Colors.zinc_100, marginBottom: 20 }}>Carregando...</Text>
      <View style={{ height: 4, width: '80%', backgroundColor: Colors.zinc_700 }}>
        <Animated.View style={{ height: '100%', width, backgroundColor: Colors.zinc_100 }} />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.zinc_900,
  },
});