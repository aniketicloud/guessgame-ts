import { useState } from "react";
import { TextInput, View, StyleSheet, Alert } from "react-native";
import { PrimaryButton } from "../components/PrimaryButton";
import { Colors } from "../constants/colors";

interface childProps {
  children?: React.ReactNode;
  onPickNumber: (arg0: number) => void;
}
export const StartGameScreen: React.FC<childProps> = ({ onPickNumber }) => {
  const [enteredNumber, setEnteredNumber] = useState("");

  const numberInoutHandler = (enteredText: string) => {
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
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.numberInput}
        maxLength={2}
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={numberInoutHandler}
        value={enteredNumber}
      />
      <View style={styles.buttonsContainers}>
        <View style={styles.buttonsContainer}>
          <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
        </View>
        <View style={styles.buttonsContainer}>
          <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.25,
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
  buttonsContainers: {
    flexDirection: "row",
  },
  buttonsContainer: {
    flex: 1,
  },
});
