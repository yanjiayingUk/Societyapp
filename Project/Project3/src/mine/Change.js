import React, { Component } from 'react'
import { Text, Image, View, StyleSheet, ImageBackground, Dimensions, TextInput, AsyncStorage, TouchableOpacity,ToastAndroid } from 'react-native'
import Button from 'react-native-button';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';

const { height, width } = Dimensions.get('window')
export default class Change extends Component {
    constructor() {
        super();
        this.state = {
            username: '小知',
            sex: '女',
            age: '80',
            intro: '大家好，我是小知',
            data: {}
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
                    let text = { username: this.state.username } //获取数据
                    let send = JSON.stringify(text);

                    fetch("http://192.168.43.49:3001/login/person", {
                        method: 'POST',
                        headers: {
                            "Accept": 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: send
                    })
                        .then(res => res.json())
                        .then(res => {
                            console.log(res.message);
                            this.setState({
                                data: res.message

                            }, () => {
                                console.log(this.state.data);
                            })
                        })
                })
            })
    }

    namehandle = (text) => {
        this.setState({ username: text })
        console.log(text)
    }
    sexhandle = (text) => {
        this.setState({ sex: text })
    }
    // yearhandle = (text) => {
    //     this.setState({ age: text })
    // }
    collegehandle = (text) => {
        this.setState({ college: text })
    }
    snumberhandle = (text) => {
        this.setState({ snumber: text })
    }
    introhandle = (text) => {
        this.setState({ intro: text })
    }
    change = () => {
        fetch("http://192.168.43.49:3001/newintroduce/add", {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json'
            },
            // body:  `username=${username}`
            body: JSON.stringify({
                intro: this.state.intro,
                username: 'admin',
                sex: this.state.sex,
                snumber:this.state.snumber,
                college:this.state.college
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res.message);
                this.setState({
                    data: res.message

                }, () => {
                    console.log(this.state.data);
                })
            })
            // Actions.pop()
            // Actions.mine()
            ToastAndroid.show("内容修改成功", ToastAndroid.SHORT);
    }
    render() {
        return (
            <View>
                <View style={styles.tabbar}>
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
                    <Text style={styles.title}>编辑资料</Text>
                </View>

                <View style={{ alignItems: 'center', backgroundColor: 'white', height: height * 0.9 }}>
                    <View
                        style={{
                            width: '80%',
                            marginRight: 10,
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: 20,
                            marginBottom: 40,
                            marginTop: 70
                        }}>
                        <Text style={{ fontSize: 25, marginBottom: 5 }}>用户名:</Text>
                        <TextInput placeholder={this.state.data.username}
                            onChangeText={this.namehandle}
                            style={{ fontSize: 25, marginBottom: 5, marginLeft: 8 }}
                        />
                    </View>
                    <View
                        style={{
                            width: '80%',
                            marginRight: 10,
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: 20,
                            marginBottom: 40
                        }}>
                        <Text style={{ fontSize: 25, marginBottom: 5 }}>性别:</Text>
                        <TextInput placeholder={this.state.data.sex}
                            onChangeText={this.sexhandle}
                            style={{ fontSize: 25, marginBottom: 5, marginLeft: 8 }}
                        />
                    </View>
                    <View
                        style={{
                            width: '80%',
                            marginRight: 10,
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: 20,
                            marginBottom: 40
                        }}>
                        <Text style={{ fontSize: 25, marginBottom: 5 }}>学院:</Text>
                        <TextInput placeholder={this.state.data.college}
                            onChangeText={this.collegehandle}
                            style={{ fontSize: 25, marginBottom: 5, marginLeft: 8 }}
                        />
                    </View>
                    <View
                        style={{
                            width: '80%',
                            marginRight: 10,
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: 20,
                            marginBottom: 40
                        }}>
                        <Text style={{ fontSize: 25, marginBottom: 5 }}>学号:</Text>
                        <TextInput placeholder={this.state.data.snumber}
                            onChangeText={this.snumberhandle}
                            style={{ fontSize: 25, marginBottom: 5, marginLeft: 8 }}
                        />
                    </View>
                    <View
                        style={{
                            width: '80%',
                            marginRight: 10,
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: 20,
                            marginBottom: 40
                        }}>
                        <Text style={{ fontSize: 25, marginBottom: 5 }}>兴趣爱好:</Text>
                        <TextInput placeholder={this.state.data.intro}
                            onChangeText={this.introhandle}
                            style={{ fontSize: 25, marginBottom: 5, marginLeft: 8 }}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            width: '80%',
                            height: 60,
                            backgroundColor: '#3fcccb',
                            marginTop: 40,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={this.change}
                    >
                        <Text style={{ fontSize: 25 }}>保存</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    tabbar: {
        height: height * 0.1,
        width: width,
        flexDirection: 'row',
        alignItems: 'center'
    },
    main: {
        position: 'absolute',
        bottom: 0,
        marginLeft: width * 0.025,
        width: width * 0.95,
        // height: height * 0.55,
        height: 550,
        backgroundColor: 'pink',
        opacity: 0.5,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    tou: {
        bottom: 480,
        position: 'absolute',
        borderRadius: 70,
        width: 140,
        height: 140,
        borderWidth: 5,
        borderColor: 'white'
    },
    trends: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 15,
        color: 'black'
    },
    sto: {
        fontSize: 30,
        textAlign: 'center',
        color: 'black',
        marginTop: 30
    },
    title: {
        marginLeft: 200,
        fontSize: 30,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})