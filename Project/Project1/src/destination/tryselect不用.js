import React, { Component } from 'react'
import {
    View, Text,
    StyleSheet, ImageBackground,
    Dimensions, TextInput,
    ScrollView, TouchableOpacity,
} from "react-native";
import { Icon, List, Picker, Provider } from '@ant-design/react-native';
import { Actions } from "react-native-router-flux";
import { WebView } from 'react-native-webview';
const data = [
    {
        "label": "北京市",
        "value": "11",
        "children": [
            {
                "label": "市辖区",
                "value": "1101",
            },
            {
                "label": "郊区",
                "value": "1102",
            }
        ]
    },
    {
        "value": '12',
        "label": '陕西省',
        "children":[
            {
                "label": "西安市",
                "value": "1201",
            },
            {
                "label": "长安区",
                "value": "1202",
            }
        ]
    }
]

export default class tryselect extends Component {
    constructor(props) {
        super(props);
        // this.onPress = () => {
        //    console.log(this.state.value);
        //   };
        this.onChange = value => {
            this.setState({ value });
        };
        this.state = {
            data: [],
            value: [],
            name:''
            // pickerValue: [],
        };
    }
    render() {
        return (
            // <Provider>
            //     <View style={{ marginTop: 30 }}>
            //         <List>
            //             <Picker
            //                 data={data}
            //                 cols={1}
            //                 value={this.state.value}
            //                 onChange={this.onChange}
            //             >
            //                 <List.Item arrow="horizontal" onPress={this.onPress}>
            //                     切换城市
            //                 </List.Item>
            //             </Picker>

                        
            //         </List>
            //     </View>
            //     <Text>{this.state.value}</Text>
            //     <Text>{'nn'+this.state.name}</Text>
            // </Provider> 
            <View style={{flex:1}}>
                <WebView source={{ uri: 'https://lizhaoyun.github.io/zhixinghtml/html/福字.html' }} />

            </View>
        )
    }
}
