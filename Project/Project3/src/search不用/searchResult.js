import React, { Component } from 'react';
import {
    View, Text,
    StyleSheet, ImageBackground,
    Dimensions, TextInput, Image,ActivityIndicator,
    ScrollView, TouchableOpacity, FlatList, AsyncStorage, Alert, ToolbarAndroid, ToastAndroid,
} from "react-native";
import { Icon, List, Picker, Provider } from '@ant-design/react-native';
import { Actions } from "react-native-router-flux";
import { myFetch } from '../utils/index';


const { width,height } = Dimensions.get('window');
const s = width / 640;
// AsyncStorage.clear('historysearch');
export default class searchResult extends Component {
    constructor() {
        super();
        this.state = {
            key: '',
            success: false,
            culture: [],
            jdname: [],
            article: [],
            finish:true,
            hasno:false,
            historysearch: ['123']
        }
    }
    keyhandle = (text) => {
        console.log(text);
        this.setState({ key: text })
    }
    componentDidMount() {
        AsyncStorage.getItem('historysearch')
            .then(res => {
                console.log(JSON.parse(res));
                if(res){
                     this.setState({
                        historysearch:JSON.parse(res)
                    })
                }
               
            })
    }

    showresult = () => {
        if(this.state.key){
            this.setState((state) => {
                // console.log([...state.historysearch]);
                for(var i=0;i<state.historysearch.length;i++){
                    if(state.historysearch[i]!=state.key)
                        continue;
                    else{
                        return {
                            historysearch: [...state.historysearch]
                        }
                    }
                }
                return {
                    historysearch: [state.key,...state.historysearch]
                }
            }, () => {
                AsyncStorage.setItem('historysearch', JSON.stringify(this.state.historysearch))
                    .then(() => {
                        console.log("ok")
                    })
            })
            this.setState({
                finish:false
            })
            myFetch.post('/showresult', {
                keyword: this.state.key
            })
                .then(res => {
                    console.log(res.data.userInfo);
                    var result = res.data.userInfo;
                if(result){
                    this.setState({
                        success:true
                    })
                    for (var key in result) {
                        switch (key) {
                            case "jdname":
                                console.log('111' + result[key]);
                                this.setState({
                                    jdname: result[key]
                                })
                                break;
                            case "culturename":
                                console.log('222' + result[key]);
                                this.setState({
                                    culture: result[key]
                                })
                                break;
                            case "article":
                                console.log('333' + result[key]);
                                this.setState({
                                    article: result[key]
                                })
                                break;
                        }
                        // console.log(key + result[key]);
                    }
                    this.setState({
                        finish:true,
                    })
                }else{
                    this.setState({
                        success:false,
                        finish:true,
                        hasno:true
                    })
                }
                    console.log(this.state.culture);
                    console.log(this.state.jdname);

                })
        }else{
            ToastAndroid.show('请输入您要搜索的内容。', 80);
        }

    }

    render() {
        return (
            <ImageBackground
                style={styles.showbody}
                source={require("../../assets/lzy/homebcc2.png")}
            >
                <ImageBackground
                    style={{
                        width: width,
                        height: 80 * s,
                        justifyContent: 'center',
                    }}
                    resizeMode="cover"
                    source={require("../../assets/lzy/lzy1.jpg")}
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
                    <View style={styles.searchbar}>
                        <TextInput
                            style={styles.search}
                            placeholderTextColor="gray"
                            placeholder="请输入关键词"
                            onChangeText={this.keyhandle}
                            onPress={() => Actions.showresult()}
                        />
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={this.showresult}
                        >
                            <Icon name='search' size="md" />
                        </TouchableOpacity>
                    </View>

                </ImageBackground>
                <View style={{
                    padding:20*s
                }}>
                {
                    this.state.historysearch.length ? (
                        <View>
                            <Text style={styles.title}>历史搜索记录</Text>
                            <View style={styles.box}>
                                {
                                    this.state.historysearch.map((item) => (
                                        <Text style={styles.block}>{item}</Text>
                                    ))
                                }
                            </View>

                        </View>
                    ) : null
                }
                {
                    this.state.finish?null:(<View style={styles.load}><ActivityIndicator size='large' color='red'/></View>)
                }
                <View>
                    {
                        this.state.success ? (
                            <View style={styles.space}>
                                <View style={styles.space}>
                                    <Text style={styles.title}>文章</Text>
                                    <View style={styles.box}>
                                        {
                                            this.state.article.map((item) => (
                                                <TouchableOpacity
                                                    // onPress={()}
                                                >
                                                    <Text style={styles.block}>{item}</Text>
                                                </TouchableOpacity>
                                            ))
                                        }
                                    </View>
                                </View>
                                <View style={styles.space}>
                                    <Text style={styles.title}>景点</Text>
                                    <View style={styles.box}>
                                        {
                                            this.state.jdname.map((item) => (
                                                <TouchableOpacity
                                                    onPress={()=>Actions.placeDetail({ title: item})}
                                                >
                                                    <Text style={styles.block}>{item}</Text>
                                                </TouchableOpacity>
                                            ))
                                        }
                                    </View>
                                </View>
                                <View style={styles.space}>
                                    <Text style={styles.title}>文化</Text>
                                    <View style={styles.box}>
                                        {
                                            this.state.culture.map((item) => (
                                                <TouchableOpacity
                                                    onPress={()=>Actions.cultureDetail({ title: item})}
                                                >
                                                    <Text style={styles.block}>{item}</Text>
                                                </TouchableOpacity>
                                            ))
                                        }
                                    </View>
                                </View>
                            </View>
                        ) : (
                                
                                <View>
                                    {
                                        this.state.hasno?<View 
                                            style={{
                                                marginTop:100*s,
                                            }}
                                        >
                                            <Text style={{ color: 'red',fontSize:20, }}>没有查到该关键词</Text>
                                        </View>:null
                                    }
                                </View>
                            )
                    }
                </View>
            </View>

            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    searchbar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 25 * s,
    },
    search: {
        width: 460 * s,
        height: 50 * s,
        paddingLeft: 30 * s,
        borderWidth: 2 * s,
        borderColor: "#999999",
        borderRadius: 25 * s,
    },
    icon: {
        position: "absolute",
        top: 8 * s,
        right: 100 * s
    },
    backicon: {
        width: 45 * s,
        height: 45 * s,
        position: 'absolute',
        left: 10 * s,
        color: '#20B2AA'
    },
    showbody: {
        flex: 1,
    },
    title: {
        fontSize: 20
    },
    box: {
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap:'wrap'
    },
    block: {
        width: 120 * s,
        borderWidth: 1 * s,
        borderRadius: 12 * s,
        borderColor: '#CDC5BF',
        textAlign: 'center',
        backgroundColor: '#E8E8E8',
        fontSize: 18,
        margin: 5 * s
    },
    load:{
        width:width,
        height:height,
        justifyContent:'center',
        alignItems:'center',
    },
    space:{
        marginTop:30*s
    }
})
