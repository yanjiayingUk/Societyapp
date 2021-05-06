import React, { Component } from 'react';
import {
    View, Text,
    StyleSheet, ImageBackground,
    Dimensions, TextInput, Image,
    ScrollView, TouchableOpacity, FlatList,
} from "react-native";
import { myFetch } from '../utils/index';
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');
const s = width / 640;
var wid = 240 * s;
var high = 300 * s;

var a = [
    {
        title: '那达慕',
        picpath: require('../../assets/lzy/dtaofu4.jpg')
    },
    {
        title: '汉服',
        picpath: require('../../assets/lzy/dhanfu.png')
    },
    {
        title: '福字',
        picpath: require('../../assets/lzy/dfuzi.png')
    },
    {
        title: '鞭炮',
        picpath: require('../../assets/dqh/dbianpao.jpg')
    },
    {
        title: '长白山',
        picpath: require('../../assets/dqh/1.png')
    },
    {
        title: '饺子',
        picpath: require('../../assets/dqh/djiaozi.png')
    },
]

export default class cultureList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: a
        }
    }

    componentDidMount() {
        myFetch.get('/getculturelist', {
            jdtitle: '太和殿'
        })
            .then(res => {
                this.setState({
                    data: res.data
                }, () => {
                    console.log(res.data);

                })
            })
    }

    render() {

        return (
            <ImageBackground
                source={require('../../assets/lzy/p1.jpg')}
                style={styles.showbody}
            >
                <ImageBackground
                    resizeMode='cover'
                    source={require("../../assets/dqh/search.jpg")}
                    style={styles.tabbar}
                >
                    <TouchableOpacity
                        style={styles.backicon}
                        onPress={() => Actions.pop()}
                    >
                        <Image
                            style={styles.backicon}
                            resizeMode='contain'
                            source={require("../../assets/lzy/dfanhui.png")}
                        />
                    </TouchableOpacity>
                    <Text style={styles.title}>风俗文化</Text>
                </ImageBackground>
                <View style={{
                    // flexDirection:'row',
                    // justifyContent:'space-evenly'
                    alignItems: 'center'
                }}>
                    <FlatList
                        numColumns={2}
                        data={this.state.list}

                        renderItem={({ item, idx }) => (
                            <TouchableOpacity
                                key={idx}
                                style={styles.placelist}
                                onPress={() => { Actions.cultureDetail({ title: item.title }) }}
                            >
                                <ImageBackground
                                    style={[styles.citybg, styles.citybgp]}
                                    resizeMode="cover"
                                    source={item.picpath}
                                />
                                <View style={[styles.coverbox, styles.citybg]}></View>
                                <View style={styles.cityname}>
                                    <Text style={styles.nametxt}>{item.title}</Text>
                                </View>

                            </TouchableOpacity>
                        )}
                    />
                </View>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    showbody: {
        flex: 1,
    },
    placelist: {
        width: wid,
        height: high,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30 * s,
        backgroundColor: 'pink',
    },
    citybg: {
        width: wid,
        height: high,
    },
    citybgp: {
        position: 'relative'
    },
    coverbox: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#a3a3a3',
        opacity: 0.5
    },
    cityname: {
        position: 'absolute',
        top: high / 2.5,
        left: wid / 2.5,
        alignItems: 'center',
    },
    nametxt: {
        fontSize: 17,
        color: '#fff'
    },
    tabbar: {
        width: width,
        height: 85 * s,
        flexDirection: 'row',
        backgroundColor: '#B0C4DE',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    backicon: {
        width: 45 * s,
        height: 45 * s,
        position: 'absolute',
        left: 10 * s,
        color: '#20B2AA'
    },
    title: {
        fontSize: 21,
        // color: 'white'
    },
})