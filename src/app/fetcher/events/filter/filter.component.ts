import {Component, OnInit, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {EventsService} from "../events.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  availableTicketsChecker = false;
  categories: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  @ViewChild('dateInput', {static: false}) dateInput: ElementRef | undefined;
  @ViewChild('categorySelect', {static: false}) categorySelect: ElementRef | undefined;
  @Output() availableTickets = new EventEmitter<boolean>();
  @Output() categorySelected = new EventEmitter<string>();
  @Output() dateSelected = new EventEmitter<Date>();

  constructor(private listService: EventsService) {
  }

  ngOnInit(): void {
    this.listService.categories.subscribe(data => {
      const cat = <any>[];
      for (const item of data) {
        cat.push(item);
      }
      this.categories.next(cat);
    })
  }

  filterAvailable() {
    if (this.availableTicketsChecker) {
      this.availableTicketsChecker = false;
      this.availableTickets.emit(false);
    } else {
      this.availableTicketsChecker = true;
      this.availableTickets.emit(true);
    }
  }

  filterCategory() {
    this.categorySelected.emit(this.categorySelect?.nativeElement.value);
  }

  filterDate() {
    this.dateSelected.emit(this.dateInput?.nativeElement.value != '' ? new Date(this.dateInput?.nativeElement.value) : undefined);
  }
}
