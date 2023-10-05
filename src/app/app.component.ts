import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Subject, filter, fromEvent, map, take, takeUntil } from 'rxjs';
import { AppService } from './app.service';

// Declare custom global variables here
declare var Swiper: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  sprat = 'prizemlje-prvi-sprat'

  ngAfterViewInit(): void {
    // const swiper = new Swiper('.swiper', {
    //   // Optional parameters
    //   direction: 'horizontal',
    //   loop: true,
    
    //   // If we need pagination
    //   pagination: {
    //     el: '.swiper-pagination',
    //   },
    
    //   // Navigation arrows
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //   },
    
    //   // And if we need scrollbar
    //   scrollbar: {
    //     el: '.swiper-scrollbar',
    //   },
    // });
    // Object.assign(window, { swiper });
  }
}
