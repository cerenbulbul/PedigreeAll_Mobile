import React from "react";
import { StyleSheet, View, StatusBar ,Platform, Dimensions} from "react-native";
const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;
const { height, width } = Dimensions.get('window');
export const isIPhoneX = () => Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? width === X_WIDTH && height === X_HEIGHT || width === XSMAX_WIDTH && height === XSMAX_HEIGHT
    : false;
export const StatusBarHeight = Platform.select({
    ios: isIPhoneX() ? 50 : 20,
    android: StatusBar.currentHeight,
    default: 0
})

export function MyStatusBar({...props }) {

    return(
        <View style={[styles.statusBar]}>
      <StatusBar translucent backgroundColor='#20305B' {...props} />
         </View>
    )
}


const styles = StyleSheet.create({
    statusBar: {
        height: StatusBarHeight,
        backgroundColor:'#20305B'
      },
})