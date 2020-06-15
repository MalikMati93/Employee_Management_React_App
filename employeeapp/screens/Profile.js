import React from 'react';
import { StyleSheet, Text, View,Image,Linking,Platform,Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title,Card,Button} from 'react-native-paper';
import { MaterialIcons,Foundation } from '@expo/vector-icons';


const Profile =(props)=>{
    const {_id,name,picture,phone,salary,email,position}=props.route.params.item
    const deleteEmployee = ()=>{
        fetch(" http://640d3792.ngrok.io/delete",{
            method:"post",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
               id:_id
            })
        }).then(res=>res.json()).then(deleteEmp=>{
            Alert.alert(`employee ${deleteEmp.name} data is deleted`)
            props.navigation.navigate("Home")
    })
    }
    const opendail = ()=>{
        if (Platform.OS=="android")
        {
            Linking.openURL(`tel:${phone}`)

        }
        else{
            Linking.openURL(`telpromt:${phone}`)

        }
    }
    return(
        
    <View style={styles.root}>
        <LinearGradient
        colors={["#0033ff","#6bc1ff"]}
        style={{height:"35%"}}
        />
        <View style={{alignItems:"center"}}>
        <Image
                 style={{width:150,height:150,borderRadius:150/2,marginTop:-50}}
                 source={{uri:picture}}
            />
        </View>
        <View style={{alignItems:"center" ,marginBottom:15}}>
            <Title>{name}</Title>
        </View>
        <View style={{fontSize:12,textDecorationColor:"blue",
            alignItems:"center" ,marginTop:-25,marginBottom:15}}>
            <Title>{position}</Title>
        </View>

        <Card style={styles.mycard} onPress= {()=>{Linking.openURL(`mailto:${email}`)}}>
            <View style={styles.cardcontent}>
                <MaterialIcons name="email" size={32} color="#0033ff"/>
                <Text style={styles.text}>{email}</Text>
            </View>
        </Card>

        <Card style={styles.mycard} onPress={()=>opendail()}>
            <View style={styles.cardcontent}>
                <Foundation name="telephone" size={32} color="#0033ff"/>
                 <Text style={styles.text}>{phone}</Text>
        </View>
        </Card>

        <Card style={styles.mycard}>
            <View style={styles.cardcontent}>
                <MaterialIcons  name="location-city" size={32} color="#0033ff"/>
                
                <Text style={styles.text}>Pakistan (Rawalpindi)</Text>
                
        </View>
        </Card>

        <Card>
            <View  style={styles.button}>
            <Button style={{backgroundColor:"#0033ff"}} onPress={() => props.navigation.navigate("CreateEmployee",{_id,name,picture,phone,salary,email,position})} icon="account-edit" mode="contained" >
                Edit Profile
            </Button>
            <Button style={{backgroundColor:"#0033ff"}} icon="delete-circle" mode="contained" onPress={() => deleteEmployee()}>
                Delete Account
            </Button>
            </View>
            </Card>

    </View>
    )

}
const styles = StyleSheet.create ({
    root:{
        flex:1
    },
    mycard:{
        margin:5,
        justifyContent:"center",
        borderWidth:1

    },
    cardcontent:{
        flexDirection:"row"
    },
    text:{
        fontSize:18,
        marginTop:3,
        marginLeft:6
    },
    button:{
        flexDirection:"row",
        justifyContent:"space-around",
        color:"#0033ff"
        
    },
    map:{
        ...StyleSheet.absoluteFillObject
    },
});
export default Profile