import { StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";

interface childProps {
  children: React.ReactNode;
}

export const InstructionText: React.FC<childProps> = ({ children }) => {
  return <Text style={styles.instructionText}>{children}</Text>;
};

const styles = StyleSheet.create({
  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
  },
});
