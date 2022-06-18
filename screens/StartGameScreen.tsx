import { useState } from "react";
import { TextInput, View, StyleSheet, Alert } from "react-native";
import { Card } from "../components/ui/Card";
import { InstructionText } from "../components/ui/InstructionText";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { Title } from "../components/ui/Title";
import { Colors } from "../constants/colors";

interface childProps {
  children?: React.ReactNode;
  onPickNumber: (arg0: number) => void;
}
export const StartGameScreen: React.FC<childProps> = ({ onPickNumber }) => {
  const [enteredNumber, setEnteredNumber] = useState("");

  const numberInputHandler = (enteredText: string) => {
    setEnteredNumber(enteredText);
  };

  const resetInputHandler = () => {
    setEnteredNumber("");
  };

  const confirmInputHandler = () => {
    const chosenNmber: number = parseInt(enteredNumber);
    if (isNaN(chosenNmber) || chosenNmber <= 0 || chosenNmber > 99) {
      // show alert
      Alert.alert(
        "Invalid number!",
        "Input has to be a number between 1 and 99",
        [
          {
            text: "OK",
            style: "destructive",
            onPress: resetInputHandler,
          },
        ]
      );
      return;
    }
    console.log("Valid Number");
    onPickNumber(chosenNmber);
  };

  return (
    <View style={styles.rootContainer}>
      <Title title="Guess My Number" />
      <Card>
        <InstructionText text="Enter a Number" />
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={numberInputHandler}
          value={enteredNumber}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
