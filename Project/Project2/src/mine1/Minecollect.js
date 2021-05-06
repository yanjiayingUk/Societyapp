import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    Image
} from 'react-native'
import { Actions } from 'react-native-router-flux'

const { height, width } = Dimensions.get('window')

let actionArr = [
    { img: require('../../assets/yjy/taihe.png'), content: '故宫的太和殿其实也叫作金銮殿，是宫中面积最大，规格最高的宫殿。' },
    { img: require('../../assets/yjy/dkunning.png'), content: '坤宁宫是内廷后三宫之一，正德九年、万历二十四年两次毁于火，万历三十三年重建。' },
    { img: require('../../assets/yjy/djiajv.png'), content: '养心殿，明代建造，清重修。顺治时皇帝住在养心殿，并死于养心殿，康熙时设造办处于此。' }
]

export default class Minecollect extends Component {
    render() {
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
                    {/* <Button onPress={() => Actions.userPage()}>
                        <Icon color='black' name="left" size={30} style={{ marginLeft: 20 }} />
                    </Button> */}
                    <Text style={styles.title}>我的收藏</Text>
                </ImageBackground>
                {/* <ImageBackground source={require('../../assets/yjy/ytop.jpg')} style={styles.topbg} >
                    <View style={styles.top} >
                        <View style={styles.toptext}>
                            <Text style={{ fontSize: 30 }} onPress={() => Actions.pop()} >我的收藏</Text>
                        </View>
                    </View>
                </ImageBackground> */}
                <ImageBackground source={require('../../assets/yjy/ybg.jpg')} style={{ width: '100%', height: height * 0.9 }} >
                    <ScrollView>
                        <View style={styles.body} >
                            {
                                actionArr.map((item,index) => {
                                    return (
                                    // <TouchableOpacity onPress={Actions.dtcontent} >
                                        <View style={styles.con}  >
                                            <Image style={styles.toux} source={item.img} />
                                            <View style={styles.content}>
                                                <Text style={styles.contenttext}>{item.content}</Text>
                                            </View>
                                        </View>
                                    // </TouchableOpacity>
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
        marginTop: 20
    },
    toux: {
        width: 120,
        height: 120
    },
    contenttext: {
        fontSize: 20
    },
    tabbar: {
        height: height * 0.1,
        width: width,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        marginLeft: 168,
        fontSize: 30,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})