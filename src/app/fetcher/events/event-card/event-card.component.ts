import {Component, Input, OnInit} from '@angular/core';
import {EventsService} from "../events.service";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() description: string | undefined;
  @Input() soldOut: string | undefined;
  @Input() location: string | undefined;
  @Input() imageUrl: string | undefined;
  @Input() date: string | undefined;
  @Input() categoryId: string | undefined;
  day: string | undefined;
  month: string | undefined;
  year: string | undefined;
  formattedDate: Date | undefined;
  category: string | undefined;
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


  constructor(private listService: EventsService) {
  }

  ngOnInit(): void {
    if (this.date) {
      const day = this.date?.split('/')[0];
      const month = parseInt(this.date?.split('/')[1]);
      const year = (this.date?.split('/')[2]).substr(0, this.date?.split('/')[2].indexOf(' '));

      this.formattedDate = new Date(month + '/' + day + '/' + year);
      this.day = day;
      this.month = this.monthNames[month - 1];
      this.year = this.formattedDate.getFullYear().toString();
    }

    this.listService.categories.subscribe((data: any) => {
      for (const categoryKey of data) {
        if (categoryKey['categoryId'] == this.categoryId) {
          this.category = categoryKey['categoryName'];
          console.log(categoryKey['categoryName'],this.category);
        }
      }
    })
  }
}
