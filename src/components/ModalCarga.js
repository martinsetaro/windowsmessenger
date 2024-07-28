import React from "react";
import {
    View,
    Text,
    SafeAreaView,
    Image,
    StyleSheet
} from 'react-native'
import loggo from '../../assets/logo.gif'




export default function ModalCarga(){

return(
    <SafeAreaView>
        <View>
           <Image
           source={loggo}
           style={styles.imagen}
           />
        </View>
    </SafeAreaView>
)



}

const styles = StyleSheet.create({
    imagen:{
        width:200,
        height:200
    }
})