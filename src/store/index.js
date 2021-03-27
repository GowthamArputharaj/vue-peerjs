// import { auth } from 'firebase-admin';
import { createStore, storeKey } from 'vuex'
import db from '../db.js'
import firebase from 'firebase'
import Firebase from 'firebase'
import router from '../router'
import Swal from 'sweetalert2'

export default createStore({
  state: {
    auth_displayName: 'Chataroo',
    auth_email: '',
    uuid: '',
    authUser: null,
    isAuth: false,

  },
  getters: {
    getDisplayName: state => {
      console.log('getName');
      if(state.isAuth) {
        return state.authUser.displayName;
      } else {
        return '';
      }
    },
    getUser(state) {
      console.log('get User()', state.authUser);
      return state.authUser;
    },
    getIsAuth(state) {
      console.log('get IsAuth()', state.isAuth);
      return state.isAuth;
    },
    getAllUsers(state) {
      console.log('get getAllUsers()', state.allUsers);
      return state.allUsers;      
    }
  },
  mutations: {
    changeName(state, name) {
      console.log('Change name', name)
      state.name = name;
    },
    setUser(state, payload) {
      console.log('set User ', payload);
      state.authUser = payload;
    },
    setUuid(state, uuid) {
      state.uuid = uuid;
    },
    setIsAuth(state, status) {
      state.isAuth = status;
    },
    setAllUsers(state, payload) {
      console.log('mutation ', payload);
      state.allUsers = payload;
    }
  },
  actions: {
    async allUsers(context, authUserUid) {

      // var allUsers = await db.collection('users').get();
      var allUserUid = await db.collection('users').doc(authUserUid).collection('connections').get();

      // retrieve a collection
      var au = await db.collection('users').doc(authUserUid).collection('connections')
      .get()
      .then(querySnapshot => {
        const documents = querySnapshot.docs.map(doc => doc.data().newConnection);
        console.log('ACTION DOCUMENTS ', documents);
        return documents;
        // do something with documents
      });

      au = au.filter(el => el !== undefined);
      console.log('___________ACTION DOCUMENTS___________ ', au);

      if(au != undefined || au != null) {
        console.log('000000000000000000000000000000000000000', au)
        context.commit('setAllUsers', au);
      }

      return au;

    },
    createConnection(context, payload) {
      try {

        console.log('trytrytrytrytrytrytrytrytrytrytrytry', payload);
        var senderName = null;

        db.collection('users').doc(payload.sender_uid).get()
        .then((resp) => { 

          var u = resp.data();
          var newConnection = {
            displayName: u.displayName,
            email: u.email,
            uid: u.uid,
            uuid: u.uuid,
          };
  
          console.log('SENDER IS ', u);
          senderName = u.displayName;
  
          // store connection in auth users's collection
          var dd = db.collection('users').doc(payload.authUser).collection('connections').doc(payload.sender_uid).set({
            newConnection,
          })
          .then(() => console.log('then createConnection Connection Created!!!'))
          .catch((err) => console.log('err is ', err.message))

          var u = context.getters.getUser;
          var newConnection = {
            displayName: u.displayName,
            email: u.email,
            uid: u.uid,
            uuid: u.uuid,
          };

          // store connection in sender users's collection
          var dd = db.collection('users').doc(payload.sender_uid).collection('connections').doc(payload.authUser).set({
            newConnection,
          })
          .then(() => console.log('then createConnection Connection Created!!!'))
          .catch((err) => console.log('err is ', err.message))


          Swal.fire({
            title: 'Connection created',
            text: `You can now contact ${senderName} securely..`,
            type: 'success',
            confirmButtonText: 'Okay'
          });
  
        })
        .catch((err) => console.log(err.message));
          
      } catch (error) {
        console.log('CATCH ERROR createCOnnection ||||| ', error.message);
      }

    },
    async dbAuthUser(context) {
      var isAuth = context.getters.getIsAuth;
      if(!isAuth) {
        firebase.auth().onAuthStateChanged(async (user) => {
          if (user) {
            
            var uid = user.uid;
    
            this.auth_user = user;
            console.log('USER IS ', user);
    
            var db_user = await db.collection('users').doc(user.uid).get();
    
            var payload = {
              displayName: db_user.data().displayName,
              email: db_user.data().email,
              uid: db_user.data().uid,
              uuid: db_user.data().uuid,
            };
            
            context.commit('setUser', payload);
            context.commit('setIsAuth', true);
            
            router.push('home');
              
            // ...
          } else {
            // User is signed out

            // ...
    
            // router.replace('/login');
    
          }
        });
      }
    },
  },
  modules: {
  }
})
