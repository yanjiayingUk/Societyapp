import React, { Component } from 'react'
import {View, Image,Text, TextInput, TouchableOpacity, AsyncStorage,ImageBackground} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { Icon } from '@ant-design/react-native';
import {myFetch} from '../utils'

export default class Register extends Component {
    constructor(){
        super();
        this.state={
            username:'',
            pwd:'',
            finish:false
        }
    }
    userhandle=(text)=>{
        this.setState({username:text})
    }
    pwdhandle=(text)=>{
        this.setState({pwd:text})
    }
    myregister=()=>{
        this.setState({finish:true})
        myFetch.post('/register',{
            username:this.state.username,
            pwd:this.state.pwd}
        )
        .then(res=>{
            AsyncStorage.setItem('user',JSON.stringify(res.data))
                .then(()=>{
                    this.setState({finish:false})
                    Actions.login();
                })
        })
    }
    render() {
        return (
            <ImageBackground source={require("../../assets/lzy/p1.jpg")} style={{width:"100%",height:"100%"}}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View
                    style={{ alignItems: 'center' }}>
                    <Image source={require("../../assets/dqh/zhixing2.png")} style={{position:"absolute",bottom:300}}/>
                    <View
                        style={{marginTop:100,
                            width: '80%',
                            marginRight: 10,
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingLeft: 20,
                        }}>
                        <Text style={{color:"#0D0D0D",marginLeft:2}}><Icon name="user" color="brown"/>&emsp;用户名</Text>
                        <TextInput onChangeText={this.userhandle} />
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
                        }}>
                        <Text style={{color:"#0D0D0D"}}><Icon name="laptop" color="brown"/>&emsp;密&ensp;&ensp;码</Text>
                        <TextInput
                            onChangeText={this.pwdhandle}
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            width: '60%',
                            height: 40,
                            borderWidth:1 ,
                            borderColor:"gray",
                            borderRadius:20,
                            marginTop: 30,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={this.myregister}>
                        <Text>点击注册</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: '60%',
                            height: 40,
                            borderWidth:1 ,
                            borderColor:"gray",
                            borderRadius:20,
                            marginTop: 30,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={() => Actions.pop()}>
                        <Text>已有账号？返回登录</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.finish
                    ?<View style={{paddingTop:400,paddingLeft:"40%",position:"absolute"}}><Text style={{fontSize:20}}>注册成功</Text></View>
                    :null
                }
            </View>
            </ImageBackground>
        )
    }
}
