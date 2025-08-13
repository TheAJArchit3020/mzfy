import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Input from '@components/reusable/Input'
import Button from '@components/reusable/button'
import { PaperAirplaneIcon } from 'react-native-heroicons/solid'

const Pennieaichat: FC = () => {
    return (
        <LinearGradient
            colors={["#5145BC", "#2F2C4A", "#2B293E", "#272631", "#232323"]}
            locations={[0, 0.64, 0.76, 0.87, 1]}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
        >
            <View style={styles.container}>
                <View style={styles.section1} >
                    <View style={styles.logowrapper} >
                        <Image source={require("@images/pennieai/pennielogo.png")} style={styles.image} />
                    </View>
                    <Text style={styles.text1}>Pennie ai</Text>
                    <Text style={styles.text2}>Our AI is here 24/7 to guide you — from tracking payments to planning your financial future, one smart step at a time.</Text>
                </View>
                <View>
                    <Input inputWrapperStyle={styles.inputwrapperStyle} placeholder='Ask moneezify Ai' children={
                        <Button>
                            <PaperAirplaneIcon color={'#00FFFF'} />
                        </Button>
                    } />
                </View>
            </View>
        </LinearGradient>
    )
}

export default Pennieaichat

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 20,
        paddingHorizontal: 20
    },
    inputwrapperStyle: {
        borderColor: '#00D9F5',
        borderWidth: 1,
        borderRadius: 15
    },
    section1:{
        flexDirection:"column",
        gap: 24,
        alignItems:"center",
        marginBottom: 70
    },
    logowrapper:{
        backgroundColor:"#32426A",
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent:"center",
        alignItems:"center"
    },
    image:{
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
    text1:{
        color: "#fff",
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 24,
        textAlign: "center"
    },
    text2:{
        color: "#A4A4A5",
        fontFamily: "PlusJakartaSans-Regular",
        fontSize: 12,
        textAlign: "center"
    }
})
