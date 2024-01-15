import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-home-page",
  standalone: true,
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  imports: [
    CommonModule
  ],
})
export class HomeComponent {
  sprat = "prizemlje-prvi-sprat";
  
  constructor() {
    inject(Title).setTitle('Alu Din Styl d.o.o. | Ciglana Park View: Vas Novi Dom');
  }
}
