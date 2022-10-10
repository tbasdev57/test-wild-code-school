import { getDocs, addDoc } from "firebase/firestore";

//obtenir tous les utilisateurs de la base de données
export const getUsers = async (setUsers: Function, usersCollection: any) => {
    const data = await getDocs(usersCollection)
    //@ts-ignore
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
}

//stocker les utilisateurs dans la base de données
export const createUser = async (usersCollection: any, name: string) => {
    await addDoc(usersCollection, { name })
}