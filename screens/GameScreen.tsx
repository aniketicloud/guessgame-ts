import { useEffect, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Alert,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { NumberContainer } from "../components/game/NumberContainer";
import { Card } from "../components/ui/Card";
import { InstructionText } from "../components/ui/InstructionText";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { Title } from "../components/ui/Title";
import { GuessLogItem } from "../components/game/GuessLogItem";

interface childProps {
  children?: React.ReactNode;
  userNumber: number;
  onGameOver: (numberOfRounds: number) => void;
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

export const GameScreen: React.FC<childProps> = ({
  userNumber,
  onGameOver,
}) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
  const [guessRounds, setGuessRounds] = useState<number[]>([]);
  const { width, height } = useWindowDimensions();

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
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  const guessRoundsListLength = guessRounds.length;

  let content = (
    <>
      <NumberContainer number={currentGuess} />

      <Card>
        <InstructionText
          text="Is your number"
          style={styles.instructionTextFirst}
        />
        <InstructionText
          text="Lower    or    Higher"
          style={styles.instructionTextSecond}
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
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <View style={{ alignItems: "center" }}>
              <InstructionText
                text="Lower"
                style={{ marginBottom: 12, color: "#fae105" }}
              />
            </View>
            <PrimaryButton
              onPress={nextGuessHandler.bind(this, directionEnum.LOWER)}
            >
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>

          <NumberContainer number={currentGuess} />

          <View style={[styles.buttonContainer]}>
            <View style={{ alignItems: "center" }}>
              <InstructionText
                text="Higher"
                style={{ marginBottom: 12, color: "#fae105" }}
              />
            </View>
            <PrimaryButton
              onPress={nextGuessHandler.bind(this, directionEnum.HIGHER)}
            >
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title title="Opponent's Guess" />

      {content}

      <View style={styles.logListContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  instructionTextFirst: {
    fontSize: 20,
  },
  instructionTextSecond: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  buttonsContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
  logListContainer: {
    flex: 1,
    padding: 16,
  },
});
