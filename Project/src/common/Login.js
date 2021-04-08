import React, {Component,useState} from 'react';
import {View, Text, Image, TextInput, AsyncStorage, TouchableOpacity, BackHandler, ToastAndroid, ImageBackground} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions,Router } from 'react-native-router-flux';
import {myFetch} from '../utils'
export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            pwd:'',
            isloading:false,
            now:0
        }
    }
    userhandle = (text)=>{
        this.setState({username:text})
    }
    pwdhandle = (text)=>{
        this.setState({pwd:text})
    }
    login = ()=>{
        // myFetch.get('/topics',{limit:4,user:'sss'})
        //     .then(res=>console.log(res))
        this.setState({isloading:true})
        myFetch.post('/login',{
            username:this.state.username,
            pwd:this.state.pwd}
        ).then(res=>{
            // 根据返回状态进行判断，正确时跳转首页
            // if(res){

            // }
            AsyncStorage.setItem('user',JSON.stringify(res.data))
                .then(()=>{
                    this.setState({isloading:false})
                    Actions.homePage();
                })
        })
    } 
  render() {
    BackHandler.addEventListener('back',()=>{
      if(new Date().getTime()-this.state.now<2000){
        BackHandler.exitApp();
      }else{
        ToastAndroid.show('确定要退出吗',100);
        this.state.now = new Date().getTime();
        return true;
      }
    });
    return (
      <ImageBackground source={require("../../assets/lzy/p1.jpg")} style={{width:"100%",height:"100%"}}>
      <View style={{flex: 1,justifyContent: 'center'}}>
        <View style={{ alignItems: 'center',justifyContent:"center",}}>
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
            <TextInput 
                onChangeText={this.userhandle}
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
            }}>
            <Text style={{color:"#0D0D0D"}}><Icon name="laptop" color="brown"/>&emsp;密&ensp;&nbsp;码</Text>
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
                onPress={this.login}>
                <Text style={{color:"black",opacity:1}}>登录</Text>
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
                onPress={()=>Actions.register()}>
                <Text>还没有账号？去注册</Text>
            </TouchableOpacity>
        </View>
        {
            this.state.isloading
            ?<View style={{paddingTop:400,paddingLeft:"40%",position:"absolute"}}><Text style={{fontSize:20}}>正在登录...</Text></View>
            :null
        }
      </View>
      </ImageBackground>
    );
  }
}