// Configuração dinâmica do Expo baseada no ambiente
const IS_DEV = process.env.NODE_ENV === 'development' || process.env.EXPO_PUBLIC_ENVIRONMENT === 'development';

export default {
  expo: {
    name: "GoBarberApp",
    slug: "gobarberapp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      environment: process.env.EXPO_PUBLIC_ENVIRONMENT || (IS_DEV ? 'development' : 'production'),
      apiUrl: process.env.EXPO_PUBLIC_API_URL || (IS_DEV ? 'http://192.168.100.11:3333' : 'https://api-gb-vowe.onrender.com'),
      debug: process.env.EXPO_PUBLIC_DEBUG === 'true' || IS_DEV,
    }
  }
};
