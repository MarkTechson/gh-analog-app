import { RouteMeta } from '@analogjs/router';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import type { Discussion } from '../../lib/github-interfaces';
import { GithubService } from '../../lib/github.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import {NgFor} from '@angular/common';
import {Auth} from '@angular/fire/auth';

export const routeMeta: RouteMeta = {
  title: 'Github Discussions'
};

@Component({
  selector: 'app-discussions',
  standalone: true,
  imports: [NgFor, RouterLink, MatPaginatorModule],
  template: `
    <header class="mb-4">
      <h1 class="mb-1 text-2xl font-semibold">Discussions</h1>
      <p class="mb-1 max-w-lg text-sm opacity-50">From Github</p>
      <hr />
    </header>
    <article class="mb-4" *ngFor="let discussion of discussions(); index as i; trackBy: discussionTrackBy">
      <h2>Title: {{discussion.title}}</h2>
      <p>By: {{discussion.author}}</p>
      <p>Created at: {{discussion.createdAt}}</p>
      <button routerLink={{discussion.number}} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">View Details</button>
      <button [routerLink]="['/discussions/add-discussion', discussion.id]" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Comment</button>
      <hr/>
    </article>
    <mat-paginator
        (page)="handlePageEvent($event)"
        [length]="length"
        [pageSize]="pageSize"
        [showFirstLastButtons]="showFirstLastButtons"
        [pageSizeOptions]="pageSizeOptions"
        [pageIndex]="pageIndex"
        aria-label="Select page">
    </mat-paginator>
    `,
  styles: [
    `

    `,
  ],
})
export default class DiscussionsComponent implements OnInit {
  private github: GithubService = inject(GithubService);
  private length = 100;
  private pageSize = 5;
  private pageIndex = 0;
  private pageSizeOptions = [5, 10, 25];
  private showFirstLastButtons = true;
  private currentPage = 1;
  private isLastPage = false;
  private isFinishedLoading = false;
  private firebaseAuth = inject(Auth);

  discussions: WritableSignal<Array<Discussion>> = signal([]);
  allDiscussions: Array<Discussion> = [];

  discussionTrackBy(index: number, item: Discussion) {
    return item.number;
  }

  ngOnInit() {
    this.github.getDiscussionList()
      .then(discussions => {
        this.allDiscussions = discussions;
        this.discussions.set(this.getPageDiscussions(discussions));
      })
      .catch(e => {
        console.log(e);
      });
      // example of getting the current user
      console.log(this.firebaseAuth.currentUser);
  }

  getPageDiscussions(discussions: Discussion[]) {
    let firstIndex = 0;
    let lastIndex = 0;
    if (!this.isLastPage) {
      lastIndex = (this.currentPage * this.pageSize);
      firstIndex = lastIndex - this.pageSize;
    } else {
      firstIndex = (this.currentPage - 1) * this.pageSize;
      lastIndex = this.discussions.length;
    }
    let newDiscussionPage: Array<Discussion> = [];
    discussions.forEach((value, i) => {
      if (i >= firstIndex && i < lastIndex) {
        newDiscussionPage.push(value);
      }
    });
    return newDiscussionPage;
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.currentPage = e.pageIndex + 1;
    const calcLastPage = Math.floor(e.length / e.pageSize);
    this.isLastPage = calcLastPage === e.pageIndex;
    this.discussions.set(this.getPageDiscussions(this.allDiscussions));
  }
}
