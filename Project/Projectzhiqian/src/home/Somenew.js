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


export default class Somenew extends Component {
    render() {
        return (
            <View>
                <Text>Somenew</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topbg: {
        width: '100%',
        height: height * 0.1
    }
})