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
import { Actions } from 'react-native-router-flux'

const { height, width } = Dimensions.get('window')

let actionArr = [
    { img: require('../../assets/yjy/taihe.png'), content: '故宫的太和殿其实也叫作金銮殿，是宫中面积最大，规格最高的宫殿。' },
    { img: require('../../assets/yjy/dkunning.png'), content: '坤宁宫是内廷后三宫之一，正德九年、万历二十四年两次毁于火，万历三十三年重建。' },
    { img: require('../../assets/yjy/djiajv.png'), content: '养心殿，明代建造，清重修。顺治时皇帝住在养心殿，并死于养心殿，康熙时设造办处于此。' }
]

export default class Minecollect extends Component {
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
                // console.log('yyy', res.username)
                this.setState({
                    username: res.username
                }, () => {
                    // console.log('aaa' + this.state.username)
                    let text = { username: this.state.username } //获取数据
                    let send = JSON.stringify(text);
                    // console.log(send)


                    fetch("http://192.168.233.1:3001/like/mineget", {
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

    changea = (item) => {
        console.log('cccc')
    }
    render() {
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
                    {/* <Button onPress={() => Actions.userPage()}>
                        <Icon color='black' name="left" size={30} style={{ marginLeft: 20 }} />
                    </Button> */}
                    <Text style={styles.title}>我的收藏</Text>
                </ImageBackground>
                <ImageBackground source={require('../../assets/yjy/ybg.jpg')} style={{ width: '100%', height: height * 0.9 }} >
                    <ScrollView>
                        <View style={styles.body} >
                            {
                                this.state.data.map((item, index) => {
                                    console.log(item.picpath)
                                    return (
                                        <View style={styles.con}  >
                                            <Image style={styles.toux} source={{uri:item.picpath}} />
                                            <View style={styles.content}>
                                                <Text style={styles.tit}>{item.placename}</Text>
                                                <Text style={styles.contenttext}>{item.introduce}</Text>
                                                <Image
                                                    style={{ width: 30, height: 30, marginLeft: 220 }}
                                                    source={require('../../assets/yjy/xihuan.png')}
                                                    onPress={() => { this.changea(item.placename) }}
                                                />
                                            </View>
                                        </View>
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
        height: 150,
        marginTop: 30,
        borderBottomWidth: 2,
        borderColor: 'grey',
        borderStyle: 'dashed',
        flexDirection: 'row'
    },
    content: {
        width: 250,
        height: 120,
        marginLeft: 20,
        marginTop: 20,
    },
    toux: {
        width: 120,
        height: 120,
        marginTop: 20,
    },
    contenttext: {
        fontSize: 15
    },
    tit: {
        fontSize: 24
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