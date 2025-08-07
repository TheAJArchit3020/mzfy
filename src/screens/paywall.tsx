import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import Header from '@components/reusable/header'
import LinearGradient from 'react-native-linear-gradient'
import DropShadow from 'react-native-drop-shadow'
import { ArrowDownIcon, ChevronDownIcon, ChevronUpIcon } from 'react-native-heroicons/solid'
import Button from '@components/reusable/button'

const Paywall: FC = () => {

    const [showFaq1, setShowFaq1] = useState(false);
    const [showFaq2, setShowFaq2] = useState(false);
    const [showFaq3, setShowFaq3] = useState(false);


    return (
        <LinearGradient
            colors={["#443C9F", "#3A346E", "#2B293E", "#272631", "#232323"]}
            locations={[0, 0.64, 0.76, 0.87, 1]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <Header title='Moneezify plan' />
            <ScrollView>


                <View style={styles.container}>
                    <DropShadow style={styles.paycard} >
                        <LinearGradient
                            colors={["#1B1B2F", "#292553", "#080618"]}
                            locations={[0, 0.48, 1]}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={styles.gradient}
                        >
                            <View style={styles.cardcontainer}>
                                <View style={styles.titlediv} >
                                    <Text style={styles.title}>Strategy</Text>
                                    <Image source={require('@images/registration/crown.png')} style={styles.image} />
                                </View>
                                <View style={styles.cardcontainer_content}>
                                    <Text style={styles.planname}>Moneezify plan</Text>
                                    <Text style={styles.description}>Fastest payoff and least interest </Text>
                                </View>
                                <View style={styles.cardcontainer_content2}>
                                    <View style={styles.cardcontainer_content_item}>
                                        <Image source={require('@images/registration/check.png')} style={styles.checkimage} />
                                        <Text style={styles.text} >Push Alerts & Reminders: <Text style={styles.subtext}>
                                            Custom reminders, overspend alerts, milestone celebrations.
                                        </Text> </Text>
                                    </View>
                                    <View style={styles.cardcontainer_content_item}>
                                        <Image source={require('@images/registration/check.png')} style={styles.checkimage} />
                                        <Text style={styles.text} >Export & Reports: <Text style={styles.subtext}>
                                            Download PDF/CSV of your full payoff schedule.
                                        </Text> </Text>
                                    </View>
                                    <View style={styles.cardcontainer_content_item}>
                                        <Image source={require('@images/registration/check.png')} style={styles.checkimage} />
                                        <Text style={styles.text} >Moneezify AI-Curated Plan: <Text style={styles.subtext}>
                                            Personalized payoff strategy, dynamically adapting to your cashflow.
                                        </Text> </Text>
                                    </View>
                                    <View style={styles.cardcontainer_content_item}>
                                        <Image source={require('@images/registration/check.png')} style={styles.checkimage} />
                                        <Text style={styles.text} >Custom Strategy:  <Text style={styles.subtext}>
                                            Drag-&-drop debt ordering + extra-payment tweaks.
                                        </Text> </Text>
                                    </View>
                                </View>
                            </View>
                        </LinearGradient>
                    </DropShadow>

                    <View style={styles.faqcontainer}>
                        <Text style={styles.faqTitle}>FAQs</Text>
                        <View style={styles.faqcontent}>
                            <TouchableOpacity onPress={() => setShowFaq1(!showFaq1)} style={styles.faqcontent_item}>
                                <Text style={styles.faqcontent_text}>Lorem ipsum dolor sit amet consectetur. Senectus ultricies et felis odio ut nisl aliquet quam.</Text>
                                {!showFaq1 ? <ChevronDownIcon color={'#F7F7F7'} /> : <ChevronUpIcon color={'#F7F7F7'} />}
                            </TouchableOpacity>
                            {showFaq1 && (
                                <>
                                    <View style={styles.faqInnerContent}>
                                        <Text style={styles.faqcontent_subtext}>Lorem ipsum dolor sit amet consectetur. Senectus ultricies et felis odio ut nisl aliquet quam.Lorem ipsum dolor sit amet consectetur. Senectus ultricies et felis odio ut nisl aliquet quam. </Text>
                                    </View>
                                </>
                            )}
                        </View>
                        <View style={styles.faqcontent}>
                            <TouchableOpacity onPress={() => setShowFaq2(!showFaq2)} style={styles.faqcontent_item}>
                                <Text style={styles.faqcontent_text}>Lorem ipsum dolor sit amet consectetur. Senectus ultricies et felis odio ut nisl aliquet quam.</Text>
                                {!showFaq2 ? <ChevronDownIcon color={'#F7F7F7'} /> : <ChevronUpIcon color={'#F7F7F7'} />}
                            </TouchableOpacity>
                            {showFaq2 && (
                                <>
                                    <View style={styles.faqInnerContent}>
                                        <Text style={styles.faqcontent_subtext}>Lorem ipsum dolor sit amet consectetur. Senectus ultricies et felis odio ut nisl aliquet quam.Lorem ipsum dolor sit amet consectetur. Senectus ultricies et felis odio ut nisl aliquet quam. </Text>
                                    </View>
                                </>
                            )}
                        </View>
                        <View style={styles.faqcontent}>
                            <TouchableOpacity onPress={() => setShowFaq3(!showFaq3)} style={styles.faqcontent_item}>
                                <Text style={styles.faqcontent_text}>Lorem ipsum dolor sit amet consectetur. Senectus ultricies et felis odio ut nisl aliquet quam.</Text>
                                {!showFaq3 ? <ChevronDownIcon color={'#F7F7F7'} /> : <ChevronUpIcon color={'#F7F7F7'} />}
                            </TouchableOpacity>
                            {showFaq3 && (
                                <>
                                    <View style={styles.faqInnerContent}>
                                        <Text style={styles.faqcontent_subtext}>Lorem ipsum dolor sit amet consectetur. Senectus ultricies et felis odio ut nisl aliquet quam.Lorem ipsum dolor sit amet consectetur. Senectus ultricies et felis odio ut nisl aliquet quam. </Text>
                                    </View>
                                </>
                            )}
                        </View>
                    </View>
                    <View style={styles.buttondiv}>

                        <Button style={styles.button} >
                            <Text style={styles.buttontext} >Get our plan for free NOW!!</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}

export default Paywall

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        gap: 24
    },
    cardcontainer: {
        backgroundColor: "transparent",
        borderWidth: 0,
        padding: 16,
        flexDirection: "column",
    },

    innercard: {},

    paycard: {
        borderRadius: 12,

        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 4,
        },

        marginTop: 24,
        marginHorizontal: 20,
    },


    gradient: {
        borderRadius: 24
    },

    titlediv: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "transparent"
    },

    image: {
        width: 24,
        height: 24,
        resizeMode: "contain"
    },

    cardcontainer_content: {
        flexDirection: "column",
        gap: 20,
        marginBottom: 20
    },

    title: {
        color: "#fff",
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 10
    },
    planname: {
        color: "#fff",
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 32
    },
    description: {
        color: "#fff",
        fontStyle: "italic",
        fontSize: 10
    },

    checkimage: {
        width: 24,
        height: 24,
        resizeMode: "contain"
    },
    cardcontainer_content2: {
        flexDirection: "column",
        gap: 20
    },
    cardcontainer_content_item: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    text: {
        color: "#fff",
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 13,
        width: '85%'
    },
    subtext: {
        color: "#fff",
        fontFamily: "PlusJakartaSans-Regular",
        fontSize: 12
    },
    faqcontainer: {
        marginHorizontal: 20,
        flexDirection: "column",
        gap: 20,
    },
    faqTitle: {
        color: "#fff",
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 16
    },
    faqcontent: {
        borderWidth: 1,
        borderColor: "#C0C0C0",
        borderRadius: 12
    },
    faqcontent_item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12
    },
    faqcontent_text: {
        color: "#fff",
        fontFamily: "PlusJakartaSans-Regular",
        fontSize: 12,
        width: '85%'
    },
    faqInnerContent: {
        marginHorizontal: 12,
        paddingBottom: 12
    },
    faqcontent_subtext: {
        color: "#fff",
        fontFamily: "PlusJakartaSans-Regular",
        fontSize: 12,
    },
    button: {
        backgroundColor: "#006FFF",
        padding: 16,
        borderRadius: 45,
        marginHorizontal: 20,

    },
    buttontext: {
        color: "#fff",
        fontFamily: "PlusJakartaSans-Bold",
        fontSize: 16,
        textAlign: "center"
    },
    buttondiv: {
        flexGrow: 1,
        justifyContent: "flex-end",
        marginBottom: 30

    }
})