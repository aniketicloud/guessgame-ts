import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { NumberContainer } from "../components/game/NumberContainer";
import { PrimaryButton } from "../components/ui/PrimaryButton";
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

let minBoundary: number = 1;
let maxBoundary: number = 100;

export const GameScreen: React.FC<ChildProps> = ({ userNumber }) => {
  const initialGuess = generateRandomBetween(
    minBoundary,
    maxBoundary,
    userNumber
  );
  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);

  enum directionEnum {
    HIGHER = "HIGHER",
    LOWER = "LOWER",
  }
  const nextGuessHandler = (direction: directionEnum) => {
    // TODO: Bread out of infinite loop for incorrect user input
    if (direction === directionEnum.LOWER) {
      maxBoundary = currentGuess - 1;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
  };
  return (
    <View style={styles.screen}>
      <Title title="Opponent's Guess" />
      {/* <Text>Guess</Text> */}
      <NumberContainer>{currentGuess}</NumberContainer>

      <View>
        <Text>Higher or lower</Text>
        <View>
          <PrimaryButton
            onPress={nextGuessHandler.bind(this, directionEnum.LOWER)}
          >
            -
          </PrimaryButton>
          <PrimaryButton
            onPress={nextGuessHandler.bind(this, directionEnum.HIGHER)}
          >
            +
          </PrimaryButton>
        </View>
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
