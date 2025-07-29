import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';

const DashboardScreen: FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Dashboard Screen</Text>
        </View>
    );
};

export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#000",
    },
    text: {
        fontSize: 33,
        fontFamily: "PlusJakartaSans-Bold",
        color: "white"
    },
});
