import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

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
}
