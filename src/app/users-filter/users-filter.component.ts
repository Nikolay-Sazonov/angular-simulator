import { Component, EventEmitter, Output, DestroyRef, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent {

  private destroyRef = inject(DestroyRef);
  
  @Output() searchChange = new EventEmitter<string>();

  constructor() {
    this.searchControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((value: string) => {
      this.searchChange.emit(value);
    });
  }

  searchControl = new FormControl ('', {nonNullable: true});

}
