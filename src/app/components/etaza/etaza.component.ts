import { Component, HostListener, Input, computed } from '@angular/core';
import { IStan, stanovi } from '../stan/stanovi';
import { signal } from '@angular/core'
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

const soban = {
  '1': 'Jednosoban',
  '2': 'Dvosoban',
  '3': 'Trosoban',
  '4': 'Cetvorosoban',
}

@Component({
  selector: 'app-stanovi-etaza',
  standalone: true,
  templateUrl: './etaza.component.html',
  styleUrls: ['./etaza.component.scss'],
  imports: [
    CommonModule,
    RouterLink
  ],
})
export class EtazaStanoviComponent {

  @Input() set sprat(value: string) {
    this.sprat$.set(value);
  }

  showSmallTable = false

  @Input()
  noTitle = false;

  type = computed(() => this.sprat$() === 'suteren' ? 'garaza' : 'stan')

  sprat$ = signal<string>('prizemlje');
  spratLabel$ = computed(() => this.spratMap[this.sprat$()])
  stanovi$ = computed(() => stanovi[this.sprat$()])

  stanoviKeys = ['suteren', 'prizemlje', '1', '2', '3']

  spratMap = {
    'suteren': 'Suteren',
    'prizemlje': 'Prizemlje',
    '1': 'Sprat I',
    '2': 'Sprat II',
    '3': 'Sprat III',
  }

  soban = soban;

  constructor() {
    this.onResize(null)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.showSmallTable = window?.innerWidth < 768
  }
}