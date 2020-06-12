import { Component, OnInit } from '@angular/core'
import { AuthService, UserData, UserDataService } from '../../shared'
import { AngularFirestore } from '@angular/fire/firestore/'

@Component({
  selector: 'text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {
  public text 
  public authService: AuthService
  public user: any
  public users: Array<any>
  public afs: AngularFirestore
  private ud: UserDataService
  private id: any 

  constructor(authService: AuthService, ud: UserDataService, afs: AngularFirestore) {
    this.authService = authService
    this.ud = ud
    this.afs = afs
   }

  ngOnInit() {
    let i: any
    this.user = JSON.parse(localStorage.getItem('user'))
    console.log(this.user.displayName)
    this.afs.collection('user-data').valueChanges().subscribe(res => {
      this.users = res
      this.users.forEach(a => {
        if(a.id == this.user.uid)
        this.text = a.text
      })
    })
   
  } 
  
  setUserData(user, text) {
    const userRef = this.afs.doc(`user-data/${user.uid}`)
    const userData: UserData = {
      id: user.uid,
      name: user.displayName,
      text: text
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  textChange(event) {
    this.text = event.target.value
    this.setUserData(this.user,this.text)
  }

  create(userData: UserData) {
    this.ud.createUserData(userData)
  }

  update(userData: UserData) {
    this.ud.updateUserData(userData)
  }

  delete(id: string) {
    this.ud.deleteUserData(id)
  }

}
