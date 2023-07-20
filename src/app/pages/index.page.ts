import { RouteMeta } from '@analogjs/router';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GithubAuthProvider, signInWithPopup, Auth } from '@angular/fire/auth';
import { NgIf } from '@angular/common';

export const routeMeta: RouteMeta = {
  title: 'Analog Starter App'
};

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgIf],
  standalone: true,
  template: `
    <h1>Login Page {{isLoggedIn()}}</h1>

    <button (click)="ghLogin()">Login with GitHub</button>
    <div>
      <a routerLink="/discussions"
        class="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
        Discussions
      </a>
    </div>
  `,
  styles: [
    `
      .logo {
        will-change: filter;
      }
      .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
      }
      .logo.angular:hover {
        filter: drop-shadow(0 0 2em #42b883aa);
      }
      .read-the-docs {
        color: #888;
      }
    `,
  ],
})
export default class HomeComponent {
  provider = new GithubAuthProvider();
  firebaseAuth = inject(Auth);

  constructor() {
    this.provider.setCustomParameters({
      'allow_signup': 'false'
    });
    console.log(`Index page current user: `, this.firebaseAuth.currentUser);
  }

  isLoggedIn() {
    return this.firebaseAuth.currentUser ? true : false;
  }

  async ghLogin() {
    const result = await signInWithPopup(this.firebaseAuth, this.provider);

    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;

    // The signed-in user info.
    const user = result.user;
  }
}

