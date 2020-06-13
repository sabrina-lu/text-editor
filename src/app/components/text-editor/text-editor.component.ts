import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core'
import { AuthService, UserData } from '../../shared'
import { AngularFirestore } from '@angular/fire/firestore/'
import MediumEditor from 'medium-editor'

@Component({
  selector: 'text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})

export class TextEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('editable', {static: true}) editable: ElementRef
  public text: any 
  public editor: any
  public user: any
  public users: Array<any>
  public authService: AuthService
  public afs: AngularFirestore

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
      setTimeout(() => {
        this.textChange()
      },1000)
  }

  @HostListener('window:beforeunload', ['$event'])
  public onBeforeUnload (event: any) {
    this.textChange()
  }

  @HostListener('window:unload', ['$event'])
  public onUnload (event: any) {
    this.textChange()
  }

  @HostListener('document:click', ['$event'])
  public documentClick(event: Event): void {
    this.textChange()
  }
  
  constructor(authService: AuthService, afs: AngularFirestore) {
    this.authService = authService
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
        this.editable.nativeElement.innerHTML = a.text
      })
    })
  } 

  ngAfterViewInit() {
    this.editor = new MediumEditor(this.editable.nativeElement)

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

  textChange() {
    this.text = this.editable.nativeElement.innerHTML
    this.setUserData(this.user, this.text)
  }
}
