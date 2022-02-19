import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from "../../helper/colors/Colors";


const styles = StyleSheet.create({
    ButtonStyle: {
        height: hp(6),
        width: wp(73),
        backgroundColor: Colors.themeColor,
        borderRadius: 5,
        justifyContent: 'center',
        position: 'absolute',
        bottom: hp(2)
    },
    ButtonTextStyle: {
        alignSelf: 'center',
        fontSize: 14,
        color: Colors.AppColor
    }

})

export default styles;