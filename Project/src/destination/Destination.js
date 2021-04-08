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



import { Icon } from '@ant-design/react-native';

// import { Router, Scene, Tabs, Actions, Drawer, Lightbox, Modal } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

import School from './Schoolactivities';


const { height, width } = Dimensions.get('window')

export default class Destination extends Component {
    render() {
        return (
            <View><Text>aaaa</Text></View>
        );
      }
}
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       marginTop: 20,
//       backgroundColor: '#F5FCFF',
//     },
//     lineStyle: {
//       width: ScreenWidth / 4,
//       height: 2,
//       backgroundColor:'red'
//     },
//     textStyle: {
//       flex: 1,
//       fontSize: 20,
//       marginTop: 20,
//       textAlign:'center'
//     },
//   });