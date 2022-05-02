import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "./components/PrimaryButton";
import { StartGameScreen } from "./screens/StartGameScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello React Native TypeScript World!</Text>
      <PrimaryButton color="red">Hello</PrimaryButton>
      <StartGameScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
