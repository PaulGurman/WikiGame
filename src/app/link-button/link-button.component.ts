import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-link-button',
  template: `
    <button (click)="OnClick(0);">{{Content}}</button>
  `,
  styles: []
})
export class LinkButtonComponent {
  @Input() Content;
  @Output() index = new EventEmitter<any>();
  constructor() {
  }

  OnClick(i : any) {
    this.index.emit(i);
    this.Content = "Ah";
  }

}
