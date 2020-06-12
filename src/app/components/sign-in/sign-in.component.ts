import { Component } from '@angular/core'
import { AuthService } from 'src/app/shared/services/auth.service'
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router'

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {b
  public authService: AuthService
  public afAuth: AngularFireAuth
  public router: Router
  
  constructor(authService: AuthService, afAuth: AngularFireAuth, router: Router) { 
    this.authService = authService
    this.afAuth = afAuth
    this.router = router
    this.afAuth.authState.subscribe(auth => {
      if(auth) {
        this.router.navigateByUrl('/text-editor')
      }
    })
  }

}

