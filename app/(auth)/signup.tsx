import { Link, router } from "expo-router";
import { Keyboard, SafeAreaView, Text, Button, View, StyleSheet, Dimensions } from "react-native";
import { GestureHandlerRootView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";

export default function home() {
    const [email, setemail] = useState('');
    const [pass, setpass] = useState('');
    const [name, setname] = useState('');
    const [passchange, setpasschange] = useState(false)
    const [borderofpass, setborpass] = useState('black')
    const [borderofemail, setboremail] = useState('black')
    const [emailchange, setemailchange] = useState(false)
    const emailcheck = /^[A-Za-z0-9]+@(gmail|yahoo)\.(com|in|us)$/
    const passwdcheck = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+[{}|;:'",.<>?]).*$/

    const changepass = (text: string) => {
        setpass(text);
        if (!passwdcheck.test(pass)) {
            setpasschange(true)
            setborpass('red')
        }
        else {
            setpasschange(false)
            setborpass('green')
        }
    }

    const removepass = () => {
        Keyboard.dismiss()
    }
    const changeemail = (text: string) => {
        setemail(text.toLowerCase());
        if (!emailcheck.test(email)) {
            setemailchange(true)
            setboremail('red')
        }
        else {
            setemailchange(false)
            setboremail('green')
        }
    }
    const removeemail = () => {
        Keyboard.dismiss()
    }

    const changename = (text: string) => {
        setname(text)
    }

    //Complete the function for submitting
    const submit = () => {
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
                            Sign-Up
                        </Text>
                        <View style={style.giveinfo}>
                            <View style={{ position: 'relative', marginTop: 5 }}>
                                <Text style={style.inputhead}>
                                    Name
                                </Text>
                                <View style={[style.inputcontainer, { borderColor: 'black' }]}>
                                    <TextInput style={style.inputform} onBlur={removeemail} onChangeText={changename} value={name} placeholder="Ex:-Harish" />
                                </View>
                            </View>
                            <View style={{ position: 'relative', marginTop: 5 }}>
                                <Text style={style.inputhead}>
                                    Email
                                </Text>
                                <View style={[style.inputcontainer, { borderColor: borderofemail }]}>
                                    <TextInput style={style.inputform} onBlur={removeemail} onChangeText={changeemail} value={email} placeholder="abc@example.com" />
                                </View>
                                {emailchange && <View style={style.onpasschange}>
                                    <Text>
                                        Should be a Valid Email
                                    </Text>
                                </View>}
                            </View>
                            <View style={{ position: 'relative', marginTop: 5 }}>
                                <Text style={style.inputhead}>
                                    Password
                                </Text>
                                <View style={[style.inputcontainer, { borderColor: borderofpass }]}>
                                    <TextInput style={style.inputform} onBlur={removepass} onChangeText={changepass} value={pass} placeholder="aA1!" />
                                </View>
                                {passchange && <View style={style.onpasschange}>
                                    <Text>
                                        Password Should Have a Lower Case, Upper Case, Number and Special Character
                                    </Text>
                                </View>}
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
        borderColor: 'black',
        borderWidth: 2,
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
        position: 'absolute',
        right: 0,
        top: -30,
        // right: -Dimensions.get('window').width / 2.5,
        // top: - Dimensions.get('window').height / 7.7,
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