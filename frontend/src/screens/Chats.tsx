import {
    View,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    Pressable,
    TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import useThemeContext from "~/hooks/useThemeContext";
import { FlashList } from "@shopify/flash-list";
import ConversationItem from "~/components/ConversationItem";
import ListLoader from "~/components/ListLoader";
import { useCallback, useState } from "react";
import { initialNumberOfConversations } from "~/lib/helperFunctions";
import { ThemedTextInput } from "~/components/ThemedComponents";
import useChatsSearchContext from "~/hooks/useChatsSearchContext";
import useChatsContext from "~/hooks/useChatsContext";
import { ChatsSearchContextProvider } from "~/contexts/chatsSearchContext";
import useAppContext from "~/hooks/useAppContext";

const CoversationsArea = () => {
    const {
        conversations,
        user,
        fetchMoreConversations,
        conversationsAreLoading,
    } = useChatsContext();
    const { id: currentUserId } = user;

    const [moreDataFetchingAllowed, setMoreDataFetchingAllowed] = useState(false);
    const allowMoreDataFetching = useCallback(() => {
        setMoreDataFetchingAllowed(true);
    }, []);

    const getMoreConversations = () => {
        if (
            moreDataFetchingAllowed &&
            conversations.length >= initialNumberOfConversations
        )
            fetchMoreConversations();
    };

    return (
        <View style={styles.chatListArea}>
            <View style={{ flex: 1 }}>
                <FlashList
                    onScroll={allowMoreDataFetching}
                    ListHeaderComponent={() => <View style={{ height: 10 }}></View>}
                    ListFooterComponent={() => (
                        <ListLoader isLoading={conversationsAreLoading} />
                    )}
                    estimatedItemSize={40}
                    data={conversations}
                    renderItem={({ item }) => (
                        <ConversationItem
                            userId={item.participants.filter((id) => id !== currentUserId)[0]}
                            lastMessage={item.lastMessage}
                            timeUpdated={item.updatedAt}
                            unreadMessages={item.unreadMessages}
                        />
                    )}
                    onEndReached={getMoreConversations}
                    onEndReachedThreshold={0}
                />
            </View>
        </View>
    );
};

const SearchArea = () => {
    const { theme } = useThemeContext();

    const { filterWord, setFilterWord, clearSearchArea } =
        useChatsSearchContext();

    const { dismissKeyboard } = useAppContext();

    return (
        <View
            style={[styles.searchArea, { borderBottomColor: theme.colors.backdrop }]}
        >
            <View
                style={[
                    styles.searchBar,
                    { backgroundColor: `${theme.colors.primary}` },
                ]}
            >
                <TouchableOpacity onPress={dismissKeyboard}>
                    <AntDesign name="search1" size={20} color={'white'} />
                </TouchableOpacity>
                <ThemedTextInput
                    placeholder="Search Chats"
                    placeholderTextColor={'white'}
                    style={[styles.searchBarInput]}
                    value={filterWord}
                    onChangeText={(text) => setFilterWord(text)}
                />
                {filterWord !== "" && (
                    <TouchableOpacity onPress={clearSearchArea}>
                        <AntDesign
                            name="closecircle"
                            size={15}
                            color={'white'}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default function Chats() {
    const { dismissKeyboard } = useAppContext();

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={{ flex: 1 }}>
                <ChatsSearchContextProvider>
                    <SearchArea />
                    <CoversationsArea />
                </ChatsSearchContextProvider>
            </View>
        </TouchableWithoutFeedback>
    );
}

// prettier-ignore
const styles = StyleSheet.create({
    searchArea: {
        paddingHorizontal: 20,
        flex: 0.01,
        minHeight: 80,
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 0.3,
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        minWidth: 300,
        minHeight: 34,
        borderRadius: 10,
        color: "black",
        paddingLeft: 6,
    },
    searchBarInput: {
        height: "90%",
        marginHorizontal: 5,
        fontSize: 18,
        flex: 0.98,
    },
    chatListArea: {
        flex: 1,
    },
});