import { Text, View } from "react-native";

interface ChildProps {
  children?: React.ReactNode;
}

export const GameScreen: React.FC<ChildProps> = () => {
  return (
    <View>
      <Text>Game Screen</Text>
    </View>
  );
};
