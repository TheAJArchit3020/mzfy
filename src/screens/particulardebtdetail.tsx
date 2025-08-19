import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Header from '@components/reusable/header'

import { heightToDP, widthToDP } from 'react-native-responsive-screens'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParams } from '@managers/routing'


type routeProps = RouteProp<RootStackParams, 'particulardebtdetailscreen'>

const Particulardebtdetail: FC = () => {


    const route = useRoute<routeProps>();



    const { name } = route.params







    return (
        <LinearGradient
            colors={["#443C9F", "#3A346E", "#2B293E", "#272631", "#232323"]}
            locations={[0, 0.64, 0.76, 0.87, 1]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <Header title={name ? name : '-'} />

            <View style={styles.container} >
                <Text style={styles.sectionTitle}>Comming Soon !</Text>
            </View>


        </LinearGradient>
    )
}

export default Particulardebtdetail

const styles = StyleSheet.create({

    container: {
        flex: 0.8,
        justifyContent: "center",
        alignItems: "center",
    },
    sectionTitle: {
        color: "#fff",
        fontSize: widthToDP(4.5),
        fontFamily: "PlusJakartaSans-Bold",
        fontWeight: "600",
        marginBottom: heightToDP(2),
    },

})