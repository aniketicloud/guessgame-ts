import { StyleSheet, View } from "react-native";
import { StartGameScreen } from "./screens/StartGameScreen";

export default function App() {
  return (
    <View style={styles.inputContainer}>
      <StartGameScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#72063c",
    padding: 16,
    marginHorizontal: 24,
    marginTop: 100,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
