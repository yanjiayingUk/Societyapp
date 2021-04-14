import React, { Component } from 'react';
import {
  SafeAreaView, StyleSheet, View, FlatList,
  Text, Image, TouchableOpacity, TextInput, Dimensions, ScrollView, ImageBackground,
} from 'react-native';
import { Carousel, Button } from '@ant-design/react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';

const { height, width } = Dimensions.get('window')
const w = width / 640;

export default class Home extends Component {
  render() {
    return (
      <View style={{ width: '100%', height: "100%", flex: 1 }}>
        <View>
          <View style={styles.top} >
            <View style={styles.toptext}>
              <Text style={{ fontSize: 24 }} >校园首页</Text>
            </View>
          </View>

          <Carousel
            autoplay
            infinite
            dotStyle={{ backgroundColor: "white" }}
            dotActiveStyle={{ backgroundColor: "red" }}
            style={{ overflow: "hidden", height: 370 * w }}
          >
            <Image source={require("../../assets/dqh/1.jpeg")} style={styles.car} />
            <Image source={require("../../assets/dqh/2.jpeg")} style={styles.car} />
            <Image source={require("../../assets/dqh/3.jpg")} style={styles.car} />
            <Image source={require("../../assets/dqh/4.jpg")} style={styles.car} />
          </Carousel>

          <View style={styles.bot}>
            <Button onPress={()=>Actions.introduction()} style={{height:height*0.09}}>
              <Icon name='solution' size={30} color={'#3fcccb'}/>
              <Text style={styles.title}>简介</Text>
            </Button>
            <Button onPress={()=>Actions.glory()} style={{height:height*0.09}}>
              <Icon name='trophy' size={30} color={'#3fcccb'}/>
              <Text style={styles.title}>荣耀墙</Text>
            </Button>
            <Button onPress={()=>Actions.newentrance()} style={{height:height*0.09}}>
              <Icon name='usergroup-add' size={30} color={'#3fcccb'}/>
              <Text style={styles.title}>招新入口</Text>
            </Button>
            <Button onPress={()=>Actions.somenew()} style={{height:height*0.09}}>
              <Icon name='eye' size={30} color={'#3fcccb'} />
              <Text style={styles.title}>新鲜事</Text>
            </Button>
            <Button onPress={()=>Actions.column()} style={{height:height*0.09}}>
              <Icon name='mail' size={30} color={'#3fcccb'}/>
              <Text style={styles.title}>意见栏</Text>
            </Button>
          </View>
          {/* <View style={styles.gg}>
              <ImageBackground source={require("../../assets/dqh/dmaoxian.jpg")} style={styles.gugong} >
                <Text style={styles.ggp} onPress={() => Actions.game()}>故宫大冒险：让你在游戏中了解故宫</Text>
              </ImageBackground>
            </View>
            <View style={styles.articles}>
              <Text style={styles.article}>文章推送</Text>
              <Text style={styles.look} onPress={() => Actions.article()}>查看更多>></Text></View>
            <View style={styles.flat}>
              <View>
                <Text
                  style={{ fontSize: 16, marginRight: 30 * w, width: 200 * w }} onPress={() => Actions.essay()}
                >故宫的大怪兽：让你看到一个不一样的故宫文化介绍</Text>
              </View>
              <View >
                <Image
                  style={styles.flimg}
                  source={require("../../assets/dqh/article1.png")} />
              </View>
            </View>*/}
        </View>
      </View>
    );
  };

}
const styles = StyleSheet.create({
  top: {
    height: 72,
    width: '100%',
    backgroundColor: '#3fcccb',
    marginBottom: 4
  },
  toptext: {
    height: 72,
    textAlign: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  car: {
    width: width,
    height: 400 * w,
  },
  bot: {
    borderRadius: 15,
    backgroundColor: 'white',
    width: width * 0.8,
    marginLeft: width * 0.1,
    marginTop: 25,
    height: height * 0.45
  },
  title:{
    fontSize:30
  }
})

