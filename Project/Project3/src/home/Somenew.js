
import React, { Component } from 'react'
import { DeviceEventEmitter, Text, View, Image, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { Button } from '@ant-design/react-native';

const styles = StyleSheet.create({
    top: {
        height: 72,
        width: '100%',
        backgroundColor: '#3fcccb'
    },
    toptext: {
        height: 72,
        textAlign: 'center',
        textAlignVertical: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        width: '100%',
        height: "90%",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    con: {
        width: 450,
        height: 260,
        marginTop: 30,
        borderWidth: 1,
        borderColor: '#3fcccb',
        borderRadius: 10,
        backgroundColor: 'white'
    },
    adminname: {
        fontSize: 25,
        color:'red',
        marginLeft:25,
        marginTop:25
    },
    admincon: {
        width:400,
        marginTop:10,
        marginLeft:25,
        fontSize: 20,
        lineHeight: 25
    }
})



export default class Somenew extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            username: 'admin'
        }
    }
    render() {
        return (
            <ScrollView>
                {/* 头部 */}
                <View style={styles.top} >
                    <View style={styles.toptext}>
                        <Text style={{ fontSize: 30 }} >新鲜事</Text>
                    </View>
                </View>
                {/* body */}
                <ScrollView >
                    <View style={styles.body} >
                        <View style={styles.con} >
                            <Text style={styles.adminname} > 英语口语训练 </Text>
                            <Text style={styles.admincon} > 在比赛的这段时间里，同学们利用空闲时间反复练习发音，认真朗读每一篇短文，充分锻炼了自身的口语表达能力，进一步提高了语音语调的准确性，也在一定程度上增强了大家对于英语口语学习的积极性。</Text>
                        </View>
                        <View style={styles.con} >
                            <Text style={styles.adminname} > 汽车知识竞赛 </Text>
                            <Text style={styles.admincon} > 5月2日，汽车爱好者协会利用线上平台举办了汽车知识竞赛活动，此次活动让同学们学习了汽车知识，了解了汽车文化，丰富了同学们的课余生活，体现了大学生的创新精神，展现了交通与汽车工程学院的独特风采，生动形象地诠释了“创新博识，实践快乐”的活动主题。</Text>
                        </View>
                        <View style={styles.con} >
                            <Text style={styles.adminname} > 象棋大赛 </Text>
                            <Text style={styles.admincon} > 棋牌娱乐协会协同无人机协会于5月5日下午在“天天象棋”APP上举办了2020年中国象棋大赛。在棋场上，各位选手挥洒热血，正所谓两军对垒，针锋相对勇者胜。经过几场激烈厮杀后，最终决出了8名获胜者。该活动增加了社团成员之间的凝聚力，也促进了攀枝花学院象棋爱好者的友好交流。</Text>
                        </View>
                        <View style={styles.con} >
                            <Text style={styles.adminname} > 简历设计大赛 </Text>
                            <Text style={styles.admincon}>为使大学生能够全方位多角度地了解市场，提升自身的求职经验和文化素养，5月2日至8日，由商学社举办的第四届“简自我风采，历职场未来”简历设计大赛在线上举行。

此次活动丰富了大家的学习生活，提升了大学生的文化素养，使同学们更好地定位自己，尽早地规划就业方向与目标。</Text>
                        </View>
                    </View>
                </ScrollView>
            </ScrollView>
        )
    }
}