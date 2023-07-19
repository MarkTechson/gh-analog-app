import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <h2>Hello Analog</h2>

    Analog is a meta-framework on top of Angular.

    built at: {{date}}
  `,
})
export default class AboutPageComponent {
  date: Date = new Date();
}