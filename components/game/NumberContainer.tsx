import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Colors } from "../../constants/colors";

interface childProps {
  children?: React.ReactNode;
  number: number;
}

export const NumberContainer: React.FC<childProps> = ({ number }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{number}</Text>
    </View>
  );
};

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: deviceWidth < 380 ? 12 : 24,
    margin: deviceWidth < 380 ? 12 : 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: Colors.accent500,
    fontSize: deviceWidth < 380 ? 28 : 36,
    fontFamily: "open-sans-bold",
  },
});
