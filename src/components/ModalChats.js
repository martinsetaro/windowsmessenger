import React from "react";
import {
    View,
    Text,
    SafeAreaView,
    Image,
    StyleSheet,
    Pressable
} from 'react-native'

export default function ModalChats({btnEnviar}){
    return(

    <View >
        <Text>
            Zona de Chats
        </Text>
        <Pressable
        onPress={btnEnviar}
        >
            <Text>
                Volver al home
            </Text>
        </Pressable>
    </View>



    );
}


