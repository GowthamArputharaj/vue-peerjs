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
      if(state.isAuth) {
        return state.authUser.displayName;
      } else {
        return '';
      }
    },
    getUser(state) {
      return state.authUser;
    },
    getIsAuth(state) {
      return state.isAuth;
    },
    getAllUsers(state) {
      return state.allUsers;      
    }
  },
  mutations: {
    changeName(state, name) {
      state.name = name;
    },
    setUser(state, payload) {
      state.authUser = payload;
    },
    setUuid(state, uuid) {
      state.uuid = uuid;
    },
    setIsAuth(state, status) {
      state.isAuth = status;
    },
    setAllUsers(state, payload) {
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
        return documents;
        // do something with documents
      });

      au = au.filter(el => el !== undefined);

      if(au != undefined || au != null) {
        context.commit('setAllUsers', au);
      }

      return au;

    },
    createConnection(context, payload) {
      try {

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
  
          senderName = u.displayName;
  
          // store connection in auth users's collection
          var dd = db.collection('users').doc(payload.authUser).collection('connections').doc(payload.sender_uid).set({
            newConnection,
          })
          .then(() => console.log(''))
          .catch((err) => console.log(err.message))

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
          .then(() => console.log(''))
          .catch((err) => console.log(err.message))


          Swal.fire({
            title: 'Connection created',
            text: `You can now contact ${senderName} securely..`,
            type: 'success',
            confirmButtonText: 'Okay'
          });
  
        })
        .catch((err) => console.log(err.message));
          
      } catch (error) {
        console.log(error.message);
      }

    },
    async dbAuthUser(context, to_name = null) {
      var isAuth = context.getters.getIsAuth;
      if(!isAuth) {
        firebase.auth().onAuthStateChanged(async (user) => {
          if (user) {
            var uid = user.uid;
    
            this.auth_user = user;
    
            var db_user = await db.collection('users').doc(user.uid).get();
    
            var payload = {
              displayName: db_user.data().displayName,
              email: db_user.data().email,
              uid: db_user.data().uid,
              uuid: db_user.data().uuid,
            };
            
            context.commit('setUser', payload);

            context.commit('setIsAuth', true);
            
            // router.push('home');
            if(to_name == null || to_name == undefined) {
              to_name = 'home';
            }
            
            router.push(to_name);
              
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
