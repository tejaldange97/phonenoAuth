import React, {useState, useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';
//local import
import horizontalScale from '../res/Scale';
import {RootView, SimpleButton, CircleImage} from '../components/index';
import R from '../R';
import OtpInputs from 'react-native-otp-textinput';

export const Otp = ({route, navigation}) => {
  const {mobileNo} = route.params;

  const [flag, setFlag] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    signInWithPhoneNumber();
    console.log(mobileNo, 'data');
  }, []);

  // const validation = () => {
  //   // if (otp == '') {
  //   //   setFlag(true);
  //   // } else {
  //   //   setOtp('');
  //   //props.navigation.navigate('DrawerNavigator');
  //   props.navigation.navigate('UserType');
  //   // }
  // };

  async function signInWithPhoneNumber() {
    try {
      // alert('hhh');
      const confirmation = await auth().signInWithPhoneNumber(mobileNo);
      console.log('%%try', confirmation);
      setConfirm(confirmation);
    } catch (e) {
      console.log('%%mm');
      alert('hhh');
    }
  }

  async function confirmCode() {
    try {
      const response = await confirm.confirm(code);
      if (response) {
        props.navigation.navigate('UserType');
      }
    } catch (e) {
      alert('fail');
    }
  }
  return (
    <RootView customStyle={styles.View}>
      <CircleImage
        source={R.images.man}
        style={{marginTop: horizontalScale(50)}}
      />
      <Text style={styles.text}>You Will Get OTP Via SMS</Text>
      <OtpInputs
        handleChange={code => setCode(code)}
        inputCount={6}
        textInputStyle={styles.textInputStyle}
        containerStyle={styles.containerStyle}
      />
      {flag ? <Text style={styles.otpText}>Pleasr Enter Otp</Text> : null}
      <SimpleButton
        title="Proceed To Login"
        customTxtStyle={styles.customTxtStyle}
        customStyle={styles.customStyle}
        onPress={() => confirmCode()}
      />
    </RootView>
  );
};

const styles = StyleSheet.create({
  View: {
    alignItems: 'center',
    backgroundColor: R.colors.maroon,
  },
  otpText: {
    fontSize: horizontalScale(12),
    color: '#FF1493',
    marginTop: horizontalScale(10),
  },
  containerStyle: {
    backgroundColor: R.colors.maroon,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: horizontalScale(40),
  },
  textInputStyle: {
    borderRadius: 5,
    backgroundColor: R.colors.white,
    height: horizontalScale(45),
    width: horizontalScale(40),
  },
  text: {
    fontSize: horizontalScale(18),
    color: R.colors.white,
    fontWeight: 'bold',
    marginTop: horizontalScale(40),
  },
  customStyle: {
    backgroundColor: R.colors.lightPink,
    marginTop: horizontalScale(50),
  },
  customTxtStyle: {
    color: R.colors.maroon,
    fontSize: horizontalScale(18),
  },
});
