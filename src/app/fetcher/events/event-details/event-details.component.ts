import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventsService} from "../events.service";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  pageName = 'Event Details';
  eventID: string | undefined;
  event: any | undefined;

  constructor(private route: ActivatedRoute, private eventsService: EventsService) {
  }

  ngOnInit(): void {
    this.eventID = this.route.snapshot.params['eventId'];
    if (this.eventsService.eventsArray.value.length <= 0) {
      this.eventsService.getEvents().subscribe();
    }
    this.eventsService.eventsArray.subscribe(data => {
      for (const event of data) {
        if (event['eventId'] === this.eventID) {
          this.event = event;
        }
      }
    })
  }

}
