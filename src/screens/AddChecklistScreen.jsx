import { StyleSheet, Text,TextInput,Button,Modal, View } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AddChecklistScreen = ({navigation}) => {
     const[title,setTitle]=useState('')
    
     const[modalVisible,setModalVisible]=useState(false)

     const saveChecklist=async()=>{
          const newChecklist={
               id:Date.now().toString(),
               title,
               
               date:new Date().toLocaleDateString()
          };
          const savedChecklists=await AsyncStorage.getItem('checklists');
          const checklists=savedChecklists ? JSON.parse(savedChecklists):[];
          checklists.push(newChecklist);
          await AsyncStorage.setItem('checklists',JSON.stringify(checklists));

          setModalVisible(false);
          navigation.goBack();
     }
  return (
    <View>
      <TextInput
      value={title}
      onChangeText={(txt)=>setTitle(txt)}
      placeholder="Title"
      />
      
      <Button
      title="Add Checklist"
      onPress={()=>setModalVisible(true)}
      />
      <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={()=>setModalVisible(false)}
      >
          <View>
               <Text>Do you want to save this checklist?</Text>
               <Button
               title='Ok'
               onPress={saveChecklist}
               />
               <Button
               title="cancel"
               onPress={()=>setModalVisible(false)}
               />
          </View>

      </Modal>
      
    </View>
  )
}

export default AddChecklistScreen

const styles = StyleSheet.create({})