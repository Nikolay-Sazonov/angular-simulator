import { Color } from '../enums/Color';
import { Component } from '@angular/core';
import { Collection } from '../collection';
import './training';
import { HikeCard } from './interfaces/HikeCard';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
    
  locationTour: string = '';
  dataTrip: string = '';
  numberParticipants: string='';
  
  companyName: string = 'румтибет';
  
  hikecards: HikeCard[] = [
    {
      id: 1,
      image: "/images/icon/opt-guide.svg",
      name: "Опытный гид",
      description: "Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации."
    },
    {
      id: 2,
      image: "/images/icon/safe-hiking.svg",
      name: "Безопасный поход",
      description:"Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации."
    },
    {
      id: 3,
      image: "/images/icon/loyal-prices.svg",
      name: "Лояльные цены",
      description: "Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации."
    }
  ]

  constructor() {
    this.saveLastCount();
    this.saveVisitcount();
  }

  isPrimaryColor(selectedСolor: Color): boolean {
    if(selectedСolor === Color.BLUE || selectedСolor === Color.GREEN || selectedСolor === Color.RED) {
      return true;
    } else {
      return false;
    }
  }
  
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
}
