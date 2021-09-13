import {Component, OnInit} from '@angular/core';
import {EventsService} from "../events.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  pageName = 'Upcoming Events';
  pageTitle = 'Events';

  allEventsArray = <any>[];
  eventsArray: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  filterDate: Date | undefined;
  filterCategory: string | undefined;
  filterActive: boolean | undefined;


  constructor(private eventsService: EventsService) {
  }

  ngOnInit(): void {
    this.eventsService.getEvents().subscribe();
    this.eventsService.getCategories().subscribe();
    this.eventsService.eventsArray.subscribe(data => {
      this.allEventsArray = data;
      this.eventsArray.next(data)
    });
  }

  filterEvents(eventType: string, date?: Date, categoryID?: string, available?: boolean) {
    this.eventsArray.next(this.allEventsArray);
    const currentEventsArray = this.eventsArray.value;
    const filteredArray = <any>[];
    if (eventType === 'available') {
      this.filterActive = available ? true : undefined;
    } else if (eventType === 'category') {
      this.filterCategory = categoryID != '' ? categoryID : undefined;
    } else if (eventType === 'date') {
      this.filterDate = date;
    }


    if (this.filterDate && !this.filterCategory && !this.filterActive) {
      currentEventsArray.forEach((event: any) => {
        const day = event['start'].split('/')[0];
        const month = parseInt(event['start'].split('/')[1]);
        const year = (event['start'].split('/')[2]).substr(0, event['start'].split('/')[2].indexOf(' '));

        const formattedDate = new Date(month + '/' + day + '/' + year);

        console.log(formattedDate, this.filterDate)
        if (formattedDate.getDay() == this.filterDate?.getDay() && formattedDate.getMonth() == this.filterDate?.getMonth() && formattedDate.getFullYear() == this.filterDate?.getFullYear()) {
          filteredArray.push(event);
        }
      })
      this.eventsArray.next(filteredArray);
    } else if (this.filterDate && this.filterCategory && !this.filterActive) {
      currentEventsArray.forEach((event: any) => {
        if (event['categoryTypeCode'] == this.filterCategory) {
          filteredArray.push(event);
        }
      })
      this.eventsArray.next(filteredArray);
    } else if (this.filterDate && this.filterCategory && this.filterActive) {
      currentEventsArray.forEach((event: any) => {
        if (event['categoryTypeCode'] == this.filterCategory) {
          filteredArray.push(event);
        }
      })
      this.eventsArray.next(filteredArray);
    } else if (!this.filterDate && this.filterCategory && !this.filterActive) {
      currentEventsArray.forEach((event: any) => {
        if (event['categoryTypeCode'] == this.filterCategory) {
          filteredArray.push(event);
        }
      })
      this.eventsArray.next(filteredArray);
    } else if (!this.filterDate && this.filterCategory && this.filterActive) {
      currentEventsArray.forEach((event: any) => {
        if (event['isSoldOut'] == false && event['categoryTypeCode'] == this.filterCategory) {
          filteredArray.push(event);
        }
      })
      this.eventsArray.next(filteredArray);
    } else if (!this.filterDate && !this.filterCategory && this.filterActive) {
      currentEventsArray.forEach((event: any) => {
        if (event['isSoldOut'] == false) {
          filteredArray.push(event);
        }
      })
      this.eventsArray.next(filteredArray);
    } else if (!this.filterDate && !this.filterCategory && !this.filterActive) {
      this.eventsArray.next(this.allEventsArray);
    }
  };


}
