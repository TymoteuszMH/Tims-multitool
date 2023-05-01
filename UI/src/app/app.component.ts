import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { LoginDataService } from './services/logindata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'UI';
  islogged = false;
  
  /*
  @checked: checking setted language for site
  @language: getting checked language if language is set if it's not set returns english as default
  @useLanguage: changing language for site
  */
  checked = {en:localStorage.getItem('language')=='en' ? true:false,
             pl:localStorage.getItem('language')=='pl'? true:false}
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

  ngDoCheck(){
    if(LoginDataService.logged=='1')
      this.islogged = true;
    else
      this.islogged = false;
  }
}
