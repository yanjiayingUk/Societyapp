import React, { Component } from 'react'
import { Text,
    TextInput, 
    View, 
    StyleSheet, 
    ImageBackground, 
    Image, Scene, 
    TouchableOpacity, 
    ImageStore, 
    Dimensions,
    DeviceEventEmitter } from 'react-native'
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
    top: {
        height: 72,
        width: '100%',
        backgroundColor:'#3fcccb'
    },
    title: {
        fontSize: 30,
        position: 'absolute',
        top: 20,
        left: 210
    },
    topbutton: {
        borderRadius: 15,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 25,
        right: 40
    },
    content: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    per: {
        width: width*0.8,
        height: height*0.75,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 18,
        marginTop: 30,
        backgroundColor:'white'
    },
    person: {
        justifyContent: 'center',
        height: 70,
        borderBottomWidth: 1,
        borderColor: '#3fcccb',
    },
    admin: {
        position: "absolute",
        top: 20,
        left: 90,
        fontSize: 25
    }
})

const data = [];
export default class Detail extends Component {
    constructor() {
        super();
        this.state = {
            dataa: [],
            content: '',
            files: data,
            multiple: true,
            // username:store.getState().getuser,
            username: 'admin'
        }
    }
    change = () => {
        fetch("http://192.168.43.49:3001/dt/save", {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json'
            },
            // body:  `username=${username}`
            body: JSON.stringify({
                content: this.state.content,
                username: 'admin'
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res.message);
                // this.setState({
                //     data: res.message

                // }, () => {
                //     console.log(this.state.data);
                // })
            })
            // Actions.pop()
            // Actions.mine()
            // ToastAndroid.show("????????????", ToastAndroid.SHORT);
        Actions.pop();
    }
    introhandle = (text) => {
        this.setState({ content: text })
    }
    render() {
        const { files } = this.state;
        return (
            <View>
                <View style={styles.top} >
                    <TouchableOpacity
                        style={{ width: 45, height: 45, position: 'absolute', left: 10, marginTop: 20 }}
                        onPress={() => Actions.pop()}
                    >
                        <Image
                            style={{ width: 45, height: 45, position: 'absolute', left: 10 }}
                            resizeMode='contain' onPress={() => Actions.pop()}
                            source={require("../../assets/lzy/dfanhui.png")}
                        />
                    </TouchableOpacity>
                    <View>
                        {/* <Icon name='chevron-left' onPress={Actions.pop} style={styles.back} /> */}
                        <Text style={styles.title} >????????????</Text>
                    </View>
                    <TouchableOpacity style={styles.topbutton}   onPress={this.change} >
                        {/* <Text style={styles.topbtntext} style={{fontSize:16}} onPress={Actions.community} >??????</Text> */}
                        <Text style={styles.topbtntext} style={{ fontSize: 20 }} >??????</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.content} >
                    <View style={styles.per} >
                        <View style={styles.person} >
                            <Image style={{ width: 50, height: 50, borderRadius: 25, marginLeft: 20 }} source={require('../../assets/yjy/ytx.png')} />
                            <Text style={styles.admin} >admin</Text>
                        </View>
                        <TextInput placeholder='????????????...'
                            style={{ height: 60,fontSize:22}}
                            // value={this.state.content}
                            onChangeText={this.introhandle}
                        >

                        </TextInput>

                    </View>
                </View>
            </View>
        )
    }
}
