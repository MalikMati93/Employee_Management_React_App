import React,{useState,useEffect,useContext} from 'react';
import { StyleSheet, Text, View,Image,FlatList, Alert} from 'react-native';
import {Card,FAB} from 'react-native-paper';
import {useSelector,useDispatch} from 'react-redux';

const Home=(props)=>{
    const dispatch  = useDispatch()
    const {data,loading} =  useSelector((state)=>{
        return state
    })

    console.log(data,loading)
   
     const fetchData = ()=>{
        fetch("http://640d3792.ngrok.io/")
        .then(res=>res.json())
        .then(results=>{
    
            // setData(results)
            // setLoading(false)
          dispatch({type:"ADD_DATA",payload:results})
          dispatch({type:"SET_LOADING",payload:false})

        }).catch(err=>{
            Alert.alert("someting went wrong")
        })
     }
    
     useEffect(()=>{
          fetchData()
     },[])
const renderlist = ((item) =>{
    return(
        <Card style={styles.container}
            onPress={()=>props.navigation.navigate("Profile",{item:item})}
        >
            <View>
             <Image
                 style={{width:100,height:90,borderRadius:50/2}}
                 source={{uri:item.picture}}
             
             />
             <View>
            <Text> Name : {item.name}</Text>
            <Text> Position : {item.position}</Text>
            </View>
          </View>
              </Card>    );
})
return (
<View>
    {
    <FlatList
    data={data}
    renderItem={({item}) =>{
        return renderlist(item)
    }}
   keyExtractor={item=>item._id}
   onRefresh={()=>fetchData()}
   refreshing={loading}
   />}
   <View>
       <FAB onPress={()=> props.navigation.navigate("CreateEmployee")}
       style={styles.fab}
       large
       icon="plus"
      // onPress={() => console.log('Pressed')}
       />
  </View>
</View>
)
    
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin:5,
      padding:5,
      fontSize:10,
      alignItems: 'flex-start',
      justifyContent:'flex-start',
      flexDirection:'row', 
      backgroundColor: 'lightgrey',
    },
    //const styles = StyleSheet.create({
        fab: {
          position: 'absolute',
          margin: -55,
          right: 60,
          bottom: 0,
          backgroundColor:"#0033ff",
          
        },
  });
export default Home
