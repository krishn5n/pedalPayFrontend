import { Link, router } from "expo-router";
import { Keyboard, SafeAreaView, Text, Button, View, StyleSheet, Dimensions } from "react-native";
import { GestureHandlerRootView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";


export default function home() {
    const navigation = useNavigation();
    const [email, setemail] = useState('');
    const [pass, setpass] = useState('');
    const [passchange, setpasschange] = useState(false)
    const [borderofpass, setborpass] = useState('black')
    const [borderofemail, setboremail] = useState('black')


    const changepass = (text: string) => {
        setpass(text);
    }
    const passischanging = () => {
        setpasschange(true)
    }
    const removepass = () => {
        setpasschange(false)
        Keyboard.dismiss()
    }
    const changeemail = (text: string) => {
        setemail(text.toLowerCase());
    }
    const removeemail = () => {
        Keyboard.dismiss()
    }

    const submit = () => {
        router.replace('/')
    }

    const move = () => {
        router.replace('/')
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={style.maincontainer}>
                    <View style={style.logocontainer}>
                        <Text style={style.pedalpay}>
                            PedalPay
                        </Text>
                    </View>
                    <View style={style.infocontainer}>
                        <Text style={{ fontSize: 30 }}>
                            Log-In
                        </Text>
                        <View style={style.giveinfo}>
                            <View >
                                <Text style={style.inputhead}>
                                    Email
                                </Text>
                                <View style={[style.inputcontainer, { borderColor: borderofemail }]}>
                                    <TextInput style={style.inputform} onBlur={removeemail} onChangeText={changeemail} value={email} placeholder="abc@example.com" />
                                </View>
                            </View>
                            <View style={{ position: 'relative', marginTop: 5 }}>
                                <Text style={style.inputhead}>
                                    Password
                                </Text>
                                <View style={[style.inputcontainer, { borderColor: borderofpass }]}>
                                    <TextInput style={style.inputform} onBlur={removepass} onFocus={passischanging} onChangeText={changepass} value={pass} placeholder="aA1!" />
                                </View>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={style.submitbutcont} onPress={submit}>
                        <Text style={style.submitbut}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}



const style = StyleSheet.create({
    maincontainer: {
        position: 'relative',
        flex: 1
    },
    logocontainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 11,
        alignItems: 'center',
    },
    pedalpay: {
        fontSize: 40,
        paddingTop: 30,
    },
    infocontainer: {
        display: 'flex',
        height: 6 * (Dimensions.get('window').height / 15),
        marginTop: Dimensions.get('window').height / 7,
        marginLeft: 5,
        marginRight: 5,
        paddingTop: 25,
        alignItems: 'center',
    },
    giveinfo: {
        height: 4 * (Dimensions.get('window').height / 12),
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        padding: 15
    },
    inputform: {
        color: 'white',
        padding: 10,
        fontSize: 17,
    },
    inputcontainer: {
        borderWidth: 2,
        width: Dimensions.get('window').width - 30,
        height: 50,
        backgroundColor: 'gray',
        borderRadius: 20,
        justifyContent: "center",
        marginTop: 5
    },
    inputhead: {
        fontSize: 20,
        marginBottom: 5
    },
    onpasschange: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').height / 13,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        right: -Dimensions.get('window').width / 2.3,
        top: - Dimensions.get('window').height / 7.7,
        borderColor: 'black',
        borderWidth: 2
    },
    submitbutcont: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('screen').width,
    },
    submitbut: {
        borderWidth: 2,
        borderColor: 'black',
        width: 150,
        height: 50,
        textAlign: 'center',
        paddingTop: 15,
        backgroundColor: 'black',
        color: 'white',
        borderRadius: 30
    }
})