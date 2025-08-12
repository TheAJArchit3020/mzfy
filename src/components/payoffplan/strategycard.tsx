import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import Card from '@components/reusable/card'
import LinearGradient from 'react-native-linear-gradient'


interface strategyProps {
    title: any,
    subtitle: any,
    onPress?: any
}

const Strategycard: FC<strategyProps> = ({ title, subtitle, onPress }) => {



    return (
        <Card style={styles.section_card} cardStyle={styles.section_card_inner}>
            <LinearGradient
                colors={['#24243E', '#302B63', '#0F0C29']}
                locations={[0, 0.48, 1]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ flex: 1 }}
            >

                <View style={styles.section_card_inner_content}>
                    <View style={styles.section_card_inner_content_item}>
                        <Text style={styles.section_card_text1}>Current Strategy</Text>
                        <Text style={styles.section_card_text2}>{title}</Text>
                        <Text style={styles.section_card_text3}>{subtitle}</Text>
                    </View>
                </View>
            </LinearGradient>


            <LinearGradient
                colors={['#ffffff', '#ffffff']}
                locations={[0, 1]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
            >
                <TouchableOpacity style={styles.logbutton} onPress={onPress}>
                    <Text style={[styles.logbutton_text]}>Change Strategy</Text>
                    <Image style={styles.image} source={require('@images/payoffplan/shuffle.png')} />
                </TouchableOpacity>
            </LinearGradient>

        </Card>
    )
}

export default Strategycard

const styles = StyleSheet.create({
    image: {
        width: 16,
        height: 16,
        resizeMode: "contain"
    },
    logbutton_text: {
        fontFamily: "PlusJakartaSans-Bold",
        color: "#2A2A2A",
        fontSize: 14
    },
    logbutton: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    },
    section_card_inner_content: {
        paddingHorizontal: 20,
        paddingTop: 13
    },
    section_card_inner_content_item: {
        flexDirection: "column",
        gap: 10
    },
    section_card_text1: {
        fontFamily: "PlusJakartaSans-Bold",
        color: "#fff",
        fontSize: 12
    },
    section_card_text2: {
        fontFamily: "PlusJakartaSans-Bold",
        color: "#fff",
        fontSize: 30,
        textTransform:"capitalize"
    },
    section_card_text3: {
        fontStyle: "italic",
        color: "#F7F7F7",
        fontSize: 12
    },
    section_card: {
        width: '90%',
        alignSelf: "center",
        overflow: "hidden",
        borderWidth: 0,
        height: Platform.OS ==='android' ? 175 : 155
    },
    section_card_inner: {
        padding: 0,
        flex: 1,
    }
})