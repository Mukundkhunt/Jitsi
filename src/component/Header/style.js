import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../../helper/colors/Colors';
import { Fonts } from '../../helper/fonts/Fonts';

export const styles = StyleSheet.create({
    headerView: {
        height: hp(8),
        justifyContent: "center"
    },
    subHeaderView: {
        flexDirection: "row", height: "100%"
    },
    BackIconView: {
        justifyContent: "center", alignItems: "center"
    },
    HeaderTextView: {
        justifyContent: "center"
    },
    headingText: {
        fontSize: hp(2.5),
        color: Colors.blackColor,
        fontFamily: Fonts.Medium
    },
    backToachable: {
        height: hp(5),
        width: hp(5),
        justifyContent: "center",
        alignItems: "center"
    }
}) 