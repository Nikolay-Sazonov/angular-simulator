import { Component, inject, OnDestroy,  } from '@angular/core';
import { MessageManagementService } from './servis/message-management.service';
import { LocalStorageService } from './servis/local-storage.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MessegeComponent } from '../message/message.component';
import { LoaderService } from './servis/loader.service';
import { LoaderComponent } from "../loader/loader.component";


@Component({
  selector: 'app-root',
  imports: [FooterComponent, HeaderComponent, RouterOutlet, MessegeComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {

  messageService:MessageManagementService = inject(MessageManagementService);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  loaderService: LoaderService = inject(LoaderService);
  

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

showLoaderTest() {
  this.loaderService.showLoader();
  setTimeout(() => {
    this.loaderService.hideLoader();
  }, 3000);
}
  
  private saveVisitcount(): void {
    const savedCount = this.localStorageService.get<number>('visitCount') ?? 0;
    const newCount = savedCount + 1;
    this.localStorageService.set('visitCount', newCount);
  }

  private timeOutput():void {
    this.valueTimeDate = new Date().toLocaleString('ru-RU');
    this.timeUpdate  = setInterval (() => {
      this.valueTimeDate = new Date().toLocaleString('ru-RU');
    },1000)
  }

}
