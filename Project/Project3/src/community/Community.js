
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
    topbutton: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 20,
        right: 40
    },
    topbtntext: {
        fontSize: 22
    },
    body: {
        width: '100%',
        height: "90%",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        // height:400,
        // borderWidth:1
    },
    con: {
        width: 450,
        height: 180,
        marginTop: 30,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        borderStyle: 'dashed',
        backgroundColor:'white'
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
    }
})



export default class Community extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            username: 'admin'
        }
    }
    componentDidMount() {
        fetch('http://192.168.43.49:3001/dt/list')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({
                    data: res.message
                }, () => {
                    console.log(this.state.data)
                })
            })
        // DeviceEventEmitter.addListener("returnContent", (params) => {
        //     var con = JSON.parse(params);
        //     console.log(con.username + ":" + con.content + "获取发表内容00000000");
        //     // var lista=[con,...this.state.data];
        //     // console.log(lista);
        //     this.setState((state) => {
        //         return {
        //             data: [con, ...state.data]
        //         }
        //     }, () => {
        //         console.log("ok" + this.state.data);
        //     })
        //     // console.log()
        // })
    }
    componentDidUpdate() {
            fetch('http://192.168.43.49:3001/dt/list')
                .then(res => res.json())
                .then(res => {
                    // console.log(res);
                    this.setState({
                        data: res.message
                    }, () => {
                        // console.log(this.state.data);
                        // console.log(typeof (this.state.data[0].createtime));
                    })
                })
        // }
    }
    render() {
        return (
            <View>
                {/* 头部 */}
                <View style={styles.top} >
                    <View style={styles.toptext}>
                        <Text style={{ fontSize: 30 }} >社区</Text>
                    </View>
                    <TouchableOpacity style={styles.topbutton} onPress={Actions.detail}  >
                        <Text style={styles.topbtntext} >+</Text>
                    </TouchableOpacity>
                </View>
                {/* body */}
                <ScrollView >
                    <View style={styles.body} >
                        {
                            this.state.data.map((item, idx) => {
                                return <TouchableOpacity onPress={() => Actions.dtcontent({
                                    imgpath: item.imgpath,
                                    picpath: item.picpath,
                                    username: item.username,
                                    content: item.content,
                                    createtime: item.createtime
                                })} >
                                    <View style={styles.con} >
                                    {/* <Image style={styles.toux} source={{ uri: item.picpath }} /> */}
                                    <Image style={styles.toux} source={require('../../assets/yjy/ytx.png')} />
                                    {/* <Image style={styles.toux} source={{ src: item.picpath }} /> */}
                                        <Text style={styles.adminname} > {item.username} </Text>
                                        <Text style={styles.admintime} > {item.createtime} </Text>
                                        <Text style={styles.admincon} > {item.content} </Text>
                                    </View>
                                </TouchableOpacity>
                            })
                        }

                    </View>
                </ScrollView>
            </View>
        )
    }
}
