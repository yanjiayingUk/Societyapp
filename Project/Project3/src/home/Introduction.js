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
import { Button, Icon } from '@ant-design/react-native';

const { height, width } = Dimensions.get('window')


export default class Introduction extends Component {
    render() {
        return (
            <View>
                <Button style={styles.sheying} onPress={()=>Actions.jjsheying()}>
                    <Text style={styles.sheyingtext}>摄影社</Text>
                    <Icon name='arrow-right' style={styles.sheyingicon} color='#3fcccb'/>
                </Button>
                <Button style={styles.sheying}>
                    <Text style={styles.sheyingtext}>手工社</Text>
                    <Icon name='arrow-right' style={styles.sheyingicon} color='#3fcccb'/>
                </Button>
                <Button style={styles.sheying}>
                    <Text style={styles.sheyingtext}>吉他社</Text>
                    <Icon name='arrow-right' style={styles.sheyingicon} color='#3fcccb'/>
                </Button>
                <Button style={styles.sheying}>
                    <Text style={styles.sheyingtext}>羽毛球社</Text>
                    <Icon name='arrow-right' style={styles.sheyingicon} color='#3fcccb'/>
                </Button>
                <Button style={styles.sheying}>
                    <Text style={styles.sheyingtext}>象棋社</Text>
                    <Icon name='arrow-right' style={styles.sheyingicon} color='#3fcccb'/>
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    sheying: {
        width: '100%',
        height: 75,
        backgroundColor:'white',
        marginBottom:2
    },
    sheyingtext:{
        fontSize:25,
        paddingRight:70
    },
    sheyingicon:{
        width:200,
        height:30
    }
})