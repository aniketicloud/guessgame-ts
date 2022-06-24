import { useEffect, useState } from "react";
import { Text, FlatList, View, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { NumberContainer } from "../components/game/NumberContainer";
import { Card } from "../components/ui/Card";
import { InstructionText } from "../components/ui/InstructionText";
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
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
  const [guessRounds, setGuessRounds] = useState<number[]>([]);

  // using useeffect to set minBoundary & maxBoundary to original value
  // when new game will run in case there was previous game run
  // we can also set the numbers in *onGameOver*
  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

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
    setGuessRounds((previousGuessRounds) => [
      newRndNumber,
      ...previousGuessRounds,
    ]);
  };

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(true);
    }
  }, [currentGuess, userNumber, onGameOver]);

  return (
    <View style={styles.screen}>
      <Title title="Opponent's Guess" />
      <NumberContainer number={currentGuess} />

      <Card>
        <InstructionText
          text="Higher or lower"
          style={styles.instructionText}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={nextGuessHandler.bind(this, directionEnum.LOWER)}
            >
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={nextGuessHandler.bind(this, directionEnum.HIGHER)}
            >
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>

      <View>
        {/* {guessRounds.map((guessRound) => (
          <Text key={guessRound}>{guessRound}</Text>
        ))} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => <Text>{itemData.item}</Text>}
          keyExtractor={(item) => item.toString()}
        />
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
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
