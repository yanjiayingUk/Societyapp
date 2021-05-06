import React, { Component } from 'react'
import {
    View, Text,
    StyleSheet, ImageBackground,
    Dimensions, TextInput,
    ScrollView, TouchableOpacity, FlatList, Image,
    AsyncStorage,
} from "react-native";
import { myFetch } from '../utils/index';
import { Actions } from 'react-native-router-flux';
import { Icon } from '@ant-design/react-native';

const { width } = Dimensions.get('window');
const s = width / 640;

var list = [
    {
        name: '太和殿',
        picpath: require("../../assets/lzy/dtaihe.png"),
        introduce: '太和殿，俗称“金銮殿”，是明清古代宫殿建筑，为中国古代宫殿建筑之精华，是中国现存最大的木结构大殿之一，位于北京紫禁城南北主轴线的显要位置。',
        dislike: false
    },
    {
        name: '中和殿',
        picpath: require("../../assets/lzy/dnanniwan.png"),
        introduce: '中和殿，是北京故宫外朝三大殿之一，属于明清传统宫殿建筑。是皇帝去太和殿大典之前休息的地方，并接受执事官员的朝拜的地方',
        dislike: false
    },
    {
        name: '保和殿',
        picpath: require("../../assets/lzy/dkunning.png"),
        introduce: '保和殿为北京故宫外朝三大殿之一，位于中和殿后，建成于明永乐十八年，初名谨身殿，嘉靖时遭火灾，重修后改称建极殿。',
        dislike: false

    },
    {
        name: '养心殿',
        picpath: require("../../assets/lzy/dshihuang.png"),
        introduce: '养心殿是始建于明代嘉靖年间，位于内廷乾清宫西侧。清代有八位皇帝先后居住在养心殿。',
        dislike: false
    }
]
var glist;
AsyncStorage.setItem('list', JSON.stringify(list),
    () => { console.log('ok') }
)
AsyncStorage.getItem('list')
    .then(res => {
        glist = JSON.parse(res);
    })
export default class Jdlist extends Component {
    constructor(props) {
        super(props);
        // AsyncStorage.getItem('list')
        // .then(res=>{

        // })
        this.state = {
            list: glist,
            name: props.title
        }
        console.log(props.title + '333');
    }
    componentDidMount() {

        // fetch("/jdlist",{
        //     method:'GET',
        //     headers:{
        //         "Accept":'application/json',
        //         'Content-type':'application/json'
        //     },
        //     body:JSON.stringify({jdname:'gugong'})
        // }).then(res=>{
        //     console.log(res.data);
        // })
    }
    addlike = (name) => {

        console.log(name);
        AsyncStorage.getItem('list')
            .then((res) => {
                // console.log(res);
                if (res) {
                    var getlist = JSON.parse(res);
                    for (var i = 0; i < getlist.length; i++) {
                        // console.log(getlist[i].name,getlist[i].dislike);
                        if (getlist[i].name === name) {
                            if (getlist[i].dislike) {
                                getlist[i].dislike = false;
                            }
                            else {
                                getlist[i].dislike = true;
                            }
                            // console.log("llladsafdsf");

                        }
                    }

                    AsyncStorage.setItem('list', JSON.stringify(getlist),
                        () => {
                            this.setState({
                                list: getlist
                            }, () => {
                                for (var i = 0; i < getlist.length; i++) {
                                    console.log(getlist[i].name, getlist[i].dislike);
                                }
                            })
                        }
                    )
                }

            });
    }

    render() {
        return (
            // <View>
            <ImageBackground
                source={require('../../assets/lzy/p1.jpg')}
                style={styles.showbody}
            >
                {/* <View style={styles.tabbar}> */}
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
                       
                        {/* <Icon
                            style={styles.backicon}
                            name="left"
                            onPress={() => Actions.pop()}
                        /> */}
                        <Text style={styles.title}>{this.state.name}</Text>
                    </ImageBackground>

                {/* </View> */}
                <FlatList
                    numColumns={1}
                    data={this.state.list}
                    renderItem={({ item, idx }) => {
                        var changecolor = !item.dislike ? styles.dislike : styles.like;
                        return <View style={styles.placelist}>
                            <TouchableOpacity
                                onPress={() => Actions.placeDetail({ title: item.name })}
                            >
                                <Image style={styles.img}
                                    resizeMode="contain"
                                    source={item.picpath}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    // backgroundColor:'yellow',
                                    // width:320*s,
                                    flex: 1,
                                    height: 240 * s,
                                    marginLeft: 15 * s,
                                    padding: 20 * s,
                                    alignItems: 'center'
                                }}
                                onPress={() => Actions.placeDetail({ title: item.name })}
                            >
                                <Text style={styles.headtitle}>{item.name}</Text>
                                {/* <Text>{item.introduce.length>15?(item.introduce.substr(0,15)+'......'):item.introduce}</Text> */}
                                <Text>{item.introduce.length > 50 ? (item.introduce.substr(0, 50) + '......') : item.introduce}</Text>

                            </TouchableOpacity>
                            <Icon name="heart" style={[styles.ico, changecolor]} onPress={() => this.addlike(item.name)} />

                        </View>
                    }}
                />
            </ImageBackground>
            // </View>
        )
    }
}

const styles = StyleSheet.create({
    showbody: {
        flex: 1,
    },
    img: {
        width: 200 * s,
        height: 250 * s
    },
    placelist: {
        // width:width*0.8,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 25 * s,
        backgroundColor: '#fff',
        borderColor: '#eee',
        borderRadius: 20 * s,
        borderWidth: 1 * s,
        // backgroundColor:'yellow',
        padding: 15 * s,
        // marginTop:10*s,
        position: 'relative',
        elevation: 20,
        shadowColor: '#eee',
        shadowOffset: { h: 10, w: 10 },
        shadowRadius: 3,
        shadowOpacity: 0.8,
    },
    ico: {
        position: 'absolute',
        right: 30 * s,
        bottom: 40 * s,
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
        width:45*s,
        height:45*s,
        position: 'absolute',
        left: 10 * s,
        color: '#20B2AA'
    },
    title: {
        fontSize: 21,
        // color: 'white'
    },
    headtitle: {
        fontSize: 20,
        // marginTop:20*s,
        marginBottom: 20 * s,
    },
    like: {
        color: 'red'
    },
    dislike: {
        color: 'grey'
    }
})
