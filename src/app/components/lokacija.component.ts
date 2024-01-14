import { Component } from "@angular/core";

@Component({
  selector: "app-lokacija",
  template: `<iframe
  width="100%"
  frameBorder="0"
  title="map"
  marginHeight="0"
  marginWidth="0"
  scrolling="no"
  style="height: 100vh;"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d793.470007628957!2d18.71575941820082!3d44.530092604614474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475952dc9e080af3%3A0x18c8635f5775c95!2sCiglana%2C%2075000%20Tuzla!5e1!3m2!1sen!2sba!4v1705265579403!5m2!1sen!2sba"
></iframe>`,
  standalone: true,
})
export class LokacijaComponent {}