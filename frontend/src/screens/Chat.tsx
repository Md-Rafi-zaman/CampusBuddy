import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useLayoutEffect, useCallback } from 'react';
import ChatsComponent from '~/components/ChatsComponent';
import useMessagesNavigationContext from "~/hooks/useMessagesNavigationContext";

export default function Chat() {
    const { navigate } = useNavigation<any>();

    const { chatActive, deactivateScreen } = useMessagesNavigationContext();

    useLayoutEffect(() => {
        if(chatActive)
            navigate('ChatScreen', chatActive)
    }, [])

    const looseFocusCallback = useCallback(() => {
        return () => {
            deactivateScreen()
        }
    }, [])

    useFocusEffect(looseFocusCallback)

    return (
        <ChatsComponent />
    )
}