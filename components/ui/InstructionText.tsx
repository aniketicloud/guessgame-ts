import { StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";

interface childProps {
  children?: React.ReactNode;
  text: string;
  style?: {};
}

export const InstructionText: React.FC<childProps> = ({ text, style }) => {
  return <Text style={[styles.instructionText, style]}>{text}</Text>;
};

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: "open-sans",
    color: Colors.accent500,
    fontSize: 24,
  },
});
