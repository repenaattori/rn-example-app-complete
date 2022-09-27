import { useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { appStyle } from './styles/AppStyles';
import {USERS} from './Data'
import { BottomNavigation, DefaultTheme, IconButton, Provider } from 'react-native-paper';
import Login from './pages/Login';
import UserList from './pages/UserList';
import Notes from './pages/Notes';
import Profile from './pages/Profile';

export default function App() {

  const [user, setUser] = useState();
  const [users, setUsers] = useState(USERS);
  const bgimage = require('./assets/triangles.png');
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'profile', title: 'Profile', icon: 'account'},
    {key: 'userlist', title: 'Users', icon: 'account-group'},
    {key: 'notes', title: 'Notes', icon: 'note-check'},
  ]);

  
  const updateUser = (user) => {
    if(user){
      if( users.find( u => u.username === user.username) == undefined ){
        setUsers([...users, user]); //Sign up new user
      }else{
        setUsers( users.map(u => u.username === user.username ? user : u) );
      }
    }
    setUser(user);
  }

  const screens = {
    profile: user == undefined ? 
      <Login user={user} users={users} updateUser={updateUser}/> 
      : 
      <Profile user={user} updateUser={updateUser} />,
    userlist: <UserList users={users}/>,
    notes: <Notes user={user}/>
  }

  const renderScene = ({route})=>{
    return(
      <ImageBackground source={bgimage} style={appStyle.container} imageStyle={appStyle.image}>
        {screens[route.key]}

        {user &&
          <IconButton
            icon='logout'
            size={35}
            style={appStyle.logoutIcon}
            onPress={()=>updateUser(undefined)}
          />
        }

      </ImageBackground>
    );
  }


  return (
    <Provider theme={DefaultTheme}>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </Provider>
  );
}

