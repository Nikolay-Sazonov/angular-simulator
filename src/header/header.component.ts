import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../app/servis/local-storage.service';
import { MainLink } from '../app/interfaces/MainLink';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [NgClass, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

   LocalStorageService: LocalStorageService = inject(LocalStorageService);

   valueTimeDate!: string;
  timeUpdate!: any;
  writtenText!: string;
  companyName: string = 'румтибет';
  isLoading: boolean = false;
  changingValue: boolean = true;
  numberClicks: number = 0;

  mainLink: MainLink [] = [
    {
      name:'Главная',
      link: '/'
    },
    {
      name:'Пользователи',
      link: '/users'
    }
  ]

 constructor() {
    this.saveVisitcount();
    this.timeOutput();

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  ngOnDestroy(): void {
  if (this.timeUpdate) {
    clearInterval(this.timeUpdate); 
  }
}

  subtraction() {
    if(this.numberClicks > 0) {
      this.numberClicks -= 1;
    }
  }
  
  addition() {
    this.numberClicks += 1;
  }
  
  switchingTasks() {
    this.changingValue = !this.changingValue; 
  }
  
  private saveVisitcount(): void {
    const savedCount = this.LocalStorageService.get<number>('visitCount') ?? 0;
    const newCount = savedCount + 1;
    this.LocalStorageService.set('visitCount', newCount);
  }

  private timeOutput():void {
    this.valueTimeDate = new Date().toLocaleString('ru-RU');
    this.timeUpdate  = setInterval (() => {
      this.valueTimeDate = new Date().toLocaleString('ru-RU');
    },1000)
  }
 
}
