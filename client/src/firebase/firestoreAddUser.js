//  importing functions and db
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

// function to add user to firestore
async function addUser() {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      username: "John Doe",
      email: "john@example.com",
      profile_picture: "john.jpg",
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

addUser();
