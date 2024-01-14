import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, NgZone, PLATFORM_ID, ViewChild, effect, inject, signal } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Subject, fromEvent, takeUntil, take, filter, map } from 'rxjs';
import { AppService } from '../../app.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { EtazaStanoviComponent } from '../etaza/etaza.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';

const spratNameToParams: {
  [key: string]: {
    id: -1 | 0 | 1 | 2,
    title: string,
    sprat: string
  }
} = {
  'suteren': {
    id: -1,
    title: 'Suteren (Garaze)',
    sprat: 'suteren'
  },
  'prizemlje': {
    id: 0,
    title: 'Prizemlje',
    sprat: 'prizemlje'
  },
  '1': {
    id: 0,
    title: 'Prvi sprat',
    sprat: '1'
  },
  '2': {
    id: 1,
    title: 'Drugi sprat',
    sprat: '2'
  },
  '3': {
    id: 2,
    title: 'Treci sprat',
    sprat: '3'
  },
}

@Component({
  selector: 'app-sprat',
  templateUrl: './sprat.component.html',
  styleUrls: ['./sprat.component.scss'],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    EtazaStanoviComponent
  ],
  standalone: true,
})
export class SpratComponent {
  destroyed = new Subject<void>()
  platformId = inject(PLATFORM_ID)

  @ViewChild('svgContainer', { static: true })
  set svgContainer(value: ElementRef<HTMLDivElement>) {
    this.svgContainer$.set(value.nativeElement)
  }

  @ViewChild('mapContainer', { static: true })
  set mapContainer(value: ElementRef<HTMLDivElement>) {
    this.mapContainer$.set(value.nativeElement)
  }

  mapContainer$ = signal<HTMLDivElement | null>(null)
  svgContainer$ = signal<HTMLDivElement | null>(null)

  service: AppService = inject(AppService)
  zone: NgZone = inject(NgZone)
  changeRef: ChangeDetectorRef = inject(ChangeDetectorRef)
  router: Router = inject(Router)
  activeRoute: ActivatedRoute = inject(ActivatedRoute)

  svgHtml: SafeHtml = ''
  width: number = 0
  height: number = 0

  @Input()
  set sprat(sprat: string) {
    this.options = spratNameToParams[sprat as any]
    this.loadSvg(this.options.id)
  }

  options: {
    title: string,
    id: -1 | 0 | 1 | 2,
    sprat: string
  } = {
      title: '',
      id: 0,
      sprat: ''
    }

  _zone = inject(NgZone)

  constructor() {
    effect(() => this.listenClicksOnSvg())
  }

  loadSvg(svgId: -1 | 0 | 1 | 2 = 0) {
    const callback = res => {
      this.svgHtml = res.data;
      this.width = Number(res.width)
      this.height = Number(res.height)

      this.zone.onStable.pipe(
        take(1)
      ).subscribe(() => {
        this.scaleSvg()
      })

      this.changeRef.detectChanges()
      this.scaleSvg()
    }

    this.service.getSvg(svgId).pipe(
      take(1)
    ).subscribe((res) => callback(res))
  }

  @HostListener('window:resize')
  scaleSvg() {
    if (!isPlatformBrowser(this.platformId)) return

    const mapContainer = this.mapContainer$()
    const svgContainer = this.svgContainer$()

    if (!mapContainer || !svgContainer) {
      return
    }

    const svg = svgContainer.querySelector('svg') as SVGElement
    if (!svg) return

    const svgcontainer = mapContainer.querySelector('div') as HTMLDivElement
    if (svgcontainer) {
      svgcontainer.style.height = 'auto'
    }

    const { width, height } = mapContainer.getBoundingClientRect()

    // Scale svg to fit container
    const calcScale = Math.min(width / this.width, height / this.height)
    const maxScale = Math.min(1, calcScale)
    svg.style.transform = `scale(${maxScale})`

    const { width: svgw, height: svgh } = svg.getBoundingClientRect()
    const marginLeft = Math.max(0, (width - svgw) / 2)
    svg.style.marginLeft = `${marginLeft}px`

    if (svgcontainer) {
      svgcontainer.style.height = `${svgh}px`
    }
  }

  ngAfterViewInit(): void {
    this.activeRoute.params.subscribe((params) => {
      const sprat = params['sprat'] || 'prizemlje'
      this.options = spratNameToParams[sprat as any]
      this.loadSvg(this.options.id)
    })
  }

  listenClicksOnSvg() {
    fromEvent(this.mapContainer$() as HTMLElement, 'click').pipe(
      takeUntil(this.destroyed),
      filter((e: Event) => e.target instanceof SVGPathElement),
      map((e: Event) => e.target as SVGPathElement)
    ).subscribe((element: SVGPathElement) => {
      this.mapContainer$()?.querySelectorAll('path').forEach((el: SVGPathElement) => {
        el.classList.remove('active')
      })
      element.classList.add('active')
    })
  }

  ngOnDestroy(): void {
    this.destroyed.next()
    this.destroyed.complete()
  }
}
