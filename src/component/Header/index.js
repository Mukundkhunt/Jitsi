import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styles } from './style';
import { Colors } from '../../helper/colors/Colors';


export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let { title, onBack } = this.props
        return (
            <SafeAreaView>
                <View style={styles.headerView}>
                    <TouchableOpacity onPress={() => {
                        onBack !== undefined ?
                            onBack()
                            :
                            {}
                    }} style={styles.subHeaderView}>
                        {
                            this.props.isBack ?
                                <View style={styles.BackIconView}>
                                    <View style={styles.backToachable}>
                                        <FontAwesome name="angle-left" size={hp(3)} color={Colors.blackColor} />
                                    </View>
                                </View>
                                :
                                <></>
                        }
                        <View style={styles.HeaderTextView}>
                            <Text style={styles.headingText}>{title !== undefined ? title : "Tech Bridge"}</Text>
                        </View>
                        {
                            this.props.isRight ?
                                <View style={[styles.BackIconView, { alignItems: "flex-end", flex: 1 }]}>
                                    <TouchableOpacity style={[styles.backToachable, { zIndex: 10 }]}>
                                        <Ionicons name="menu" size={28} color={Colors.blackColor} />
                                    </TouchableOpacity>
                                </View>
                                :
                                <></>
                        }
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}
