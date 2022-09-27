import { Animated, TouchableOpacity, View} from "react-native";
import { loginStyle } from "../styles/AppStyles";
import { DefaultTheme, useTheme, TextInput, Text, Button, Snackbar } from "react-native-paper";
import { useRef, useState } from "react";
import { ICONS } from "../Data";


export default function Login({updateUser, users}){
    
    const {colors} = useTheme(DefaultTheme);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [showRegister, setShowRegister] = useState(false);
    const [error, setError] = useState("");
    const viewAnimValue = useRef(new Animated.Value(1)).current;

    const title = showRegister ? "SIGNUP" : "LOGIN";
    const linkTitle = showRegister ? "Log in" : "Sign up";


    const checkCredentials = ()=>{
        const user = users.find(u => u.username == username);
        if(showRegister){
            user != undefined
                ? setError('The user already exists!')
                : login({
                    username: username,
                    password: password,
                    icons: ICONS[1],
                    notes:[]
                })
        }else if(user == undefined || user.password != password){
            setError("Invalid credentials");
        }else{
            login(user);
        }
    }

    const login = (user) => Animated.timing(viewAnimValue,{
        toValue: 0,
        duration: 500,
        useNativeDriver: true
    }).start( () => updateUser(user) );

    return(
        <Animated.View style={[loginStyle.container, {opacity: viewAnimValue}]}>
            <Text style={[loginStyle.header, {color: colors.primary}]}>{title}</Text>

            <LoginTextInput
                label={'Username'}
                value={username}
                onchange={setUsername}
                icon={'account'}
            />
            <LoginTextInput
                label={'Password'}
                value={password}
                onchange={setPassword}
                icon={'lock'}
                isSecure={true}
            />
            {showRegister && <LoginTextInput
                label={'Email'}
                value={email}
                onchange={setEmail}
                icon={'email'}
            />}
            <Button
                mode="contained"
                style={loginStyle.buttonTitle}
                icon='login'
                onPress={checkCredentials}>
                    {title}
            </Button>
            <TouchableOpacity onPress={()=>setShowRegister(prev=>!prev)}>
                <Text 
                    style={[loginStyle.signup,{color: colors.primary}]}
                >{linkTitle}</Text>
            </TouchableOpacity>

            <Snackbar 
                visible={error!=""}
                onDismiss={()=>{setError("")}}
                action={{label: 'Close'}}
            >{error}
            </Snackbar>
        </Animated.View>
    )
}

const LoginTextInput = ({label, value, onchange, isSecure, icon}) => {
    const {colors} = useTheme(DefaultTheme);

    return(
        <TextInput
            label={label}
            value={value}
            onChangeText={onchange}
            secureTextEntry={isSecure}
            left={<TextInput.Icon name={icon}/>}
            style={loginStyle.textinput}
        />
    );
}



