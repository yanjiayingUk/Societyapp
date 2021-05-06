import React, { Component } from 'react'
import { Text,
    TextInput, 
    View, 
    StyleSheet, 
    ImageBackground, 
    Image, Scene, 
    TouchableOpacity, 
    ImageStore, 
    Dimensions,
    DeviceEventEmitter } from 'react-native'
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
    top: {
        height: 72,
        width: '100%',
        backgroundColor:'#3fcccb'
    },
    back: {
        paddingLeft: 15,
        // paddingTop:20,
        paddingTop: 30
    },
    title: {
        fontSize: 24,
        position: 'absolute',
        top: 20,
        left: 210
    },
    topbutton: {
        borderRadius: 15,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 25,
        right: 40
    },
    content: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    per: {
        width: width*0.8,
        height: height*0.75,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 18,
        marginTop: 30,
        backgroundColor:'white'
    },
    person: {
        justifyContent: 'center',
        height: 70,
        borderBottomWidth: 1,
        borderColor: '#3fcccb',
    },
    admin: {
        position: "absolute",
        top: 20,
        left: 90,
        fontSize: 25
    }
})

const data = [];
export default class Detail extends Component {
    constructor() {
        super();
        this.state = {
            dataa: [],
            content: '',
            files: data,
            multiple: true,
            // username:store.getState().getuser,
            username: 'admin'
        }
    }
    // onChange=(e)=>{
    //     e.preventDefault();
    //     const filelist = e.target.files;
    //     const formData = new FormData();
    //     var date = new Date();
    //     for(const key in filelist){
    //         formData.append(this.state.username.loginname+date.getTime()+Math.random().toFixed(5),filelist[key]);
    //         console.log(filelist[key],date.getTime());
    //     }
    //     console.log(formData);
    //     console.log(filelist);

    //     fetch('http://192.168.0.104:3001/dt/pic',{
    //         method:'POST',
    //         body:formData
    //     }).then(res=>res.json())
    //     .then(res=>{
    //         console.log(res)
    //     })
    // };
    componentDidMount() {
        var filelist = [];
        // var filelist = '';

        console.log(this.state.files)
        console.log(filelist);
        fetch('"http://192.168.233.1:3001/dt/save', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `username=${this.state.username}&content=${this.state.content}&picpath=${filelist}`
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({
                    dataa: res.dataa
                })
                Actions.pop();
            })
    }
    change = (e) => {
        console.log(e + '123455');
        this.setState({
            content: e
        })
    }
    push = (idx) => {
        // var filelist = [];
        // console.log(this.state.files)
        // console.log(filelist);
        console.log("要发表的内容：0000" + this.state.content);
        DeviceEventEmitter.emit('returnContent', JSON.stringify({ username: this.state.username, content: this.state.content }));
        // fetch('http://192.168.0.104:3001/dt/save',{
        //     method:'POST',
        //     mode:'cors',
        //     headers:{
        //         'Content-Type':'application/x-www-form-urlencoded'
        //     },
        //     body:`username=${this.state.username.loginname}&content=${this.state.content}&picpath=${filelist}`
        // })
        // .then(res=>res.json())
        // .then(res=>{
        //     console.log(res);
        //     this.setState({
        //         dataa:res.dataa
        //     })
        //     Actions.pop();
        // })
        Actions.pop();
    }
    render() {
        const { files } = this.state;
        return (
            <View>
                <View style={styles.top} >
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
                    <View>
                        <Icon name='chevron-left' onPress={Actions.pop} style={styles.back} />
                        <Text style={styles.title} >发表动态</Text>
                    </View>
                    <TouchableOpacity style={styles.topbutton}   >
                        {/* <Text style={styles.topbtntext} style={{fontSize:16}} onPress={Actions.community} >发表</Text> */}
                        <Text style={styles.topbtntext} style={{ fontSize: 16 }} onPress={(idx) => this.push(idx)} >发表</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.content} >
                    <View style={styles.per} >
                        <View style={styles.person} >
                            <Image style={{ width: 50, height: 50, borderRadius: 25, marginLeft: 20 }} source={require('../../assets/yjy/ytx.png')} />
                            <Text style={styles.admin} >小知</Text>
                        </View>
                        <TextInput placeholder='动态感想...'
                            style={{ height: 60,fontSize:22}}
                            value={this.state.content}
                            onChangeText={this.change}
                        >

                        </TextInput>

                    </View>
                </View>
            </View>
        )
    }
}
