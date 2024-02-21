import {Component, EventEmitter, Output} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {debounceTime, Subject} from "rxjs";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
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
