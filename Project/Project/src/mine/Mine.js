import React, { Component } from 'react'
import { Animated, AsyncStorage, Text, Image, View, StyleSheet, ImageBackground, Dimensions, ToastAndroid } from 'react-native'
import Button from 'react-native-button';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
// import ImageCropPicker from 'react-native-image-crop-picker';

const { height, width } = Dimensions.get('window')

const options = {
    title: '请选择头像来源',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '相册图片',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    // noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class Mine extends Component {
    constructor() {
        super();

        let data = [];
        for (var i = 0; i < 10; i++) {
            data.push({ tit: i, key: i });
        }
        this.state = {
            username: '小知',
            tits: [],
            pag: 1,
            data,
            width: new Animated.Value(20),
            imageUrl: require('../../assets/yjy/ytx.png')
        }
        // this.state = {
        //     tits: [],
        //     pag: 1
        // }
    }

    componentDidMount() {
        AsyncStorage.getItem('user')
            .then(res => {
                res = JSON.parse(res);
                // console.log('yyy', res.username)
                this.setState({
                    username: res.username
                })
            })
        AsyncStorage.getItem('userimages')
            .then(res => {
                // console.log('returnimageUrl:', res)
                // console.log(res != null);
                if (res != null) {
                    // console.log(typeof (res));
                    res = res.replace(/\"/g, "");
                    this.setState({
                        imageUrl: res
                    }, () => { console.log(this.state.imageUrl) })
                }
            })
    }
    takephoto = () => {
        // ImageCropPicker.openCamera({
        //     width: 300,
        //     height: 400,
        //     cropping: true,
        // }).then(image => {
        //     this.setState({
        //         imageUrl: { uri: image.path }
        //     })
        //     // console.log("imageUrl:" + { uri: image.path })
        //     AsyncStorage.removeItem('userimages');
        //     AsyncStorage.setItem('userimages', JSON.stringify({ uri: image.path }))
        // });

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.error) {
                console.log('Error:', response.error);
            } else if (response.customButton) {
                console.log('custom:', response.customButton);
            }
            else {

                AsyncStorage.removeItem('userimages');

                console.log("lalala:" + response.uri)
                // AsyncStorage.setItem('userimages', JSON.stringify({uri:image.path}))
                AsyncStorage.setItem('userimages', JSON.stringify({ uri: response.uri }))
                const source = { uri: response.uri };
                this.setState({
                    imageUrl: source,
                });
            }
        });
    }
    zoom = () => {
        Animated.timing(this.state.width, {
            toValue: 200,
        }).start()
    }
    exit = () => {
        AsyncStorage.removeItem('user');
        Actions.login()
    }
    render() {
        return (
            <View>
                {/* <View style={styles.tabbar}>
                    <Text style={styles.title}>我的主页</Text>
                </View>
                <ImageBackground style={{ width: '100%', height: height * 0.9, position: 'relative', alignItems: 'center' }} source={require('../../assets/yjy/y1.jpg')}>
                    <View style={styles.main}>
                        <Text style={{ fontSize: 25, textAlign: 'center', marginTop: 100 }}>{this.state.username}</Text>
                        <Button style={styles.sto}  onPress={()=>Actions.minecollect()}>我的收藏</Button>
                        <Button style={styles.trends}  onPress={()=>Actions.minedt()}>我的动态</Button>
                        <Button style={styles.trends} onPress={() => Actions.editor()}>编辑资料</Button>
                        <Button style={styles.trends} onPress={this.exit}>退出登录</Button>
                    </View>
                    <Button onPress={() => { this.takephoto() }} style={{ bottom: 480, position: 'absolute' }}>
                        <Image
                            source={this.state.imageUrl}
                            style={{
                                width: 140,
                                height: 140,
                                borderWidth: 5,
                                borderColor: 'white',
                                marginTop: (height * 0.9 - 620),
                                borderRadius: 70,
                            }}
                        />
                    </Button>
                </ImageBackground> */}
                <View style={{ backgroundColor: '#3fcccb', width: width, height: height * 0.2,position:'relative'}}>
                    <Button onPress={() => { this.takephoto() }}>
                        <Image
                            source={this.state.imageUrl}
                            style={{
                                width: 140,
                                height: 140,
                                borderWidth: 5,
                                borderColor: 'white',
                                marginTop: height * 0.03,
                                marginLeft:width * 0.05,
                                borderRadius: 70
                            }}
                        />
                    </Button>
                    <Text style={{ fontSize: 40,position:'absolute',top:height*0.07,left:width*0.5}}>{this.state.username}</Text>
                </View>
                <View style={styles.title}>
                    <Button style={styles.sto}  onPress={()=>Actions.minecollect()}>参与活动</Button>
                </View>
                <View style={styles.title}>
                    <Button style={styles.sto}  onPress={()=>Actions.minedt()}>个人动态</Button>
                </View>
                <View style={styles.title}>
                    <Button style={styles.sto} onPress={() => Actions.editor()}>个人资料</Button>
                </View>
                <View style={styles.title}>
                    <Button style={styles.sto} onPress={this.exit}>退出登录</Button>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    trends: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 15,
        color: 'black'
    },
    sto: {
        fontSize: 30,
        marginRight:width*0.5,
        marginTop:17,
        color: 'black'
    },
    title: {
        backgroundColor:'white',
        height:height*0.08,
        width:width,
        marginTop:10
    }
})