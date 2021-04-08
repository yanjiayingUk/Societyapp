import React, { Component } from 'react'
import {
    View, Text,
    StyleSheet, ImageBackground,ActivityIndicator,
    Dimensions, TextInput,Image,
    ScrollView, TouchableOpacity, FlatList,
} from "react-native";
import { myFetch } from '../utils/index';
// import HTML from "react-native-render-html";
// import HTMLView from 'react-native-htmlview'
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import { WebView } from 'react-native-webview';



const { width,height } = Dimensions.get('window');
const s = width / 640;


export default class Placedetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: ``,
            title:props.title,
            finish:false,
        }
        console.log(props.title+'323');
    }

    componentDidMount() {
        // myFetch.get('/detail', {
        //     jdtitle: '太和殿'
        // })
        //     .then(res => {
        //         console.log(JSON.stringify(res.data));
        //         this.setState({
        //             data: res.data
        //         })
        //     })
    }

    show = () => {
        this.setState({
            finish: true
        })
    }

    render() {
        return (
            <View>
                {/* <View style={styles.tabbar}>
                    <Icon 
                        style={styles.backicon} 
                        name="home"
                        onPress={()=>Actions.pop()}
                    />
                    <Text style={styles.title}>{this.state.title}</Text>
                </View> */}
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
                        <Text style={styles.title}>{this.state.title}</Text>
                    </ImageBackground>
                {
                    this.state.finish ? null : (<View style={styles.load}><ActivityIndicator size='large' color='red' /></View>)
                }
                <View style={{
                    // width:width,
                    // height:height,
                    width:width,
                    height:height*0.3,
                }}>
                    <WebView 
                        source={{ uri: 'https://lizhaoyun.github.io/zhixinghtml/html/map/'+this.state.title+'map.html' }} 
                        onLoad={this.show}
                    />
                </View>
                <View style={{
                    // width:width,
                    // height:height,
                    width:width,
                    height:height*0.6,
                }}>
                    <WebView 
                        source={{ uri: 'https://dqh123456.github.io/zhixing/'+this.state.title+'.html' }} 
                        onLoad={this.show}
                    />
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    tabbar:{
        width:width,
        height:80*s,
        flexDirection:'row',
        backgroundColor:'#B0C4DE',
        justifyContent:'center',
        alignItems:'center',
        position:'relative',
    },
    backicon:{
        width:45*s,
        height:45*s,
        position: 'absolute',
        left: 10 * s,
        color: '#20B2AA'
    },
    title:{
        fontSize:21,
        color:'black'
        // color:'white'
    },
    headtitle:{
        fontSize:20,
        // marginTop:20*s,
        marginBottom:20*s,
    },
    load:{
        width:width,
        height:height,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
    }
})
