import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private firestore: Firestore) {}

  async getProfile(uid:string){

    const userRef = doc(
      this.firestore,
      `users/${uid}`
    );

    const snapshot = await getDoc(userRef);

    if(snapshot.exists()){
      return snapshot.data();
    }

    return null;
  }


  async updateProfile(uid:string,data:any){

    const userRef = doc(
      this.firestore,
      `users/${uid}`
    );


    await updateDoc(
      userRef,
      data
    );

  }

}