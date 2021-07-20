import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
var date = new Date().getDate(); //To get the Current Date
var month = new Date().getMonth() + 1; //To get the Current Month
var year = new Date().getFullYear(); //To get the Current Year
// var hours = new Date().getHours(); //To get the Current Hours
// var min = new Date().getMinutes(); //To get the Current Minutes
// var sec = new Date().getSeconds(); //To get the Current Seconds

const Header = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.font}>TODOS</Text>
            <Text style={styles.date}>{date}/{month.length === 1 ? month : "0"+month}/{year}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#334257',
        paddingTop: 50,
        paddingBottom: 0,
    },
    font: {
        fontSize: 20,
        color: '#EEEEEE',
    },
    date: {
        color: '#EEEEEE',
    }
})

export default Header
