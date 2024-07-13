import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, computed, inject, signal } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { InjectionToken } from '@angular/core';


// define custom global variables here
declare var particlesJS: any;

export const WINDOW = new InjectionToken<Window>('WindowToken', {
  factory: () => {
    if(typeof window !== 'undefined') {
      return window
    }
    return new Window()
  }
})

@Component({
  selector: 'cpv-header',
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
    <div class="hamburger">
      <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none">
        <path d="M4 18L20 18" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
        <path d="M4 12L20 12" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
        <path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
    <div class="inner-menu" [ngClass]="{'open': openMenu()}">
      <a class="menu-item" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
      <a class="menu-item"
        [routerLink]="['stanovi']"
        routerLinkActive="active">Ponuda stanova</a>
      <a class="menu-item"
        [routerLink]="['lokacija']"
        routerLinkActive="active">Lokacija</a>
    </div>
  </menu>
  `,
  standalone: true,
  styleUrls: ['./header.component.scss'],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
})
export class HeaderComponent implements AfterViewInit {
  elRef = inject(ElementRef<HTMLDivElement>)
  platformId = inject(PLATFORM_ID)
  router = inject(Router)
  window = inject(WINDOW)

  readonly isMenuOpen$ = signal(false)

  readonly openMenu = computed(() => {
    return this.isMenuOpen$() || this.window?.innerWidth > 900
  })

  toggleMenu() {
    this.isMenuOpen$.set(!this.isMenuOpen$())
  }

  @HostBinding('attr.id')
  id = 'app-header-id'

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      particlesJS.load('header-bg1', 'assets/particlesjs-config.json', function () {
        console.log('callback - particles.js config loaded');
      });

      this.router.events.subscribe(() => {
        this.isMenuOpen$.set(false)
      });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: PointerEvent) {
    const menuEl: any = this.elRef.nativeElement?.querySelector('menu');
    const clickedInside: boolean = menuEl.contains(event.target);
    this.isMenuOpen$.set(clickedInside && !this.isMenuOpen$())
  }
}
