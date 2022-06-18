import { StyleSheet, Text } from "react-native";
import { ProjectFonts } from "../../App";

interface childProps {
  children?: React.ReactNode;
  title: string;
}

export const Title: React.FC<childProps> = ({ title }) => {

  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontFamily: ProjectFonts.OpenSansBold,
    fontSize: 24,
    color: "white",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "white",
    padding: 12,
  },
});
