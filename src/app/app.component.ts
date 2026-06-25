import { Color } from '../enusm/Color';
import { Component } from '@angular/core';
import './training';


@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
    
    isPrimaryColor(selectedСolor: Color): boolean {
      if(selectedСolor === Color.BLUE || selectedСolor === Color.GREEN || selectedСolor === Color.RED) {
        return true;
      } else {
        return false;
      }
  }

  // Далее создать метод, которая сохраняет в локальное хранилище дату последнего захода на страницу. 
  
  private saveLastCount(): void {
    const currentDate = new Date ().toLocaleString();
    localStorage.setItem('lastDate', currentDate );
  }

  private saveVisitcount(): void {
    const savedCount = localStorage.getItem('visitCount');
    const currentNumberVisit = savedCount ? parseInt (savedCount, 10) : 0 ;
    const newCount = currentNumberVisit + 1;
    localStorage.setItem('visitCount', newCount.toString());
  }

  constructor() {
    this.saveLastCount();
    this.saveVisitcount();
  }
}
