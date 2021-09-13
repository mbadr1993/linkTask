import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Languages} from './shared/constants/defins';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public direction: string | undefined;

  constructor(private translate: TranslateService,) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // Check if user use some language
    if (localStorage.getItem('lang')) {
      translate.use(<string>localStorage.getItem('lang'));
    } else {
      // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use('en');
      localStorage.setItem('lang', 'en');
    }
  }

  // Set website direction
  setDirection(currentLang: string) {
    this.translate.use(currentLang);
    this.direction = currentLang === Languages.en ? 'ltr' : currentLang === Languages.ar ? 'rtl' : 'error';
  }

  ngOnInit():void {
    this.setDirection(this.translate.currentLang);
  }
}
