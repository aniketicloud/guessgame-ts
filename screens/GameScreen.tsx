import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { NumberContainer } from "../components/game/NumberContainer";
import { Title } from "../components/ui/Title";

interface ChildProps {
  children?: React.ReactNode;
  userNumber: number;
}

function generateRandomBetween(
  min: number,
  max: number,
  exclude?: number
): number {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  return rndNum === exclude ? generateRandomBetween(min, max, exclude) : rndNum;
}

export const GameScreen: React.FC<ChildProps> = ({ userNumber }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
  return (
    <View style={styles.screen}>
      <Title title="Opponent's Guess" />
      {/* <Text>Guess</Text> */}
      <NumberContainer>{currentGuess}</NumberContainer>

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
    // TODO: adjust/remove padding
    // !!!!!!!
    padding: 32,
  },
});
