import React,{useState} from 'react';
import { StyleSheet, Text, View,Modal, Alert,KeyboardAvoidingView, ShadowPropTypesIOS } from 'react-native';
import { TextInput,Button,HelperText} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const CreateEmployee =  (props)=>{
    const getDetails=(type)=>{
        if (props.route.params){
            switch(type){
                case"name":
                    return props.route.params.name
                case "phone":
                    return props.route.params.phone
                case "position":
                    return props.route.params.position
                case "email":
                    return props.route.params.email
                case "picture":
                    return props.route.params.picture
            }
        }
        return ""
    }

    const[name,setname] = useState(getDetails("name"))
    const[phone,setphone] = useState(getDetails("phone"))
    const[email,setemail] = useState(getDetails("email"))
    const[salary,setsalary] = useState(getDetails("salary"))
    const[picture,setpicture] = useState(getDetails("picture"))
    const[position,setposition] = useState(getDetails("position"))
    const[modal,setmodal] = useState(false)
    const [enableshift,setenableshift]=useState(false)
    const pickfromgallery = async ()=>{
        const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(granted){
            let data =    await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                quality:0.5
            })
            if(!data.cancelled){
                let newfile = {
                    uri:data.uri,
                    type: `test/${data.uri.split(".")[1]}`,
                    name:`test.${data.uri.split(".")[1]}`}
                    imageupload(newfile)
                
            }
        }else{
            Alert.alert("you need to permission to upload pic")
        }
    }
    const pickfromcam = async ()=>{
        const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(granted){
            let data =    await ImagePicker.launchCameraAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                quality:0.5
            })
            if(!data.cancelled){
                let newfile = {
                    uri:data.uri,
                    type: `test/${data.uri.split(".")[1]}`,
                    name:`test.${data.uri.split(".")[1]}`}
                
                    imageupload(newfile)
                            }
        }else{
            Alert.alert("you need to permission to upload pic")
        }
    }
       const imageupload= (image)=>{
        const data= new FormData()
        setpicture(image.uri)

        data.append('file',image)
        data.append('upload_preset','employeeapp')
        data.append("cloud_name","malikmati")

        fetch("https://api.cloudinary.com/v1_1/malikmati/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json()).then(data=>{console.log(data)})
        setmodal(false)
}
const submitdata = ()=>{
    fetch(" http://640d3792.ngrok.io/send",{
        method:"post",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({
            name,
            email,
            position,
            salary,
            phone,
            picture
        })
    }).then(res=>res.json()).then(data=>{
        setpicture(data.uri)
        Alert.alert(`employee ${data.name} data is saved`)
        props.navigation.navigate("Home")
})
}
const updateData= ()=>{
    fetch(" http://640d3792.ngrok.io/update",{
        method:"post",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({
            id:props.route.params._id,
            name,
            email,
            position,
            salary,
            phone,
            picture
        })
    }).then(res=>res.json()).then(data=>{
        setpicture(data.uri)
        Alert.alert(`employee ${data.name} data is updated`)
        props.navigation.navigate("Home")
})
}
    
    return(
        <KeyboardAvoidingView behavior="position" enabled={enableshift}>
        <View style={styles.textinput}>
            
            <TextInput
                label='Name'
                value={name}
                //Theme={Theme}
                mode="outlined"
                onFocus={()=>setenableshift(false)}
                keyboardType="default"
                onChangeText={text => setname(text)}
            />
            
            <TextInput
                label='Phone Number'
                value={phone}
                mode="outlined"
                keyboardType="number-pad"
                onFocus={()=>setenableshift(true)}
                onChangeText={text => setphone(text)}
            />
            <TextInput
                label='Email'
                value={email}
                mode="outlined"
                keyboardType="email-address"
                onFocus={()=>setenableshift(true)}
                onChangeText={text => setemail(text)}
            />
            <TextInput
                label='Salary'
                value={salary}
                mode="outlined"
                keyboardType="number-pad"
                onFocus={()=>setenableshift(true)}
                onChangeText={text => setsalary(text)}
            />
            <TextInput
                label='Position'
                value={position}
                mode="outlined"
                keyboardType="default"
                onFocus={()=>setenableshift(true)}
                onChangeText={text => setposition(text)}
            />
            
            <Button style={styles.bton} 
                icon={picture == "" ? "upload":"check"} mode="contained" onPress={() => setmodal(true)}>
                Upload picture
            </Button>
            
            {props.route.params?
             <Button 
             style={styles.bton}
             icon="content-save"
              mode="contained" 
             // theme={theme}
              onPress={() => updateData()}>
                   Update details
             </Button>
             : 
             <Button 
             style={styles.bton}
             icon="content-save"
              mode="contained" 
              //theme={theme}
              onPress={() => submitdata()}>
                   save
             </Button>
             }
            <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={()=>setmodal(false)}
            >
                <View style={styles.modalview}>
                    <View >
                        <Button style={styles.cbutonview} icon="camera" mode="contained" onPress={() => pickfromcam()}>
                            UPLOAD FROM CAMERA
                        </Button>
                        <Button style={styles.gbutonview} icon="file-image" mode="contained" onPress={() => pickfromgallery()}>
                            UPLOAD FROM GALARY
                        </Button>

                    </View>
                        <Button icon="cancel" mode="Outlined" onPress={() => setmodal(false)}>
                            cancel
                        </Button>
                    
                </View>

            </Modal>
            
            
        </View>
        </KeyboardAvoidingView>
    );


}
const styles = StyleSheet.create({
    textinput: {
        borderTopWidth:5,
        borderRadius:15,
        padding:5,
        
        
        
      },
      bton:{
        backgroundColor:"#0033ff",
        borderTopWidth:5,
        borderRadius:15,
        padding:5,
        },
    modalview:{
        padding:5,
        width:"100%",
        justifyContent:"center",
        position:"absolute",
        bottom:2,
    },
    gbutonview: {
        
        flexDirection:"column",
        bottom:3,
        justifyContent:"center",
        padding:10,
        borderRadius:15,
        backgroundColor:"#0033ff"
      },
      cbutonview: {
        flexDirection:"column",
        bottom:6,
        justifyContent:"space-evenly",
        padding:10,
        borderRadius:15,
        backgroundColor:"#0033ff"
      },
      
});
export default CreateEmployee