import React ,{Component}from 'react';
import {SafeAreaView,StyleSheet, View,FlatList,
  Text,Image,StatusBar, TextInput,Dimensions, ScrollView,TouchableOpacity,ImageBackground} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { WebView } from 'react-native-webview';
import { Icon } from '@ant-design/react-native';
const {width} = Dimensions.get("window");
const w=width/640;

export default class Game extends Component{
render(){
  return (
    <View >
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
            <Text style={styles.gugong}>故宫大冒险</Text>
        </View>
      </ImageBackground>
      <ImageBackground source={require("../../assets/dqh/gamebc.jpg")} style={{width: '100%',height:"100%"}}>
        <View style={{height:100*w}}/>
        <View style={styles.game}>
        <TouchableOpacity onPress={()=>Actions.chengyv()}>
            <ImageBackground source={require("../../assets/dqh/dchengyv.png")} style={styles.gamebc}>
                <Text style={styles.gamep} onPress={()=>Actions.chengyv()}>成语对对碰</Text>
            </ImageBackground>
        </TouchableOpacity></View>
        <View  style={styles.game}>
        <TouchableOpacity onPress={()=>Actions.qvshui()}>
            <ImageBackground source={require("../../assets/dqh/qvshui.png")} style={styles.gamebc}>
                <Text style={styles.gamep2}  onPress={()=>Actions.qvshui()}>曲水流觞</Text>
            </ImageBackground>
        </TouchableOpacity></View>
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
  gugong:{
      fontSize:20,
      marginLeft:"40%"
  },
  backicon:{
      width:45*w,
      height:45*w,
      position: 'absolute',
      left: 10 *w,
      color: '#20B2AA'
  },
  game:{
    height:320*w,
    width:500*w,
    marginLeft:70*w,
    marginTop:50*w,
    borderWidth:2*w,

  },
  gamebc:{
    width:496*w,
    height:316*w,
    alignItems:"flex-end",
    flexDirection: 'row',
  },
  gamep:{
    flexDirection: 'row',
    marginLeft:"30%",
    marginBottom:20*w,
    fontSize:26,
  },
  gamep2:{
    flexDirection: 'row',
    marginLeft:"34%",
    marginBottom:20*w,
    fontSize:26,
  }
})


