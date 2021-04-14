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
    title: {
        fontSize: 30,
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
        width: width,
        height: height*0.55,
        borderWidth: 1,
        borderColor: 'grey',
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
export default class Column extends Component {
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
                        <Text style={styles.title} >意见箱</Text>
                    </View>
                    <TouchableOpacity style={styles.topbutton}   >
                        {/* <Text style={styles.topbtntext} style={{fontSize:16}} onPress={Actions.community} >发表</Text> */}
                        <Text style={styles.topbtntext} style={{ fontSize: 20 }} onPress={(idx) => this.push(idx)} >提交</Text>
                    </TouchableOpacity>
                </View>

  
                    <View style={styles.per} >
                        <TextInput placeholder='我们会虚心听取您的建议...'
                            style={{ height: 60,fontSize:22}}
                            value={this.state.content}
                            onChangeText={this.change}
                        >

                        </TextInput>

                    </View>
          
            </View>
        )
    }
}