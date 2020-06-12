import { Injectable, NgZone } from '@angular/core'
import { auth } from 'firebase/app'
import { AngularFireAuth } from "@angular/fire/auth"
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Router } from "@angular/router"
import { User } from '../class/user'

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public userData: any 
  public afs: AngularFirestore
  public afAuth: AngularFireAuth
  public router: Router
  public ngZone: NgZone

  constructor(afs: AngularFirestore, afAuth: AngularFireAuth, router: Router, ngZone: NgZone ) {    
    this.afs = afs
    this.afAuth = afAuth
    this.router = router
    this.ngZone = ngZone
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user
        localStorage.setItem('user', JSON.stringify(this.userData))
        JSON.parse(localStorage.getItem('user'))
      } else {
        localStorage.setItem('user', null)
        JSON.parse(localStorage.getItem('user'))
      }
    })
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider())
  }

  authLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['text-editor'])
        })
    }).catch((error) => {
      window.alert(error)
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'))
    return (user !== null && user.emailVerified !== false) ? true : false
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user')
      this.router.navigate(['sign-in'])
    })
  }

}