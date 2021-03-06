import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    Image,
    AsyncStorage
} from 'react-native'
import { Actions } from 'react-native-router-flux';
import { Button, Icon } from '@ant-design/react-native';

const { height, width } = Dimensions.get('window')


export default class Jjsheying extends Component {
    render() {
        return (
            <ScrollView style={{backgroundColor:'white'}}>
                <Text style={{fontSize:25}}>&emsp;&emsp;摄影社是在校团委领导下的学生社团之一，成立于1986年，在成长的过程中，
                始终坚持“团结，进取，求实，创新”的宗旨，历年均与高分被评为“一级协会”，“十佳社团”
                。在1998年，在广东省大学生摄影比赛中获得“一、二、三”等奖，两个优秀奖，会员作品在
                《中国青年报》、《南方日报》、《西江日报》、《高腰报》以及校级刊物发表，共达200多幅。
                在2004年3月，率先在学校众多的社团中成为首批社团党支部的协会、成为名副其实的老牌社团。
                在2005年4月，被共青团中央，金国学联、教育部评为全国高校“优秀学生社团”，七月，摄影协会
                党支部被评为“优秀基层党组织”。2006年5月，在新图书馆一楼举行为期一星期的“二十周年作品展
                ”活动，同月，举行了由肇庆美伦公司赞助的“香车丽人”摄影大赛。2007年6月，在广东省首届
                大学生动漫设计与摄影比赛中获得一、二、三等奖；七月，与中国邮政合作举行了“寻找DIY高手”
                明信片制作大赛。12月，在广东第二届广东大学生校园文化艺术节之摄影大赛中获得2个二等奖，
                3个优秀将，2个最佳技术运用奖。2008年4月，在摄影名家TCL副董事长郑传烈及其夫人黄妙真女士
                鼎立支持下举行了青春畅想“郑传烈、黄妙真”杯摄影创作比赛，收集了456幅512张作品，
                并且聘请了黄妙真女士为摄影社会顾问和指导老师。2008年10月，举行了“留住这一刻”08级新生
                军训摄影创作大赛，并评出了一、二、三等奖及优秀奖。2008年11月，与汽车爱好者协会举行了题
                为“与你相约08广州国际汽车展摄影展（摄影大赛）同月，再举行了由国美电器赞助的“金秋校园
                ，摄影情怀”系列摄影展活动。2008年12月，受学校邀请，到“第三届学生代表与团委代表现场拍现场
                拍照活动。同月，协助西江记者站采访本年度的自强之星。摄影协会现拥有独立的暗房和先进的
                专业设备收藏了大量的摄影文献资料，此外，摄协还拥有自己的会刊《大学生摄影》，至今已成功
                发行了十五期，现已并入《肇庆学院青年》报。留住瞬间相遇的幸福，追求多姿多彩的人生！
                摄影协会将为你提供翱翔的蓝天，摄影社将是你最佳的选择，摄影社期待着你的加入。不要
                再犹豫了，心动不如行动，赶快加入这个温馨的大家庭！</Text>
            </ScrollView>
        )
    }
}