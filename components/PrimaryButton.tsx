import { Text, View } from "react-native";

interface ChildProps {
  children?: React.ReactNode;
  color?: string;
  // onClick?: () => void;
}

export const PrimaryButton: React.FC<ChildProps> = ({ children, color }) => {
  return (
    <View>
      <Text style={{ backgroundColor: color }}>{children}</Text>
    </View>
  );
};

// export default PrimaryButton;
