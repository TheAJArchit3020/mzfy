import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { widthToDP } from 'react-native-responsive-screens'

interface noDataProps {
    style?: any
}

const Nodata: FC<noDataProps> = ({ style }) => {
    return (
        <View style={[styles.container, style]} >
            <Image source={require("@images/server/nodata.png")} style={styles.nodataImage} />
            <Text style={styles.nodataText} >No Data Available</Text>
        </View>
    )
}

export default Nodata

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: widthToDP(5),
        justifyContent: "center",
        alignItems: "center",
    },
    nodataImage: {
        width: widthToDP(20),
        height: widthToDP(20),
        resizeMode: "contain"
    },
    nodataText: {
        color: "#fff",
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 14,
    }
})