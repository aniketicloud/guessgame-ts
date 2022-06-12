import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

interface childProps {
  children?: React.ReactNode;
}

export const NumberContainer: React.FC<childProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: 24,
    borderRadius: 8,
    margin: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: Colors.accent500,
    fontSize: 16,
    fontWeight: "bold",
  },
});
