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


export default class Minedt extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            username: '小知'
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('user')
            .then(res => {
                res = JSON.parse(res);
                this.setState({
                    username: res.username
                }, () => {
                    // console.log(this.state.username)
                    let text = { username: this.state.username } //获取数据
                    let send = JSON.stringify(text);
                    // console.log(send)


                    fetch("http://192.168.233.1:3001/dt/mine", {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json; charset=utf-8' },
                        body: send
                    })
                        .then(res => res.json())
                        .then(res => {
                            this.setState({
                                data: res.message

                            }, () => {
                                // console.log(this.state.data);
                            })
                        })
                })
            })
    }


    render() {
        let img = '../../assets/yjy/ytx.png'
        console.log(this.state.data);
        if (this.state.data[0] != undefined) {
            console.log('sdfdsfds')
        }
        return (
            <View>
                {/* 头部 */}
                <ImageBackground style={styles.tabbar} source={require('../../assets/yjy/y2.jpg')}>
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
                    <Text style={styles.title}>我的动态</Text>
                </ImageBackground>

                <ImageBackground source={require('../../assets/yjy/ybg.jpg')} style={{ width: '100%', height: height * 0.9 }} >
                    <ScrollView>
                        <View style={styles.body} >
                            {
                                this.state.data.map((item, idx) => {
                                    var tx = item.imgpath
                                    // console.log(tx);
                                    return (
                                        <TouchableOpacity onPress={Actions.dtcontent} >
                                            <View style={styles.con}  >
                                                {/* <Image style={styles.toux} source={require('../../assets/yjy/ytx.png')} /> */}
                                                <Image style={styles.toux} source={require('../../assets/yjy/ytx.png')} />
                                                <Text style={styles.adminname} >{item.username}</Text>
                                                <Text style={styles.admintime} >{item.createtime}</Text>
                                                <Text style={styles.admincon} >{item.content}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topbg: {
        width: '100%',
        height: height * 0.1
    },
    top: {
        height: height * 0.1,
        width: '100%'

    },
    toptext: {
        height: height * 0.1,
        textAlign: 'center',
        textAlignVertical: 'center',
        alignItems: 'center',
        justifyContent: 'center',

    },
    topbutton: {
        width: 40,
        height: 40,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 22,
        right: 40
    },
    topbtntext: {
        fontSize: 22
    },
    body: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // height:400,
        // borderWidth:1
    },
    con: {
        width: 420,
        height: 200,
        marginTop: 30,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        borderStyle: 'dashed'
    },
    toux: {
        width: 50,
        height: 50,
        borderStyle: 'dotted',
        borderWidth: 1,
        borderRadius: 25,
        marginLeft: 30,
        marginTop: 20
    },
    adminname: {
        fontSize: 20,
        position: 'absolute',
        top: 22,
        left: 100
    },
    admintime: {
        position: 'absolute',
        top: 50,
        left: 100
    },
    admincon: {
        fontSize: 15,
        paddingLeft: 18,
        paddingTop: 17,
        paddingRight: 13,
        lineHeight: 25
    },
    tabbar: {
        height: height * 0.1,
        width: width,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        marginLeft: 200,
        fontSize: 30,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})