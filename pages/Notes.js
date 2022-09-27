import { FlatList, View } from "react-native";
import { Card, DefaultTheme, Paragraph, Title, useTheme } from "react-native-paper";
import { noteStyle } from "../styles/AppStyles";

export default function Notes({user}){

    const {colors} = useTheme(DefaultTheme);

    if(!user){
        return(
            <Title
                style={[noteStyle.warning,{color:colors.primary}]}
            >
                Log in to see notes!!
            </Title>
        );
    }

    return(
        <View style={noteStyle.container}>
            <FlatList
                data={user.notes}
                renderItem={ ({item}) => <NoteItem note={item}/> }
            />
        </View>
    );
}

const NoteItem = ({note}) => {
    return(
        <Card style={noteStyle.card}>
            <Card.Title title={note.timestamp}/>
            <Card.Content>
                <Paragraph>{note.text}</Paragraph>
            </Card.Content>
        </Card>
    );
}