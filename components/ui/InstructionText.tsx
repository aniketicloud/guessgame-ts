import { StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";

interface childProps {
  children: React.ReactNode;
  style?: {};
}

export const InstructionText: React.FC<childProps> = ({ children, style }) => {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
  },
});
