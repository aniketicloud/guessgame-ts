import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { StartGameScreen } from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import { Colors } from "./constants/colors";
import { GameScreen } from "./screens/GameScreen";
import { GameOverScreen } from "./screens/GameOverScreen";

export enum ProjectFonts {
  OpenSans = "open-sans",
  OpenSansBold = "open-sans-bold",
}

export default function App() {
  const [userNumber, setUserNumber] = useState<number>();
  const [isGameOver, setIsGameOver] = useState<boolean>(true);

  const [fontsLoaded] = useFonts({
    [ProjectFonts.OpenSans]: require("./assets/fonts/OpenSans-Regular.ttf"),
    [ProjectFonts.OpenSansBold]: require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const pickedNumberHandler = (pickedNumber: number) => {
    setUserNumber(pickedNumber);
    setIsGameOver(false);
  };

  const gameOverHandler = (value: boolean) => {
    setIsGameOver(value);
  };

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;
  if (userNumber)
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  if (isGameOver && userNumber) screen = <GameOverScreen />;

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
