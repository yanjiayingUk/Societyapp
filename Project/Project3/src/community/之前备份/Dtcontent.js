import React, { Component } from 'react'
import { Text, View, ImageBackground, StyleSheet, Image, TouchableOpacity,Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
    top: {
        width: '100%',
        height: 62,
        justifyContent: 'center'
    },
    back: {
        paddingLeft: 15,
        paddingTop: 10
    },
    title: {
        fontSize: 30,
        position: 'absolute',
        top: 20,
        left: 215
    },
    toux: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderStyle: 'dotted',
        marginLeft: 60,
        marginTop: 30
    },
    adminname: {
        fontSize: 20,
        position: 'absolute',
        top: 28,
        left: 140
    },
    admintime: {
        position: 'absolute',
        top: 60,
        left: 140
    },
    admincon: {
        fontSize: 15,
        paddingLeft: 35,
        paddingTop: 17,
        paddingRight: 35,
        lineHeight: 30
    }
})

export default class Dtcontent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // data:'',
            username: props.username,
            content: props.content,
            createtime: props.createtime,
            imgpath: props.imgpath
        }
        // console.log(props.content)
    }
    // componentDidMount(){
    //     this.setState({
    //         data:this.props.lacation.state
    //     },()=>{
    //         console.log(this.state.data);
    //     })
    // }
    render() {
        return (
            <View>
                <View style={{height: 72,width: '100%',backgroundColor:'#3fcccb'}} >
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
                    <View style={styles.top} >
                        <Text style={styles.title} >动态详情</Text>
                    </View>
                    </View>

                    <View style={{backgroundColor:'white',height:height-72}}>
                        {/* <Image source={require('../../assets/lj/ljtouxiang2.jpg')} style={styles.toux} /> */}
                        {/* <Image source={this.state.data['imgpath']} style={styles.toux} /> */}
                        <Image source={require('../../assets/lj/ljtouxiang1.jpeg')} style={styles.toux} />
                        <Text style={styles.adminname} >
                            {this.state.username}
                        </Text>
                        <Text style={styles.admintime} >
                            {/* 2020.02.01 */}
                            {this.state.createtime}
                        </Text>
                        <Text style={styles.admincon} >
                            {this.state.content}
                            {/* 这次衡山行，最有感觉的几处地方，麻姑仙境、石浪、祝孔庙于等，这次衡山行，最有感觉的几处地方，麻姑仙境、石浪、祝孔庙于等 */}
                        </Text>
                    </View>
            </View>
        )
    }
}
