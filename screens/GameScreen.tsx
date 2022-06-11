import { Text, View, StyleSheet } from "react-native";
import { Title } from "../components/Title";

interface ChildProps {
  children?: React.ReactNode;
}

export const GameScreen: React.FC<ChildProps> = () => {
  return (
    <View style={styles.screen}>
      <Title title="Opponent's Guess" />
      <Text>Guess</Text>

      <View>
        <Text>Higher or lower</Text>
        <Text>+ button</Text>
        <Text>- button</Text>
      </View>

      <View>
        <Text>Log Rounds</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 32,
  },
});
