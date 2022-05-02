import { TextInput, View } from "react-native";
import { PrimaryButton } from "../components/PrimaryButton";

export const StartGameScreen = () => {
  return (
    <View>
      <TextInput />
      <PrimaryButton>Reset</PrimaryButton>
      <PrimaryButton>Confirm</PrimaryButton>
    </View>
  );
};
