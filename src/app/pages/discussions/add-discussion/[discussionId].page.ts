import {RouteMeta} from '@analogjs/router';
import {Component, Input, inject} from '@angular/core';

import {GithubService} from '../../../lib/github.service';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

export const routeMeta: RouteMeta = {
  title: 'Add Github Discussion Comment'
};

@Component({
  selector: 'add-discussion-comment',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <header class="mb-4">
      <h1 class="mb-1 text-2xl font-semibold">Add Comment</h1>
      <hr />
    </header>
    <div>
      <div class="mb-6">
        <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comment</label>
        <input type="text" [(ngModel)]="body" id="large-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </div>
      <button (click)="addComment()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </div>
    `,
})
export default class AddDiscussionComponent {
    @Input() discussionId: number;

    body: string = "";

    private github: GithubService = inject(GithubService);

    addComment(): void {
      this.github.addDiscussion(this.discussionId, this.body);
    }
}
