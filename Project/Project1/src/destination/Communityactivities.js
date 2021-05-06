import React, { Component } from 'react'
import {
    Animated,
    AsyncStorage,
    Text, Image,
    View, StyleSheet,
    ImageBackground,
    Dimensions,
    ToastAndroid,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import Button from 'react-native-button';

// import { Icon } from '@ant-design/react-native';
import { Icon } from '@ant-design/react-native';
import { Actions,Tabs } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
// import ImageCropPicker from 'react-native-image-crop-picker';

const { height, width } = Dimensions.get('window')


export default class Communityactivities extends Component {
    render() {
        return (
            <View>
                <Text>community</Text>
            </View>
        )
    }
}
// const styles = StyleSheet.create({
//     styl: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: 150,
//         backgroundColor: '#fff'
//     }
// })