import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import generateUniqueId from "generate-unique-id";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signInWithEmailAndPassword } from "firebase/auth";

const singleNoteSuc = (note) => ({
  type: "SINGLE_NOTE_SUCCESS",
  payload: note,
});
const getNotesSuccess = (notes) => ({
  type: 'GET_NOTES_SUCCESS',
  payload: notes,
});
const noteDeleted = (id) => ({
  type: 'DELETE_NOTE_SUCCESS',
  payload: id,
});

const setUser = (user) => ({
  type: 'SET_USER',
  payload: user,
});

export const signIn = (email, password) => {
  return async (dispatch) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUser(userCredential.user));
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };
};

export const addNotes = (note) => {
  return async (dispatch) => {
    note.id = generateUniqueId({
      length: 4,
      useLetters: false
    });

    try {
      const docRef = await addDoc(collection(db, "notes"), note);
      dispatch({ type: "ADD_NOTE_SUCCESS", payload: docRef });
      dispatch(getNotes());
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
};

export const getNotes = () => {
  return async (dispatch) => {
    try {
      const notes = [];
      const querySnapshot = await getDocs(collection(db, 'notes'));
      querySnapshot.forEach((doc) => {
        notes.push({ id: doc.id, ...doc.data() });
      });
      dispatch(getNotesSuccess(notes));
    } catch (error) {
      console.error("Error fetching notes: ", error);
    }
  };
};

export const singleRec = (id) => {
  console.log("oggy", id); 
  return async (dispatch) => {
    try {
      const docRef = doc(db, 'notes', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data()); 
        dispatch(singleNoteSuc({ id: docSnap.id, ...docSnap.data() }));
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching single note: ", error);
    }
  };
};


export const updateNote = (id, updatedNote) => {
  return async (dispatch) => {
    try {
      const noteRef = doc(db, "notes", id);
      const docSnap = await getDoc(noteRef);

      if (!docSnap.exists()) {
        throw new Error(`No document found with ID: ${id}`);
      }

      await updateDoc(noteRef, updatedNote);
      dispatch(getNotes()); // Refresh the list of notes
      console.log("Note updated successfully");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
};


export const deleteNote = (id) => {
  return async (dispatch) => {
    try {
      await deleteDoc(doc(db, "notes", id));
      dispatch(noteDeleted(id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
};

export const uploadImage = (file) => {
  return async () => {
    try {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw error;
    }
  };
};

