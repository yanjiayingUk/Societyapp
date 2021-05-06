
import React, { Component } from 'react'
import { DeviceEventEmitter, Text, View, Image, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { Button } from '@ant-design/react-native';

const styles = StyleSheet.create({
    top: {
        height: 72,
        width: '100%',
        backgroundColor: '#3fcccb'
    },
    toptext: {
        height: 72,
        textAlign: 'center',
        textAlignVertical: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        width: '100%',
        height: "90%",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        // height:400,
        // borderWidth:1
    },
    con: {
        width: 450,
        height: 180,
        marginTop: 30,
        borderWidth: 1,
        borderColor: '#3fcccb',
        borderRadius: 10,
        backgroundColor: 'white'
    },
    // toux: {
    //     width: 50,
    //     height: 50,
    //     borderStyle: 'dotted',
    //     borderWidth: 1,
    //     borderRadius: 25,
    //     marginLeft: 30,
    //     marginTop: 20
    // },
    adminname: {
        fontSize: 25,
        color:'red',
        marginLeft:25,
        marginTop:25
    },
    admincon: {
        marginTop:10,
        marginLeft:25,
        fontSize: 20,
        lineHeight: 25
    }
})



export default class Destination extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            username: 'admin'
        }
    }
    // componentDidMount() {
    //     fetch('http://192.168.233.1:3001/dt/list')
    //         .then(res => res.json())
    //         .then(res => {
    //             console.log(res);
    //             this.setState({
    //                 data: res.message
    //             }, () => {
    //                 console.log(this.state.data)
    //             })
    //         })
    //     DeviceEventEmitter.addListener("returnContent", (params) => {
    //         var con = JSON.parse(params);
    //         console.log(con.username + ":" + con.content + "获取发表内容00000000");
    //         // var lista=[con,...this.state.data];
    //         // console.log(lista);
    //         this.setState((state) => {
    //             return {
    //                 data: [con, ...state.data]
    //             }
    //         }, () => {
    //             console.log("ok" + this.state.data);
    //         })
    //         // console.log()
    //     })
    // }
    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.data == this.state.data) {
    //         console.log(prevState.data == this.state.data)
    //         fetch('http://192.168.233.1:3001/dt/list')
    //             .then(res => res.json())
    //             .then(res => {
    //                 console.log(res);
    //                 this.setState({
    //                     data: res.message
    //                 }, () => {
    //                     console.log(this.state.data);
    //                     console.log(typeof (this.state.data[0].createtime));
    //                 })
    //             })
    //     }
    // }
    render() {
        return (
            <View>
                {/* 头部 */}
                <View style={styles.top} >
                    <View style={styles.toptext}>
                        <Text style={{ fontSize: 30 }} >活动</Text>
                    </View>
                </View>
                {/* body */}
                <ScrollView >
                    <View style={styles.body} >
                        {/* {
                            this.state.data.map((item, idx) => {
                                return <TouchableOpacity onPress={() => Actions.dtcontent({
                                    imgpath: item.imgpath,
                                    picpath: item.picpath,
                                    username: item.username,
                                    content: item.content,
                                    createtime: item.createtime
                                })} >
                                    <View style={styles.con} >
                                        <Image style={styles.toux} source={{ uri: item.picpath }} />
                                        <Text style={styles.adminname} > {item.username} </Text>
                                        <Text style={styles.admintime} > {item.createtime} </Text>
                                        <Text style={styles.admincon} > {item.content} </Text>
                                    </View>
                                </TouchableOpacity>
                            })
                        } */}

                        <View style={styles.con} >
                            <Text style={styles.adminname} > 体育社 </Text>
                            <Text style={styles.admincon} > 明天在体育馆举行篮球比赛</Text>
                        </View>
                        <View style={styles.con} >
                            <Text style={styles.adminname} > 书法社 </Text>
                            <Text style={styles.admincon} > 3月24日书法社联合文学院举办比赛</Text>
                        </View>
                        <View style={styles.con} >
                            <Text style={styles.adminname} > 环境健康社 </Text>
                            <Text style={styles.admincon} > 25日晚有场激动人心的环保知识竞赛，等你来参加</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
