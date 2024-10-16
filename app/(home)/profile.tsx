import { SafeAreaView, Text, } from "react-native";
import { Link } from "expo-router";


export default function profile() {
    return (
        <SafeAreaView>
            <Text>
                Profile
            </Text>
            <Text>

                <Link href={"/landing"}>
                    Go to landing
                </Link>
            </Text>
        </SafeAreaView>
    )
}