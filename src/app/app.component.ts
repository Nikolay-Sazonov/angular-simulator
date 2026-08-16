import { Component, inject, OnDestroy } from '@angular/core';
import { MessageManagementService } from './servis/message-management.service';
import { LocalStorageService } from './servis/local-storage.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-root',
  imports: [FooterComponent, HeaderComponent, RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {

  messageService:MessageManagementService = inject(MessageManagementService);
  LocalStorageService: LocalStorageService = inject(LocalStorageService);
  

  valueTimeDate!: string;
  timeUpdate!: any;
  writtenText!: string;
  isLoading: boolean = false;
  changingValue: boolean = true;

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
