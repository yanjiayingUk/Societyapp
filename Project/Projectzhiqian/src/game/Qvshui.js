import React ,{Component}from 'react';
import {SafeAreaView,StyleSheet, View,FlatList,
  Text,Image,StatusBar, TextInput,Dimensions, ScrollView,TouchableOpacity,ImageBackground} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { WebView } from 'react-native-webview';
import { Icon } from '@ant-design/react-native';
const {width} = Dimensions.get("window");
const {height} = Dimensions.get("window");
const w=width/640;

export default class Qvshui extends Component{
render(){
  return (
    <View style={{height:height,width:width}}>
        <ImageBackground source={require("../../assets/dqh/search.jpg")} style={{width: '100%'}}>
        <View style={styles.head}>
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
            <Text style={styles.gugong}>曲水流觞</Text>
        </View>
      </ImageBackground>
      <ImageBackground source={require("../../assets/dqh/homebc.png")} style={{width: '100%',height:height}}>
        <View style={{width:640*w,height:height*0.7}}>
            <WebView source={{ uri: 'https://dqh123456.github.io/pintu/pintu.html' }} style={{height:height,width:width}}/>
        </View>
      </ImageBackground>
        
    </View>
  );
};

}
const styles = StyleSheet.create({
    head:{
        height:90*w,
        paddingTop:15*w,
        paddingBottom:15*w,
        flexDirection: 'row',
        alignItems:"center",
    },
    backicon:{
      width:45*w,
      height:45*w,
      position: 'absolute',
      left: 10 *w,
      color: '#20B2AA'
  },
    gugong:{
        fontSize:16,
        marginLeft:"42%"
    },
})


