import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  sprat = 'prizemlje-prvi-sprat'

  meta = inject(Meta)

  constructor() {
    this.meta.addTags([{
      name: 'og:image',
      content: 'https://aludinstyle.com/parkview/assets/Logo%20i%20Podloga.png'
    }]);
  }
}
