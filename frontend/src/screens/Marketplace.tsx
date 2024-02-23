import { View, TouchableWithoutFeedback } from "react-native";
import { ThemedText } from "~/components/ThemedComponents";
import useAppContext from "~/hooks/useAppContext";

export default function Marketplace() {
    const { dismissKeyboard } = useAppContext();

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ThemedText>Marketplace</ThemedText>
            </View>
        </TouchableWithoutFeedback>
    );
}
