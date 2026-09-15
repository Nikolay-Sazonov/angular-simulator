import { Color } from '../enums/Color';
import { Component, inject } from '@angular/core';
import { HikeCard } from '../app/interfaces/HikeCard';
import { FormsModule } from '@angular/forms';
import { DestinationsCard } from '../app/interfaces/DestinationsCard';
import { ImpressionCard } from '../app/interfaces/ImpressionCards';
import { MessageManagementService } from '../app/servis/message-management.service';
import { LocalStorageService } from '../app/servis/local-storage.service';


@Component({
  selector: 'app-home-page',
  imports: [FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  messageService:MessageManagementService = inject(MessageManagementService);
   LocalStorageService: LocalStorageService = inject(LocalStorageService);
   
  locationTour: string = '';
  dataTrip!: string;
  numberParticipants: string = '';
  
  hikecards: HikeCard[] = [
    {
       id: 1,
       image: '/images/icon/opt-guide.svg',
       name: 'Опытный гид',
       description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 2,
      image: '/images/icon/safe-hiking.svg',
      name: 'Безопасный поход',
      description:'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 3,
      image: '/images/icon/loyal-prices.svg',
      name: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    }
  ]
 
   destinationsCards: DestinationsCard[] = [
    {
      id: 1,
      backgroundImage: '/images/photo/lake-near-the-mountains.svg',
      estimationImage:'/images/icon/lake-rating.svg',
      titel:'Озеро возле гор',
      description:'романтическое приключение' ,
      price: 480,
    },
    {
      id: 2,
      backgroundImage: '/images/photo/night-in-mountains.svg',
      estimationImage:'/images/icon/rating-of-night-mountains.svg',
      titel:'Ночь в горах',
      description:'в компании друзей' ,
      price:500,
    },
    {
      id: 3,
      backgroundImage: '/images/photo/stretching-in-mountains.svg',
      estimationImage:'/images/icon/mountain-climbing-rating.svg',
      titel:'Растяжка в горах',
      description:'для тех, кто заботися о себе',
      price: 230,
    }
  ]
 
  impressionCards: ImpressionCard[] = [
    {
      id: 1,
      image: '/images/photo/city-in-the-mountains.svg',
      titel:'Красивая Италя, какая она в реальности?',
      description:'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 2,
      image: '/images/photo/aircraft-wing.svg',
      titel:'Долой сомнения! Весь мир открыт для вас!',
      description:'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...'
    },
    {
      id: 3,
      image: '/images/photo/woman-on-the-street.svg',
      titel:'Как подготовиться к путешествию в одиночку?',
      description:'Для современного мира базовый вектор развития предполагает.'
    },
    {
      id: 4,
      image: '/images/photo/mosque-in-India.svg',
      titel:'Индия ... летим?',
      description:'Для современного мира базовый.'
    }
  ]
 
  constructor() {

  }
 
  isPrimaryColor(selectedСolor: Color): boolean {
    if(selectedСolor === Color.BLUE || selectedСolor === Color.GREEN || selectedСolor === Color.RED) {
      return true;
    } else {
      return false;
    }
  }
}
