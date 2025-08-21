import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { heightToDP, widthToDP } from 'react-native-responsive-screens'


const Undermaintainence: FC = () => {
    return (

        <View style={styles.container}>
            <Image source={require("@images/server/noconnection.png")} style={styles.image} />
            <Text style={styles.text} >No Internet Connection</Text>
        </View>
    )
}

export default Undermaintainence

const styles = StyleSheet.create({
    container: {
        flex: 0.9,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: heightToDP(3)
    },
    image: {
        width: widthToDP(24),
        height: widthToDP(24),
        resizeMode: "contain"
    },
    text: {
        color: "#fff",
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 16
    }
})