import { Component, computed } from '@angular/core';
import { stanovi } from '../stan/stanovi';
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
  selector: 'app-stanovi-page',
  standalone: true,
  templateUrl: './stanovi.component.html',
  styleUrls: ['./stanovi.component.scss'],
  imports: [
    CommonModule,
    RouterLink
  ],
})
export class StanoviComponent {
  stanovi = signal(stanovi);
  stanoviKeys = ['prizemlje', '1', '2', '3']

  spratMap = {
    'prizemlje': 'Prizemlje',
    '1': 'Sprat I',
    '2': 'Sprat II',
    '3': 'Sprat III',
  }

  soban = soban;
}