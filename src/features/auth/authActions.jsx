import { SubmissionError, reset } from "redux-form";
import { closeModal } from "../modals/modalActions";
import { toastr } from 'react-redux-toastr'

export const login = creds => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);
      dispatch(closeModal());
    } catch (e) {
      console.log(e);
      throw new SubmissionError({
        _error: "Login failed."
      });
    }
  };
};

export const registerUser = (user) => 
  async (dispatch, getState,{ getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {
      //create user in auth
      let createdUser = 
        await firebase.auth()
          .createUserWithEmailAndPassword(user.email, user.password)
      console.log(createdUser)

      //update the auth profile
      await createdUser.updateProfile({
        displayName: user.displayName
      })

      //create new profile in firestore
      let newUser = {
        displayName: user.displayName,
        createdAt: firestore.FieldValue.serverTimestamp()
      }

      await firestore.set(`users/${createdUser.uid}`, {...newUser})
      dispatch(closeModal())

    } catch (e) {
      console.log(e);
      throw new SubmissionError({
        _error: e.message
      });
    }
};

export const socialLogin = (selectedProvider) => 
  async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase()
    const firestore = getFirestore()

    try {
      dispatch(closeModal())
      let user = await firebase.login({
        provider: selectedProvider,
        type: 'popup'
      })
      if (user.additionalUserInfo.isNewUser) {
        await firestore.set(`users/${user.user.uid}`, {
          displayName: user.profile.displayName,
          photoURL: user.profile.avatarUrl,
          createdAt: firestore.FieldValue.serverTimestamp()
        })
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  export const updatePassword = (creds) =>
    async (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase()
      const user = firebase.auth().currentUser;
      
      try {
        await user.updatePassword(creds.newPassword1)
        await dispatch(reset('account'))
        toastr.success('Success', 'Your pasword has been updated')
      } catch (e) {
        throw new SubmissionError({
          _error: e.message
        })  
      }
    }