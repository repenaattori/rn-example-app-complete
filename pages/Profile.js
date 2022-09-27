
import { profileStyle } from "../styles/AppStyles";
import {Avatar, Button, DefaultTheme, Text, TextInput, useTheme} from 'react-native-paper';
import { useEffect, useRef, useState } from "react";
import { ICONS } from "../Data";
import { Animated, Pressable, View } from "react-native";

export default function Profile({updateUser, user}){

    const {colors} = useTheme(DefaultTheme);
    const [note, setNote] = useState();
    const viewAnimValue = useRef(new Animated.Value(0)).current;

    useEffect(()=>{
        Animated.timing(viewAnimValue,{
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    },[]);

    const addNote = () => {
        const stamp = new Date().toLocaleDateString();
        const modUser = {...user};
        modUser.notes.push({timestamp: stamp, text: note})
        updateUser(modUser);
    }

    return(
        <Animated.View style={[profileStyle.container, {opacity: viewAnimValue}]}>
            <Text
                style={[profileStyle.header, {color: colors.primary}]}
            >
                {user.username}
            </Text>

            <IconCarousel user={user} icons={ICONS} onIconChange={setIcon=>updateUser({...user, icon:setIcon})}/>

            <TextInput
                label={'Note'}    
                multiline={true}
                value={note}
                onChangeText={n => setNote(n)}
                style={profileStyle.textArea}
            />
            <Button onPress={addNote} mode="contained" >Add note</Button>

        </Animated.View>
    );
}

//Icon carousel for choosing user icon (custom component)
const IconCarousel = ({onIconChange, user, icons})=>{

    const ui = icons.findIndex(icon => icon == user.icon );

    const fixIconIndexes = (iconIndexes)=>{
        return iconIndexes.map(i=> i<0 ? icons.length-1 : (i==icons.length ? 0 : i) );
    }
    
    const [indexes, setIndexes] = useState( fixIconIndexes([ui-1,ui,ui+1]));

    const changeCarouselValue = (left) => {
        let modified = indexes.map( i => left ? --i : ++i);
        modified = fixIconIndexes(modified);
        setIndexes(modified);
        onIconChange(icons[modified[1]]);
    }

    return(
        <View style={profileStyle.carousel}>
            <Pressable onPress={()=>changeCarouselValue(true)}>
                <Avatar.Icon size={50} style={profileStyle.nextIcon} icon={icons[indexes[0]]} />
            </Pressable>
            <Avatar.Icon size={50} icon={icons[indexes[1]]} />
            <Pressable  onPress={()=>changeCarouselValue(false)}>
                <Avatar.Icon size={50} style={profileStyle.nextIcon} icon={icons[indexes[2]]} />
            </Pressable>
        </View>
        
    )
}
