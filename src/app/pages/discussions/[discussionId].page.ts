import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import type {DiscussionComment, DiscussionDetails} from '../../lib/github-interfaces';
import {GithubService} from '../../lib/github.service';

@Component({
  selector: 'app-discussion-details',
  standalone: true,
  imports: [AsyncPipe,NgIf,NgFor],
  template: `
  <ng-container *ngIf="(discussionDetails | async) as discussionDetails">
    <h2>Title: {{discussionDetails.title}}</h2>
      <p>By: {{discussionDetails.author}}</p>
      <p>Created at: {{discussionDetails.createdAt}}</p>
    <div *ngIf="(comments | async) as comments">
      <h3>View Comments Below ({{comments.length}})</h3>
      <ol class="mb-4" *ngFor="let comment of comments; index as i">
        <li>
          <h4>Comment #{{i}}</h4>
          <p>By: {{comment.author}}</p>
          <p>Created at: {{comment.createdAt}}</p>
          <p>Content: {{comment.bodyHTML}}</p>
        <li>
      </ol>
    </div>

    </ng-container>
  `,
})
export default class DiscussionDetailsPageComponent {
  private readonly route = inject(ActivatedRoute);
  private github: GithubService = inject(GithubService);
  discussionId: number;
  discussionDetails: Promise<DiscussionDetails>;
  comments: Promise<DiscussionComment[]>;

  constructor() {
      this.discussionId = +this.route.snapshot.params['discussionId'];
      this.discussionDetails = this.github.getDiscussionDetails(this.discussionId);
      this.comments = this.github.getDiscussionComments(this.discussionId);
  }
}