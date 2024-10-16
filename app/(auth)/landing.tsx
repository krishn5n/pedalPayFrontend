import { SafeAreaView, Text, Dimensions, Image, View } from "react-native";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Home() {
    const gotosignin = () => {
        router.push('/signin')
    }

    const gotosignup = () => {
        router.push('/signup')
    }

    const gotohome = () => {
        router.push('/')
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <Image
                source={require('../../icons/cycle1.png')}
                style={styles.backicon}
            />
            <SafeAreaView style={styles.maindiv}>
                <Text style={styles.logo}>
                    PedalPay
                </Text>
                <TouchableOpacity style={styles.button} onPress={gotosignin}>
                    <Text style={styles.buttonText}>
                        Click to Sign-In
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={gotosignup}>
                    <Text style={styles.buttonText}>
                        Click to Sign-Up
                    </Text>
                </TouchableOpacity>
                <Text style={styles.introtext}>
                    Cycle Green, Spend Less, Live Better!"
                </Text>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    maindiv: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        fontSize: 40,
        marginBottom: Dimensions.get('window').height / 100,
    },
    introtext: {
        margin: 5,
        color: '#373737',
    },
    button: {
        marginVertical: 6,
        backgroundColor: 'black',
        height: Dimensions.get('window').height / 25,
        width: Dimensions.get('window').width / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
    backicon: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        opacity: 0.1,
        resizeMode: 'contain',
    }
})