import React,{Component} from 'react'
import{View,StyleSheet,Text,Image,TouchableOpacity,TextInput,Alert,Morda,KeyboardAvoidingView} from 'react-native'
import db from '../config';
import firebase from 'firebase'
import MyHeader from '../Components/myheader'

export default class MyBarterScreen extends React.Component{
    static navigationOptions = {header:null}
    constructor(props){
        super(props)
        this.state = {
            UserId: firebase.auth().currentUser.email,
            AllDonations:[]
        }
        this.requestRef = null
    }

    getAllBarters = ()=>{
        this.requestRef = db.collection("all_donations").where("donar_id","==",this.state.UserId)
        onSnapShot((snapshot)=>{
            var AllDonations = snapshot.docs.map(document => document.data())
            this.setState({
                AllDonations:AllDonations
            })
        })
    }



    

    render(){
        return(
            <View>
            <MyHeader title="My Donations" navigation ={this.props.navigation}/>
            <View>
                {
                    this.state.AllDonations.length === 0
                    ?
                    (
                        <View><Text> List of all donated books </Text></View>
                    )
                    :(
                        <FlatList
                        keyExtractor = {this.keyExtractor}
                        data = {this.state.AllBarterss}
                        renderItem = {this.renderItem}
                        />
                    )


                }
            </View>
        </View>
        )
    }
}
        
    
   
