
import React, { useState, useEffect } from 'react';
import type from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



// import * as firebase from 'firebase';
// import { firebaseConfig } from './config';
// import auth from '@react-native-firebase/auth';

// if (! firebase.apps.length){
//   firebase.initializeApp(firebaseConfig);

// }
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground


} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// import {initializeApp} from 'firebase/app'

// const firebaseConfig={

// }

import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyCgzf1Tog7yP3c4z3hph5ZLillFHb1BQjA",
//   authDomain: "project-e1491.firebaseapp.com",
//   databaseURL: "https://project-e1491-default-rtdb.firebaseio.com",
//   projectId: "project-e1491",
//   storageBucket: "project-e1491.appspot.com",
//   messagingSenderId: "966618091125",
//   appId: "1:966618091125:web:3581ce46e15f80822bb23c",
//   measurementId: "G-63YDHJZEEV"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';




// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

function Thisis({ route, navigation }) {
  const [userId, setUser] = useState('');
  const [name, setName] = useState('');
  function writeUserData() {

    set(ref(db, 'users/' + userId), {
      username: name,

    }).then(() => {
      alert('added')
    }).catch((e) => {
      alert(e)

    });
  }
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, color: 'green', fontWeight: 'bold', marginBottom: 30 }}>Jail Cell</Text>

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="us ID"
          placeholderTextColor="#003f5c"
          onChangeText={(userId) => setUser(userId)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Name "
          placeholderTextColor="#003f5c"
          onChangeText={(name) => setName(name)}
        />
      </View>


      <TouchableOpacity style={styles.sinupBtn}
        onPress={writeUserData}
      >
        <Text style={styles.loginText}>Add</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.sinupBtn}
        onPress={writeUserData} >
        <Text style={styles.create_account}>Back
        </Text>
      </TouchableOpacity>
    </View>

  );
}

function AddCell({ route, navigation }) {
  const [cellID, setCellID] = useState("");
  const [cellName, setCellName] = useState("");
  const [noOfPrison, setNoOfPrison] = useState("");
  const [discription, setDiscription] = useState("");

  function firestoreadding(){
    console.log('noew')
    firestore().collection('cell').add({
      cellID: cellID,
      cellName: cellName,
      noOfPrison:noOfPrison,
      discription:discription,
    }).then(function() {
    console.log('inside'),
      alert("Cell added successfully!");
      navigation.navigate('JailorMainScreen')
  })
  .catch(function(error) {
      alert(error);
  });
  }

  const Celladding = () => {
    if (cellID == "" || cellName == "" || noOfPrison == "" || discription == "") {
      alert('Fileds Cannot be Emptys')
    }
    else {
      var requestOptions = {
        method: 'POST',
        body: JSON.stringify({
          cellID: cellID,
          cellName: cellName,
          noOfPrison: noOfPrison,
          discription: discription
        }
        )
      };

      fetch("https://project-e1491-default-rtdb.firebaseio.com/Cell.json", requestOptions)
        .then(response => response.json())
        .then(result => {
          alert('Cell Added Successfully')
          navigation.navigate('JailorMainScreen')

        })
        .catch(error => alert(error));
    }

  }

  return (

    <View style={styles.container}>
      <Text style={{ fontSize: 40, color: 'green', fontWeight: 'bold', marginBottom: 30 }}>Jail Cell</Text>

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Cell ID"
          placeholderTextColor="#003f5c"
          onChangeText={(cellID) => setCellID(cellID)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Cell Name "
          placeholderTextColor="#003f5c"
          onChangeText={(cellName) => setCellName(cellName)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter No of Prison"
          placeholderTextColor="#003f5c"

          onChangeText={(noOfPrison) => setNoOfPrison(noOfPrison)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Discription"
          placeholderTextColor="#003f5c"
          onChangeText={(discription) => setDiscription(discription)}
        />
      </View>


      <TouchableOpacity style={styles.sinupBtn}
        onPress={firestoreadding}
      >
        <Text style={styles.loginText}>Add</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.sinupBtn}
        onPress={() => {

          navigation.navigate('JailorMainScreen', {

          });
        }} >
        <Text style={styles.create_account}>Back
        </Text>
      </TouchableOpacity>
    </View>
  );
}


function ViewCell({ route, navigation }) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('https://project-e1491-default-rtdb.firebaseio.com/Cell.json', { method: 'GET' })
      .then((response) => response.json())
      .then((json) => {
        setData(json);

      });
  }, []);
  return (
    <View>
      <ScrollView>

        {Object.entries(data).map((element) => {
          return (
            <View
              style={[
                styles.section,
                { justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, marginTop: 8, paddingBottom: 8, marginBottom: 20, borderWidth: 3, borderRadius: 5, width: '90%', marginLeft: 15, backgroundColor: 'lightgrey' },
              ]}>


              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Cell ID: </Text>
                <Text style={{ fontSize: 16 }}>{element[1].cellID}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Cell Name  :</Text>
                <Text style={{ fontSize: 16 }}>{element[1].cellName}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>No of Prisoner  :</Text>
                <Text style={{ fontSize: 16 }}>{element[1].noOfPrison}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Description:</Text>
                <Text style={{ fontSize: 16 }}>{element[1].discription}</Text>
              </View>

            </View>
          );
        })}
      </ScrollView>
    </View>

  );
}

function RemoveCell({ route, navigation }) {
  const [id, setID] = useState("");


  function deletion(){

    firestore()
  .collection("cell")
  .doc(id)
  .get()
  .then((snapshot) => {
    const name = snapshot.name
    if(!name=='')
    {
      alert('Cell Deleted!!!!!')
    }
    else{
      alert('Cell Not found')
      navigation.navigate('JailorMainScreen')
    }  
  });

  }
  function celldeletion() {
    app.database().ref('Cell/${id}').remove();

  }

  return (
    <View style={styles.container}>


      <ImageBackground style={{ width: '98%', height: '98%' }}
        source={{ uri: 'https://wallpaperaccess.com/full/2773576.jpg' }
        }>

        <TextInput
          style={{
            marginTop: 230,
            backgroundColor: '#D7D9D9',
            borderRadius: 12,
            width: "80%",
            height: 55,
            marginBottom: 30,
            marginLeft: 30,
            alignItems: "center",
          }}
          placeholder='Enter Cell ID to Remove'
          keyboardType='numeric'
          onChangeText={(id) => setID(id)}

        ></TextInput>


        <TouchableOpacity
          onPress={deletion}
          style={{
            width: "80%",
            borderRadius: 12,
            height: 55,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 14,
            backgroundColor: "#14C078",
            marginLeft: 30,
            marginBottom: 14
          }}
        >
          <Text>Remove Cell</Text>

        </TouchableOpacity>
      </ImageBackground>

    </View>
  );

}

function AddPrison({ route, navigation }) {
  const [id, setID] = useState("");
  const [cellID, setCellID] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState('');
  const [datein, setDateIn] = useState("");
  const [dateout, setDateoUT] = useState("");

  function prisonadding(){
    
    firestore().collection('prison').add({
      id: id,
      cellID: cellID,
      name:name,
      age:age,
      address:address,
      datein:datein,
      dateout:dateout
     
    }).then(function() {
    
      alert("Prison Added successfully!");
  })
  .catch(function(error) {
      alert(error);
  });
  }

  // const AddPrison = () => {
  //   if (id == "" || name == "" || cellID == "" || age == "" || address == "" || datein == "" || dateout == "") {
  //     alert('Fileds Cannot be Emptys')
  //   }
  //   else {
  //     var requestOptions = {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         id: id,
  //         cellID: cellID,
  //         name: name,
  //         age: age,
  //         address: address,
  //         datein: datein,
  //         dateout: dateout
  //       }
  //       )
  //     };

  //     fetch("https://project-e1491-default-rtdb.firebaseio.com/Prison.json", requestOptions)
  //       .then(response => response.json())
  //       .then(result => {
  //         alert('Prisoner Added Successfully')
  //         navigation.navigate('PrisonerMainScreen')

  //       })
  //       .catch(error => alert(error));
  //   }
  // }

  return (
    <View style={styles.container}>
      <ScrollView>

        <Text style={{ fontSize: 30, color: 'green', fontWeight: 'bold', marginBottom: 30 }}>Prison Submission</Text>

        <StatusBar style="auto" />

        <View style={styles.row}>

          <View style={styles.rowinput}>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter Prison ID"
              placeholderTextColor="#003f5c"
              keyboardType='numeric'
              onChangeText={(iD) => setID(iD)}
            />
          </View>
          <View style={styles.rowinput}>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter Cell ID"
              placeholderTextColor="#003f5c"
              keyboardType='numeric'
              onChangeText={(cellID) => setCellID(cellID)}
            />
          </View>

        </View>


        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Prison Name"
            placeholderTextColor="#003f5c"
            onChangeText={(name) => setName(name)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Prison Age"
            placeholderTextColor="#003f5c"
            keyboardType='numeric'
            onChangeText={(age) => setAge(age)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Priosn Address"
            placeholderTextColor="#003f5c"
            onChangeText={(address) => setAddress(address)}
          />
        </View>

        <View style={styles.row}>

          <View style={styles.rowinput}>
            <TextInput
              style={styles.TextInput}
              placeholder="Date of In"

              placeholderTextColor="#003f5c"
              onChangeText={(datein) => setDateIn(datein)}
            />
          </View>
          <View style={styles.rowinput}>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter of Out"
              placeholderTextColor="#003f5c"

              onChangeText={(dateout) => setDateoUT(dateout)}
            />
          </View>

        </View>
        <TouchableOpacity style={styles.prisonBtn}
          onPress={prisonadding}
        >
          <Text style={styles.loginText}>Add Prison</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.prisonBtn}
          onPress={() => {

            navigation.navigate('PrisonerMainScreen', {

            });
          }}
        >
          <Text style={styles.loginText}>Back</Text>
        </TouchableOpacity>

      </ScrollView>

    </View>
  );
}


function SearchPrison({ route, navigation }) {
  const [id, setID] = useState("");

  function searching(){

    firestore()
  .collection("prison")
  .doc(id)
  .get()
  .then((snapshot) => {
    const name = snapshot.name
    if(!name=='')
    {
      alert(name)
    }
    else{
      alert('Prison Not found')
      navigation.navigate('PrisonerMainScreen')
    }  
  });

  }

  

  return (
    <View style={styles.container}>


      <ImageBackground style={{ width: '98%', height: '98%' }}
        source={{ uri: 'https://t3.ftcdn.net/jpg/03/19/61/84/360_F_319618470_FPDyUuxYdVmUqpMwuOyMtz9uYWiKu5x0.jpg' }
        }>

        <TextInput
          style={{
            marginTop: 230,
            backgroundColor: '#D7D9D9',
            borderRadius: 12,
            width: "80%",
            height: 55,
            marginBottom: 30,
            marginLeft: 30,
            alignItems: "center",
          }}
          placeholder='Enter Prisoner ID You want to Search'
          keyboardType='numeric'
          onChangeText={(id) => setID(id)}

        ></TextInput>


        <TouchableOpacity

        onPress={searching}
          style={{
            width: "80%",
            borderRadius: 12,
            height: 55,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 14,
            backgroundColor: "#14C078",
            marginLeft: 30,
            marginBottom: 14
          }}
        >
          <Text>SEARCH</Text>

        </TouchableOpacity>
      </ImageBackground>

    </View>
  );

}

function ViewPrison({ route, navigation }) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('https://project-e1491-default-rtdb.firebaseio.com/Prison.json', { method: 'GET' })
      .then((response) => response.json())
      .then((json) => {
        setData(json);

      });
  }, []);
  return (
    <View>
      <ScrollView>

        {Object.entries(data).map((element) => {
          return (
            <View
              style={[
                styles.section,
                { justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, marginTop: 8, paddingBottom: 8, marginBottom: 20, borderWidth: 3, borderRadius: 5, width: '90%', marginLeft: 15, backgroundColor: 'lightgrey' },
              ]}>


              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Prisoner ID: </Text>
                <Text style={{ fontSize: 16 }}>{element[1].id}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Cell ID  :</Text>
                <Text style={{ fontSize: 16 }}>{element[1].cellID}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Prisoner Name  :</Text>
                <Text style={{ fontSize: 16 }}>{element[1].name}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Prisoner Age  :</Text>
                <Text style={{ fontSize: 16 }}>{element[1].age}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Address  : </Text>
                <Text style={{ fontSize: 16 }}>{element[1].address}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Date of IN  :</Text>
                <Text style={{ fontSize: 16 }}>{element[1].datein}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Date of Out :</Text>
                <Text style={{ fontSize: 16 }}>{element[1].dateout}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>

  );
}

function ReleasePrison({ route, navigation }) {
  const [id, setID] = useState("");

  function deletion(){

    firestore()
  .collection("prison")
  .doc(id)
  .get()
  .then((snapshot) => {
    const name = snapshot.name
    if(!name=='')
    {
      alert('Deleted')
    }
    else{
      alert('Prison Not found')
      navigation.navigate('PrisonerMainScreen')
    }  
  });

  }

  return (
    <View style={styles.container}>


      <ImageBackground style={{ width: '98%', height: '98%' }}
        source={{ uri: 'https://t3.ftcdn.net/jpg/03/19/61/84/360_F_319618470_FPDyUuxYdVmUqpMwuOyMtz9uYWiKu5x0.jpg' }
        }>

        <TextInput
          style={{
            marginTop: 230,
            backgroundColor: '#D7D9D9',
            borderRadius: 12,
            width: "80%",
            height: 55,
            marginBottom: 30,
            marginLeft: 30,
            alignItems: "center",
          }}
          placeholder='Enter Prisoner ID You want to Release'
          keyboardType='numeric'
          onChangeText={(id) => setID(id)}

        ></TextInput>

        <TouchableOpacity
        onPress={deletion}
          style={{
            width: "80%",
            borderRadius: 12,
            height: 55,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 14,
            backgroundColor: "#14C078",
            marginLeft: 30,
            marginBottom: 14
          }}
        >
          <Text>RELEASE</Text>

        </TouchableOpacity>
      </ImageBackground>

    </View>
  );


}

function GenerateReport({ route, navigation }) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('https://project-e1491-default-rtdb.firebaseio.com/Prison.json', { method: 'GET' })
      .then((response) => response.json())
      .then((json) => {
        setData(json);

      });
  }, []);
  return (
    <View>
      <ScrollView>

        {Object.entries(data).map((element) => {
          return (
            <View
              style={[
                styles.section,
                { justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, marginTop: 8, paddingBottom: 8, marginBottom: 20, borderWidth: 3, borderRadius: 5, width: '90%', marginLeft: 15, backgroundColor: 'lightgrey' },
              ]}>


              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Prisoner ID: </Text>
                <Text style={{ fontSize: 16 }}>{element[1].id}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Cell ID  :</Text>
                <Text style={{ fontSize: 16 }}>{element[1].cellID}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Prisoner Name  :</Text>
                <Text style={{ fontSize: 16 }}>{element[1].name}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Prisoner Age  :</Text>
                <Text style={{ fontSize: 16 }}>{element[1].age}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Address  : </Text>
                <Text style={{ fontSize: 16 }}>{element[1].address}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Date of IN  :</Text>
                <Text style={{ fontSize: 16 }}>{element[1].datein}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Date of Out :</Text>
                <Text style={{ fontSize: 16 }}>{element[1].dateout}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>

  );
        
        

}



function PrisonerMainScreen({ route, navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 35, color: 'green', fontWeight: 'bold', marginBottom: 30 }}>Priosner Mangement</Text>


      <TouchableOpacity style={styles.jailorbtn}

        onPress={() => {

          navigation.navigate('AddPrison', {

          });
        }}
      >
        <Text style={styles.text}>Add Prison</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.jailorbtn}

        onPress={() => {

          navigation.navigate('SearchPrison', {

          });
        }}
      >
        <Text style={styles.text}>Search Prison</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.jailorbtn}

        onPress={() => {

          navigation.navigate('ViewPrison', {

          });
        }}
      >
        <Text style={styles.text}>ViewPrison</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.jailorbtn}

        onPress={() => {

          navigation.navigate('ReleasePrison', {

          });
        }}
      >
        <Text style={styles.text}>Realse Prison</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.jailorbtn}

        onPress={() => {

          navigation.navigate('GenerateReport', {

          });
        }}
      >
        <Text style={styles.text}>Generate Report</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.jailorbtn}

        onPress={() => {

          navigation.navigate('MainMenu', {

          });
        }}
      >
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>

    </View>
  );


}
function JailorMainScreen({ route, navigation }) {
  return (
    <View style={styles.container}>
      
      <Image

        style={{ width: '90%', height: '40%' }}
        source={{ uri: 'https://i.ndtvimg.com/i/2016-12/jail-generic_650x400_51482400613.jpg' }
        }

      />
      <Text style={{ fontSize: 30, color: 'green', fontWeight: 'bold', marginBottom: 10 }}>Jailor Mangement</Text>


      <TouchableOpacity style={styles.jailorbtn}

        onPress={() => {

          navigation.navigate('AddCell', {

          });
        }}
      >
        <Text style={styles.text}>Add Cell</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.jailorbtn}

        onPress={() => {

          navigation.navigate('ViewCell', {

          });
        }}
      >
        <Text style={styles.text}>View Cells</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.jailorbtn}

        onPress={() => {

          navigation.navigate('RemoveCell', {

          });
        }}
      >
        <Text style={styles.text}>Remove Cell</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.jailorbtn}

        onPress={() => {

          navigation.navigate('MainMenu', {

          });
        }}
      >
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>

    </View>
  );

}

function MainMenu({ route, navigation }) {


  return (
    <View style={styles.container}>


      <Image

        style={{ width: '90%', height: '45%' }}
        source={{ uri: 'https://i.ndtvimg.com/i/2016-12/jail-generic_650x400_51482400613.jpg' }
        }

      />
      <StatusBar style="auto" />

      <TouchableOpacity style={styles.mainbtn}

        onPress={() => {

          navigation.navigate('JailorMainScreen', {

          });
        }}
      >
        <Text style={styles.loginText}>Jailor Management</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.mainbtn}
        onPress={() => {

          navigation.navigate('PrisonerMainScreen', {

          });
        }}
      >
        <Text style={styles.loginText}>Prison Management</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.mainbtn}

        onPress={() => {

          navigation.navigate('Login', {

          });
        }}
      >
        <Text style={styles.loginText}>Log out</Text>
      </TouchableOpacity>




    </View>
  );

}


function ForgotPassword({ route, navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, color: 'green', fontWeight: 'bold', marginBottom: 30, marginTop: 30 }}>Change Password</Text>

      <StatusBar style="auto" />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Your Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter New Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password Again"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>


      <TouchableOpacity style={styles.sinupBtn}

        onPress={() => {

          navigation.navigate('Login', {

          });
        }}

      >
        <Text style={styles.loginText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );


}

function Signup({ route, navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");


  function createuser() {
    console.log(email)
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        auth().currentUser.updateProfile({
          displayName: name
        })
        alert("Singup Success");
        navigation.navigate('MainMenu', {
          email: email,
          name: name,

        })
      })

  }
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, color: 'green', fontWeight: 'bold', marginBottom: 30 }}>Signup</Text>

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Full Name"
          placeholderTextColor="#003f5c"
          onChangeText={(name) => setName(name)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Your Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Create Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>


      <TouchableOpacity style={styles.sinupBtn}
        onPress={createuser}
      >
        <Text style={styles.loginText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {

          navigation.navigate('Login', {


          });
        }} >
        <Text style={styles.create_account}>Already have Account? Signin
        </Text>
      </TouchableOpacity>
    </View>
  );


}

function authn() {
  auth()
    .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
}

function Login({ route, navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  function checkuser() {

    //     const auth = getAuth();
    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in a
    //     // const user = userCredential.user;
    //     alert("Success");
    //     alert('goiing');
    //     navigation.navigate('MainMenu', {
    //       email:email, 
    //     });
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //   alert({email})


    //   });
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in anonymously');
        navigation.navigate('MainMenu')
      })
      .catch(error => {
        console.log(email === 'talha@gmail.com')
        console.error(error);
        navigation.navigate('MainMenu')
      });

  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, color: 'green', fontWeight: 'bold', marginBottom: 30 }}>LOGIN</Text>

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Your Email"
          placeholderTextColor="#003f5c"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Your Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity
        onPress={() => {

          navigation.navigate('ForgotPassword', {

          });
        }}
      >
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}

        onPress={checkuser}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {

          navigation.navigate('Signup', {

          });
        }} >
        <Text style={styles.create_account}>Don't have Account? Signup
        </Text>
      </TouchableOpacity>


    </View>
  );

}


const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="MainMenu" component={MainMenu} />
      <Stack.Screen name="JailorMainScreen" component={JailorMainScreen} />
      <Stack.Screen name="PrisonerMainScreen" component={PrisonerMainScreen} />
      <Stack.Screen name="RemoveCell" component={RemoveCell} />
      <Stack.Screen name="AddCell" component={AddCell} />
      <Stack.Screen name="ViewCell" component={ViewCell} />
      <Stack.Screen name="AddPrison" component={AddPrison} />
      <Stack.Screen name="ViewPrison" component={ViewPrison} />
      <Stack.Screen name="SearchPrison" component={SearchPrison} />
      <Stack.Screen name="GenerateReport" component={GenerateReport} />
      <Stack.Screen name="ReleasePrison" component={ReleasePrison} />
    </Stack.Navigator>
  );
}

const App = () => {

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },

  inputView: {
    backgroundColor: "#D7D9D9",
    borderRadius: 10,
    width: "94%",
    height: 55,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,

  },

  forgot_button: {
    height: 30,
  },
  create_account: {
    height: 30,
  },
  loginBtn: {
    width: "75%",
    borderRadius: 25,
    height: 55,
    fontSize: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#14C078",
    marginBottom: 30
  },
  sinupBtn: {
    width: "75%",
    borderRadius: 25,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    backgroundColor: "#14C078",
    marginBottom: 25
  },
  mainbtn: {
    width: "90%",
    borderRadius: 10,
    height: 60,

    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    backgroundColor: "#14C078",
    marginBottom: 15
  },
  jailorbtn: {
    width: "92%",
    borderRadius: 12,
    height: 60,
    justifyContent: "center",
    marginTop: 8,
    backgroundColor: "#D7D9D9",
    marginBottom: 8
  },
  text: {
    marginLeft: 18,
    fontSize: 25,
    fontWeight: 'bold'
  },
  row: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
  },

  rowinput: {
    backgroundColor: "#D7D9D9",
    borderRadius: 12,
    width: "45.5%",
    height: 55,
    alignItems: "center",
    marginRight: 10

  },
  prisonBtn: {
    width: "94%",
    borderRadius: 12,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
    backgroundColor: "#14C078",
    marginBottom: 14
  },

});

export default App;
