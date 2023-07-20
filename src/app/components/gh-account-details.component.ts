import {Component, OnInit, inject} from '@angular/core';
import {Auth} from '@angular/fire/auth';

@Component({
  selector: 'gh-account-details',
  standalone: true,
  templateUrl: 'gh-account-details.component.html',
  styles: [],
})
export class GhAccountDetails implements OnInit {
  private firebaseAuth = inject(Auth);

  displayName = '';
  photoUrl = ''

  ngOnInit() {
    const userInfo = this.firebaseAuth.currentUser;
    if (userInfo) {
      this.displayName = userInfo.displayName!;
      this.photoUrl = userInfo.photoURL!;
    }
  }
}
