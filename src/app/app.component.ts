import { Color } from '../enums/Color';
import { Component } from '@angular/core';
import { Collection } from '../collection';
import './training';
import { HikeCard } from './interfaces/HikeCard';
import { FormsModule } from '@angular/forms';
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-root',
  imports: [FormsModule, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
    
  locationTour: string = '';
  dataTrip: string = '';
  numberParticipants: string ='';
  valueTimeDate: string = '';
  changingValue: boolean = true;
  numberClicks: number = 0;
  timeUpdate: any = '';
  companyName: string = 'румтибет';
  isLoading: boolean = true;
  writtenText: string = '';
  
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
    this.timeOutput()

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
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

  
  subtraction() {
    if(this.numberClicks >0) {
      this.numberClicks -= 1;
    }
  }
  
  addition() {
    this.numberClicks += 1;
  }
  
  switchingTasks() {
    this.changingValue = !this.changingValue; 
  }

  private timeOutput():void {
    this.valueTimeDate = new Date().toLocaleString('ru-RU');
    this.timeUpdate  = setInterval (() => {
      this.valueTimeDate = new Date().toLocaleString('ru-RU');
    },1000)
  }

}
