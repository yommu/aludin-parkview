import { ChangeDetectorRef, Component, ElementRef, Input, NgZone, ViewChild, inject } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Subject, fromEvent, takeUntil, take, filter, map } from 'rxjs';
import { AppService } from '../../app.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import anime from 'animejs/lib/anime.es.js';

const spratNameToParams: {
  [key: string]: {
    id: 0 | 1 | 2,
    title: string
  }
} = {
  'prizemlje-prvi-sprat': {
    id: 0,
    title: 'Prizemlje i prvi sprat'
  },
  'drugi-sprat': {
    id: 1,
    title: 'Drugi sprat'
  },
  'treci-sprat': {
    id: 2,
    title: 'Treci sprat'
  },
}

@Component({
  selector: 'app-sprat',
  template: `
  <div class="map-container" #mapContainer>
  <div [innerHTML]="svgHtml" #svgContainer></div>
</div>`,
  standalone: true,
  imports: [
    HttpClientModule,
  ],
  styles: [`
  .map-container {
    position: relative;
    max-width: 1200px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0 auto;
  }`]
})
export class SpratComponent {
  destroyed = new Subject<void>()

  @ViewChild('svgContainer', { static: true })
  svgContainer: ElementRef<HTMLDivElement>

  @ViewChild('mapContainer', { static: true })
  mapContainer: ElementRef<HTMLDivElement>

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
    id: 0 | 1 | 2
  } = {
      title: '',
      id: 0
    }

  constructor() {
    this.activeRoute.params.subscribe((params) => {
      // const sprat = params['sprat']
      // this.options = spratNameToParams[sprat as any]
      // this.loadSvg(this.options.id)
    })

    fromEvent(window, 'resize')
      .pipe(
        takeUntil(this.destroyed)
      )
      .subscribe(_ => this.scaleSvg())
  }

  loadSvg(svgId: 0 | 1 | 2 = 0) {
    this.service.getSvg(svgId).pipe(
      take(1)
    ).subscribe((res) => {
      anime({
        targets: this.mapContainer.nativeElement,
        opacity: [1, 0],
        duration: 150,
        easing: 'easeInOutQuad',
        complete: () => {
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

          anime({
            targets: this.mapContainer.nativeElement,
            opacity: [0, 1],
            duration: 150,
            easing: 'easeInOutQuad',
          })

        }
      })
    })
  }

  scaleSvg() {
    const svg = this.svgContainer.nativeElement.querySelector('svg') as SVGElement
    if (!svg) return

    const { width, height } = this.mapContainer.nativeElement.getBoundingClientRect()

    // Scale svg to fit container
    const calcScale = Math.min(width / this.width, height / this.height)
    const maxScale = Math.min(1, calcScale)
    svg.style.transform = `scale(${maxScale})`

    const { width: svgw } = svg.getBoundingClientRect()
    const marginLeft = Math.max(0, (width - svgw) / 2)
    svg.style.marginLeft = `${marginLeft}px`
  }

  ngAfterViewInit(): void {
    this.scaleSvg()

    fromEvent(this.mapContainer.nativeElement, 'click').pipe(
      takeUntil(this.destroyed),
      filter((e: Event) => e.target instanceof SVGPathElement),
      map((e: Event) => e.target as SVGPathElement)
    ).subscribe((element: SVGPathElement) => {
      this.mapContainer.nativeElement.querySelectorAll('path').forEach((el: SVGPathElement) => {
        el.classList.remove('active')
      })
      element.classList.add('active')
      console.log('>>>', element.getAttribute('id'))
      element.scrollIntoView({ behavior: 'smooth' })
    })
  }

  ngOnDestroy(): void {
    this.destroyed.next()
    this.destroyed.complete()
  }
}