import { StyleSheet, Text } from "react-native";
import { ProjectFonts } from "../../App";
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
    fontFamily: ProjectFonts.OpenSans,
    color: Colors.accent500,
    fontSize: 24,
  },
});
