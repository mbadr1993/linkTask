import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public userName = 'Mohamed Zain';

  constructor() {
  }

  ngOnInit(): void {
  }

}
