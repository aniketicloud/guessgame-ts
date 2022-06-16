import { Text, View } from "react-native";

interface ChildProps {
  children?: React.ReactNode;
}

export const GameOverScreen: React.FC<ChildProps> = () => {
  return (
    <View>
      <Text>Game Over Screen</Text>
    </View>
  );
};
