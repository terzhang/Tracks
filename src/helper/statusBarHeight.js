// Credit to https://github.com/ovr/react-native-status-bar-height/blob/master/index.js
import { Dimensions, Platform, StatusBar } from 'react-native';

// iPhones have a set status bar height of 20 pt and its X-series of 44 pt
// androids depend on each device but can be found with StatusBar component constant.
let isIPhoneX = false;
const iPhoneX_StatusBarHeight = 44;
const iPhone_StatusBarHeight = 20;
const android_StatusBarHeight = StatusBar.currentHeight;

// iPhone X / XS dimension === 375 pt by 812 pt
// iPhone XR / XS Max dimension === 414 pt by 896 pt
const X_MIN_WIDTH = 375;
const X_MIN_HEIGHT = 812;
const X_MAX_WIDTH = 414;
const X_MAX_HEIGHT = 896;

// get the dimension of current window.
const { height: WIN_HEIGHT, width: WIN_WIDTH } = Dimensions.get('window');

// for iOS devices that's not iPad or tvOS, check if it's iPhone X via dimension matching
if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
  isIPhoneX =
    (WIN_WIDTH === X_MIN_WIDTH && WIN_HEIGHT === X_MIN_HEIGHT) ||
    (WIN_WIDTH === X_MAX_WIDTH && WIN_HEIGHT === X_MAX_HEIGHT);
}

// assign status bar height based on platform.
const statusBarHeight = skipAndroid => {
  return Platform.select({
    ios: isIPhoneX ? iPhoneX_StatusBarHeight : iPhone_StatusBarHeight,
    android: skipAndroid ? 0 : android_StatusBarHeight,
    default: 0
  });
};
export default statusBarHeight;
