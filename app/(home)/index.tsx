import { SafeAreaView, Text, View, Dimensions } from "react-native";
import { Image, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import * as Location from 'expo-location';

export default function home() {
  const [perm, reqperm] = useCameraPermissions();
  const [bardata, setbardata] = useState<string>(''); // Explicitly specify string type
  const [screenshow, setscreen] = useState<boolean>(false); // Explicitly specify boolean type
  const [location, setlocation] = useState<[number, number] | null>(null); // Explicitly specify tuple type
  const [otp, setotp] = useState('');
  const [showotp, setshowotp] = useState<boolean>(false)
  const { name } = useLocalSearchParams();
  const ispermgrant = Boolean(perm?.granted);

  useEffect(() => {
    const getpermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status != "granted") {
        alert('The Following Application needs your Location')
      }
      let currentloc = await Location.getCurrentPositionAsync({});
      setlocation([currentloc.coords.longitude, currentloc.coords.latitude])
    }
    getpermission()
  }, []);

  const getotp = async (id: string) => {
    const url = 'http://192.168.198.108:5000/getotp';
    //console.log('here is getotp')
    const data = {
      'cycleid': id
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'  // ensure correct header case
        },
        body: JSON.stringify(data)
      });
      const res = await response.json();
      if (res['Status'] == 200) {
        //console.log('status is 200')
        setshowotp(true)
        setotp(res['otp'])
      }
      else if (res['Status'] == 300) {
        //console.log('status is 300')
      }
      else {
        //console.log('status is else')
      }
    }
    catch (err) {
      //console.log(err)
    }
  }

  const askperm = () => {
    if (ispermgrant) {
      setscreen(true)
    }
  }

  const removeotppage = () => {
    setshowotp(false)
  }

  return (
    <SafeAreaView style={style.overalldiv}>
      <View style={style.header}>
        <Text style={style.welcometext}>
          Welcome Back, {bardata} , {ispermgrant}!!
        </Text>
      </View>

      <View style={style.bottomdiv}>
        <View style={style.mapcontainer}>

        </View>
        <View style={style.dashboard}>
          <View style={style.nearestspot}>

          </View>
          <View style={style.camerascanner}>
            <Text style={style.qrscantext}>
              Scan QR Code
            </Text>
            {/* <View style={style.cameraholder}> */}
            <TouchableOpacity style={style.buttoncamera} onPress={askperm}>
              <Image
                source={require("../../icons/camera_883787.png")}
                resizeMode="contain"
                style={style.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {screenshow &&
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data != null) {
              console.log(data)
              setscreen(false)
              getotp(data)
            }
          }}
        />
      }
      {showotp &&
        <View style={style.otppage}>
          <Text style={{ fontSize: 40, color: 'orange' }}>
            This is your OTP
          </Text>
          <Text style={{ fontSize: 60, color: 'orange', marginTop: 20 }}>
            {otp}
          </Text>
          <TouchableOpacity onPress={removeotppage} style={style.leaveotp}>
            <Text style={style.otpbutton}>
              Click to Remove
            </Text>
          </TouchableOpacity>
        </View>
      }
    </SafeAreaView>
  )
}




const style = StyleSheet.create({
  overalldiv: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: "column",
    position: 'relative'
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    height: Dimensions.get('window').height / 14
  },
  welcometext: {
    fontSize: 20,
    marginRight: 10,
  },
  mapcontainer: {
    height: "50%",
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5
  },
  bottomdiv: {
    height: 13 * (Dimensions.get('window').height / 14),
    flexDirection: "column"
  },
  dashboard: {
    height: "29%",
    flexDirection: "row",
  },
  nearestspot: {
    width: 97 * (Dimensions.get('window').width / 200),
    borderBlockColor: 'black',
    borderWidth: 2,
    marginLeft: 5,
    marginRight: 5
  },
  camerascanner: {
    width: 97 * (Dimensions.get('window').width / 200),
    borderBlockColor: 'black',
    borderWidth: 2
  },
  qrscantext: {
    fontSize: 25,
    textAlign: "center",
    marginTop: 15,
    marginLeft: 10,
  },
  buttoncamera: {
    height: Dimensions.get('window').width / 2,
    width: Dimensions.get('window').width / 2,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    height: Dimensions.get('window').width / 3,
    width: Dimensions.get('window').width / 3
  },
  actualmap: {
    height: "50%"
  },
  otppage: {
    flex: 1,
    height: "100%",
    width: "100%",
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  otptext: {
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  leaveotp: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height / 25, // Set the height here
    backgroundColor: 'orange'
  },
  otpbutton: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center', // Center text horizontally
    width: '100%', // Ensure the text takes up the full width
  }

})