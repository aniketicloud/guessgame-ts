import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { NumberContainer } from "../components/game/NumberContainer";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { Title } from "../components/ui/Title";

interface ChildProps {
  children?: React.ReactNode;
  userNumber: number;
  onGameOver: any;
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

export const GameScreen: React.FC<ChildProps> = ({
  userNumber,
  onGameOver,
}) => {
  const initialGuess = generateRandomBetween(
    1,
    100,
    userNumber
  );
  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);

  enum directionEnum {
    HIGHER = "HIGHER",
    LOWER = "LOWER",
  }
  const nextGuessHandler = (direction: directionEnum): void => {
    if (
      (direction === directionEnum.LOWER && currentGuess < userNumber) ||
      (direction === directionEnum.HIGHER && currentGuess > userNumber)
    ) {
      Alert.alert("Don't Lie", "You know that this is wrong . . . !", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
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

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(true);
    }
  }, [currentGuess, userNumber, onGameOver]);

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
