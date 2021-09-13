import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  pageSize: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalRecordCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  eventsArray: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  categories: BehaviorSubject<[]> = new BehaviorSubject<[]>([]);



  constructor(private http: HttpClient) {
  }

  getEvents() {
    return this.http.get('https://api.npoint.io/b2036d5651b65d4f98e8/data').pipe(map((res: any) => {
      for (let resKey in res) {
        if (resKey === 'pageSize') {
          this.pageSize.next(res[resKey])
        }

        if (resKey === 'totalRecordCount') {
          this.totalRecordCount.next(res[resKey]);
        }

        if (resKey === 'eventList') {
          const eventsArray = [];
          for (let eventKey in res['eventList']) {
            eventsArray.push(res['eventList'][eventKey])
          }
          this.eventsArray.next(eventsArray);
        }
      }
    }))
  }


  getCategories() {
    return this.http.get('https://api.npoint.io/776b281b349100e09837/data').pipe(map((res: any) => {
      for (let resKey in res) {
        if (resKey === 'eventCategoryList') {
          this.categories.next(res[resKey])
        }
      }
    }))
  }
}
