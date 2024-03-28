import {Component, EventEmitter, Output} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {debounceTime, Subject} from "rxjs";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <input type="text" placeholder="Search..." (input)="onInputChange($event)">
  `,
  styles: `
    :host {
      max-width: 700px;
      width: 100%;

      input {
        width: 100%;
        padding: 8px 10px;
      }
    }
  `
})
export class SearchComponent {
  private searchSubject: Subject<string> = new Subject<string>();
  @Output() searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe((searchText: string): void => {
      this.searchTextChanged.emit(searchText);
    });
  }

  onInputChange(event: any): void {
    this.searchSubject.next(event.target.value);
  }
}
