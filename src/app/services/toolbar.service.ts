import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  constructor() {
  }

  private _title$: BehaviorSubject<string> = new BehaviorSubject<string>('Dein Link - In Kurzform');

  get title$(): BehaviorSubject<string> {
    return this._title$;
  }

  setTitle(value: string) {
    this._title$.next(value);
  }
}
