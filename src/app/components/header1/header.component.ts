import { AfterViewInit, Component, ElementRef, HostBinding, inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';


// define custom global variables here
declare var particlesJS: any;

@Component({
  selector: 'cpv-header-1',
  template: `
  <div class="header" id="header-bg">
    <div class="header-bg1" id="header-bg1"></div>
    <div class="inner-header">
      <div class="header__left">
        <img src="assets/Logo i Podloga.png" alt="logo" />
        <div class="header__left_bg"></div>
        <div class="header__left_text">
          <p style="font-size: 1.2rem; font-weight: 100; letter-spacing: 0.2rem">Stambeni Objekat</p>
          <h1>Ciglana Park View
            <p style="font-size: 1.2rem; font-weight: 100; letter-spacing: 0.2rem; margin-top: 8px; font-family: 'Roboto Flex';">Slavinovici, Tuzla</p>
          </h1>
          <h2 class="phone">
            <a href="tel:+38735316900">+387 35 316 900</a>
          </h2>
        </div>
      </div>
      <div class="header__title">
        <img src="assets/header-zgrada.png" alt="zgrada" />
      </div>
    </div>
  </div>

  <menu>
    <div class="inner-menu">
      <a class="menu-item" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
      <a class="menu-item"
        [routerLink]="['stanovi']"
        routerLinkActive="active">Ponuda stanova</a>
      <a class="menu-item"
        [routerLink]="['lokacija']"
        routerLinkActive="active">Lokacija</a>
      <!-- <a class="menu-item"
        [routerLink]="['stanovi']"
        routerLinkActive="active">Stanovi</a> -->
    </div>
  </menu>
  `,
  standalone: true,
  styleUrls: ['./header.component.scss'],
  imports: [
    RouterLink,
    RouterLinkActive
  ]
})
export class HeaderComponent1 implements AfterViewInit {
  elRef = inject(ElementRef)
  platformId = inject(PLATFORM_ID)

  @HostBinding('attr.id')
  id = 'app-header-id'

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      particlesJS.load('header-bg1', 'assets/particlesjs-config.json', function () {
        console.log('callback - particles.js config loaded');
      });
    }
  }
}