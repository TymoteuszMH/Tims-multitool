import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Ng4LoadingSpinnerService]
})
export class AppComponent {
  title = 'UI';
  checked = {en:localStorage.getItem('language')=='en'? true:false, pl:localStorage.getItem('language')=='pl'? true:false}
  language = localStorage.getItem('language') ?? 'en';
  
  constructor(private titleService: Title, 
              private translate: TranslateService){
    this.titleService.setTitle($localize`${this.title}`);
    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('en');
    translate.use(this.language);
  }

  useLanguage(language: string): void {
    this.translate.use(language);
    localStorage.setItem('language', language)
  }
}
