import { StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";

interface childProps {
  children?: React.ReactNode;
  title: string;
}

export const Title: React.FC<childProps> = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "white",
    padding: 12,
  },
});
