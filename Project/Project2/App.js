/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  TextInput,
  StatusBar,
  BackHandler,
  ToastAndroid,
  AsyncStorage,

} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Router, Scene, Tabs, Actions, Drawer, Lightbox, Modal } from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen';

import { Icon } from '@ant-design/react-native'



import Login from './src/common/Login';
import SwiperPage from './src/common/SwiperPage';

import Register from './src/common/Register';
import Destination from './src/destination/Destination';//
import School from './src/destination/Schoolactivities';
import Communitys from './src/destination/Communityactivities';


import Home from './src/home/Home';
import Column from './src/home/Column';
import Glory from "./src/home/Glory";
import Introduction from './src/home/Introduction';
import Newentrance from './src/home/Newentrance';
import Somenew from './src/home/Somenew';
import Jjsheying from './src/home/Jjsheying'

// import cultureList from './src/culture/cultureList';//
// import cultureDetail from './src/culture/cultureDetail';//
// import tryselect from './src/destination/tryselect';
// import Placedetail from './src/destination/Placedetail';//
// import Jdlist from './src/destination/Jdlist';//


import Community from './src/community/Community';
import Detail from './src/community/Detail';
import Dtcontent from './src/community/Dtcontent';

import Mine from './src/mine/Mine';
import Change from './src/mine/Change';
import Editor from './src/mine/Editor';
import Minedt from './src/mine/Minedt';
import Minecollect from './src/mine/Minecollect'

// import searchResult from './src/search/searchResult';//
// import CitySelect from './city';//

console.disableYellowBox = true;//取消下面黄色的弹框提示





const App = () => {
  let [isLogin, setLogin] = useState(false);
  let [isFirstInstall, setFirstInstall] = useState(true);
  let now = 0;
  let init = () => {

    AsyncStorage.getItem('isFirstIntall')
      .then(res => {
        console.log('isinstall', res);
        if (res) {
          setFirstInstall(false);
        }
      });

    // AsyncStorage.clear();
    AsyncStorage.getItem('user')
      .then(res => {
        let user = JSON.parse(res);
        console.log('jjjjjjjjj' + res);
        if (!user) {
          SplashScreen.hide();
        }
        if (user && user.token) {
          SplashScreen.hide();
          setLogin(true);
        }
      })
  };
  function backAndroidHandler() {
    if (Actions.currentScene != 'home' && Actions.currentScene != 'login') {

      Actions.pop();
      console.log('now pop!!!!!' + Actions.currentScene);
      return true;

    } else {
      console.log('pop!!!!!' + Actions.currentScene);
      if (new Date().getTime() - now < 2000) {
        BackHandler.exitApp();
      } else {
        ToastAndroid.show('确定要退出吗', 100);
        now = new Date().getTime();
        return true;
      }
    }
  }

  useEffect(() => {
    init();
    BackHandler.addEventListener('hardwareBackPress', backAndroidHandler);
  });

  let afterInstall = () => {
    setFirstInstall(false);
  };

  if (isFirstInstall) {
    return <View style={{ flex: 1 }}>
      <SwiperPage afterInstall={afterInstall} />
    </View>
  }

  return (
    <>
      <Router>
        <Modal key="modal" hideNavBar>
          <Lightbox key="lightbox">
            {/* <Drawer key="drawer"
            contentComponent={()=><Text>drawer</Text>}
            drawerWidth={400}
            drawerIcon={()=><Icon name="menu"/>}
        > */}
            <Scene key="root">
              <Tabs
                key="tabbar"
                hideNavBar
                activeTintColor="red"
                inactiveTintColor="#b4b4b4"
              >

                <Scene key='homePage'
                  title='首页'
                  icon={
                    ({ focused }) => <Icon
                      color={focused ? 'red' : 'grey'}
                      name="home"
                      style={{ fontSize: 20 }}
                    />
                  }
                  hideNavBar
                >
                  {/* <Scene key="indexye" component={Shouye}/> */}
                  <Scene key="home" component={Home} />

                </Scene>





                <Scene key="destination"
                  // hideNavBar
                  title="活动"
                  icon={
                    ({ focused }) => <Icon
                      name="build"
                      color={focused ? 'red' : '#b4b4b4'}
                      style={{ fontSize: 20 }}
                    />
                  }
                >

                  <Scene
                    hideNavBar
                    // hideTabBar 
                    key="destinationIndex"
                    component={Destination} 
                    tabBarPosition="top"/>

                  </Scene>






                {/* 社区 */}
                <Scene
                  hideNavBar
                  key='communityPage'
                  hideDrawerButton
                  icon={({ focused }) =>
                    <Icon
                      color={focused ? 'red' : 'grey'}
                      name='message'
                      style={{ fontSize: 20 }} />
                  }
                  title="社区"
                >
                  <Scene key="community" component={Community} />
                </Scene>
                {/* <Scene
                  key="tryselect"
                  component={tryselect}
                /> */}

                {/* 我的 */}
                <Scene
                  hideNavBar
                  key='userPage'
                  hideDrawerButton
                  icon={({ focused }) =>
                    <Icon
                      color={focused ? 'red' : 'grey'}
                      name='user'
                      style={{ fontSize: 20 }} />
                  }
                  title="个人"
                >
                  <Scene key="mine" component={Mine} />
                </Scene>

              </Tabs>
            </Scene>
            {/* </Drawer> */}

          </Lightbox>
          <Scene initial={!isLogin} key="login" component={Login} />
          <Scene key="register" component={Register} />
          <Scene key='detail' component={Detail} />

          {/* <Scene key="tryselect" component={tryselect} /> */}
          <Scene key='dtcontent' component={Dtcontent} />
          {/* <Scene key="showresult" component={searchResult} /> */}

          <Scene key='change' component={Change} />
          <Scene key='editor' component={Editor} />
          <Scene key='minedt' component={Minedt} />
          <Scene key="minecollect" component={Minecollect} />


          <Scene key='column' component={Column} />
          <Scene key='glory' component={Glory} />
          <Scene key='introduction' component={Introduction} />
          <Scene key='newentrance' component={Newentrance} />
          <Scene key='somenew' component={Somenew} />
          <Scene key='jjsheying' component={Jjsheying} />


          {/* <Scene key="article" component={Article} /> */}
          {/* <Scene key="qvshui" component={Qvshui} /> */}
          {/* <Scene key="chengyv" component={Chengyv} /> */}
          {/* <Scene key="articleDetail" component={ArticleDetail} /> */}
          {/* <Scene key="essay" component={Essay} /> */}
          {/* <Scene key="game" component={Game} /> */}
        </Modal>
      </Router>

    </>
  );
};

const styles = StyleSheet.create({

});

export default App;









