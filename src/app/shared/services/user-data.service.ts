import { Injectable } from '@angular/core'
import { UserData } from '../class/user-data.model'
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})

export class UserDataService {
  private afs: AngularFirestore
  
  constructor(afs: AngularFirestore) {
    this.afs = afs
  }

  getUserData() {
    return this.afs.collection('user-data').snapshotChanges()
  }

  createUserData(userData: UserData) {
    return this.afs.collection('user-data').add(userData)
  }

  updateUserData(userData: UserData){
    delete userData.id;
    this.afs.doc('user-data/' + userData.id).update(userData);
  }

  deleteUserData(userId: string){
    this.afs.doc('user-data/' + userId).delete();
  }

   
}
