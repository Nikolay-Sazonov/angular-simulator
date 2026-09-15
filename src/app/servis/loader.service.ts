import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isLoader = new BehaviorSubject<boolean> (false);
  loader$: Observable<boolean> = this.isLoader.asObservable();

  showLoader() {
    this.isLoader.next(true);
  };

  hideLoader() {
    this.isLoader.next(false);
  }
}
