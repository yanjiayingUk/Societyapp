import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    AsyncStorage,
    Image
} from 'react-native'
import { Actions } from 'react-native-router-flux';

const { height, width } = Dimensions.get('window')


export default class Minedt extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            username:'小知'
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('user')
            .then(res => {
                res = JSON.parse(res);
                console.log('yyy', res.username)
                this.setState({
                    username:res.username
                })
            })
            
        fetch("http://192.168.233.1:3001/dt/mine",{ 
            method: 'POST',
            headers:{
                "Accept":'application/json',
                'Content-Type':'application/json'
            },
            // body:  `username=${username}`
            body:JSON.stringify({username:'admin'})
        })
            .then(res => res.json())
            .then(res => {
                console.log(res.message);
                // var newlist = [...res.message.reverse()];
                // console.log(newlist)
                this.setState({
                    data: res.message

                }, () => {
                    console.log(this.state.data[1].imgpath);
                    // console.log(typeof(this.state.data[1].imgpath).substring(-1,(str-1)));
                })
            })
    }
    
    render() {
        // let tx=this.state.data[1].imgpath;
        return (
            <View>
                {/* 头部 */}
                <ImageBackground style={styles.tabbar} source={require('../../assets/yjy/y2.jpg')}>
                    <TouchableOpacity
                        style={{width:45,height:45, position: 'absolute',left: 10 ,marginTop:20}} 
                        onPress={() => Actions.pop()}
                    >
                        <Image 
                            style={{width:45,height:45, position: 'absolute',left: 10 }} 
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
                                    var tx=item.imgpath
                                    console.log(tx)
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
                            {/* <TouchableOpacity onPress={Actions.dtcontent} >
                                <View style={styles.con}  >
                                    <Image style={styles.toux} source={require('../../assets/lj/ljtouxiang2.jpg')} />
                                    <Text style={styles.adminname} >小知</Text>
                                    <Text style={styles.admintime} >2020.02.10</Text>
                                    <Text style={styles.admincon} >
                                    这次衡山行，最有感觉的几处地方，麻姑仙境、石浪、祝孔庙于等，这次衡山行，最有感觉的几处地方，麻姑仙境、石浪、祝孔庙于等
                                        </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={Actions.dtcontent} >
                                <View style={styles.con}  >
                                    <Image style={styles.toux} source={require('../../assets/lj/ljtouxiang2.jpg')} />
                                    <Text style={styles.adminname} >小知</Text>
                                    <Text style={styles.admintime} >2020.02.10</Text>
                                    <Text style={styles.admincon} >
                                    有时间，我们可以去爬山，去看日出，去散步，去欣赏大自然，去陌生的街角，去做一切我们曾经或现在也很想做的事情，可以有一个人陪着你，也可以你一个人，总之那一刻，你是自由的。
                                        </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={Actions.dtcontent} >
                                <View style={styles.con}  >
                                    <Image style={styles.toux} source={require('../../assets/lj/ljtouxiang2.jpg')} />
                                    <Text style={styles.adminname} >小知</Text>
                                    <Text style={styles.admintime} >2020.02.10</Text>
                                    <Text style={styles.admincon} >
                                    失去的我们不妨让其失去，因为它可让我们少些惆怅;得到的我们不妨少些满足，因为它可让我们多些清醒。
                                        </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={Actions.dtcontent} >
                                <View style={styles.con}  >
                                    <Image style={styles.toux} source={require('../../assets/lj/ljtouxiang2.jpg')} />
                                    <Text style={styles.adminname} >小知</Text>
                                    <Text style={styles.admintime} >2020.02.10</Text>
                                    <Text style={styles.admincon} >
                                        sasasa
                                        </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={Actions.dtcontent} >
                                <View style={styles.con}  >
                                    <Image style={styles.toux} source={require('../../assets/lj/ljtouxiang2.jpg')} />
                                    <Text style={styles.adminname} >小知</Text>
                                    <Text style={styles.admintime} >2020.02.10</Text>
                                    <Text style={styles.admincon} >
                                        这次衡山行，最有感觉的几处地方，麻姑仙境、石浪、祝孔庙于等，这次衡山行，最有感觉的几处地方，麻姑仙境、石浪、祝孔庙于等
                                        </Text>
                                </View>
                            </TouchableOpacity> */}

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
        marginLeft: 150,
        fontSize: 30,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})