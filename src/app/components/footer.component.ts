import { Component } from "@angular/core";

@Component({
  selector: "cpv-footer",
  standalone: true,
  template: `<div>Alu Din Styl d.o.o. Tuzla, 2024</div> <a href="mailto:aludinstyl@hotmail.com">aludinstyl&#64;hotmail.com</a>`,
  styles: [`:host {
    display: flex;
    flex-direction: column;
    padding: 14px 2px;
    justify-content: center;
    align-items: center;
    background-color: #5a4a3ce6;
    color: white;
  }
  a {
    color: white;
  }`],
})
export class FooterComponent {}