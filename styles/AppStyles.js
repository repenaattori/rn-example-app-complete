import { StyleSheet } from "react-native";

const appStyle = StyleSheet.create({
    container: {
        flex: 1,
      },
      image:{
        opacity: 0.8
      },
      logoutIcon:{
        position: 'absolute', 
        right: 10, 
        top: 40, 
        backgroundColor: 'white', 
        borderWidth: 2
      }
     
});

const loginStyle = StyleSheet.create({
    container:{
        flex:1,
        alignSelf: "stretch",
        paddingTop: 100,
        paddingLeft:32,
        paddingRight: 32
    },
    textinput:{
        marginBottom: 16
    },
    header:{
        marginBottom: 50,
        alignSelf: 'center',
        fontSize: 50,
        fontWeight: 'bold',
    },
    signup:{
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "center",
        marginTop: 16
    },
    buttonTitle:{
        fontSize: 32
    }
});

const profileStyle = StyleSheet.create({
    container:{
        ...loginStyle.container
    },
    header:{
        ...loginStyle.header
    },
    avatarText:{
        alignSelf: 'center', 
        paddingBottom: 16,
    },
    textArea:{
        height: 200,
        marginBottom: 16
    },
    carousel:{
        alignSelf: "center",
        width: 300,
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 16
    },
    nextIcon:{
        opacity: 0.5
    }
});

const noteStyle = StyleSheet.create({
    container:{
        marginTop: 50
    },
    warning:{
        marginTop: 50,
        fontSize: 32,
        alignSelf: "center",
        backgroundColor: 'white',
        padding: 16,
        borderWidth: 4,
        borderRadius: 5,
        textAlignVertical: 'center'
    },
    card:{
        margin:16
    }
});

const userListStyle = StyleSheet.create({
    container:{
        marginTop: 50
    },
    item:{
        padding:16,
        marginLeft: 16,
        marginRight: 16, 
        marginBottom: 16
    }
});

export {appStyle, loginStyle, profileStyle, noteStyle, userListStyle};