import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    Image,
    AsyncStorage
} from 'react-native'
import { Actions } from 'react-native-router-flux';

const { height, width } = Dimensions.get('window')


export default class Glory extends Component {
    render() {
        return (
            <View style={{backgroundColor:'white',height:height}}>
                <Image source={require("../../assets/jiangzhuang2.jpg")} style={styles.img} />
                <Image source={require("../../assets/jiangzhuang3.jpg")} style={styles.img} />
                <Image source={require("../../assets/jiangzhuang4.jpg")} style={styles.img} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    img: {
        width: width,
        marginBottom:10
    }
})