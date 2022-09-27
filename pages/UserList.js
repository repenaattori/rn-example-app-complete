import { FlatList, View } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { userListStyle } from "../styles/AppStyles";

export default function UserList({users}){
    return(
        <View style={userListStyle.container}>
            <FlatList
                data={users}
                renderItem={ ({item})=><UserItem user={item}/> }
            />
        </View>
    );
}


const UserItem = ({user}) =>{
    return(
        <Card style={userListStyle.item}>
            <Card.Title
                title={user.username}
                left={()=><Avatar.Icon size={40} icon={user.icon} />}
            />
        </Card>
    )
}