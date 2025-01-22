import { CommonModule } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { IStan, stanovi } from './stanovi'
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "app-stan-page",
  standalone: true,
  templateUrl: "./stan.component.html",
  styleUrls: ["./stan.component.scss"],
  imports: [
    RouterModule,
    CommonModule,
  ],
})
export class StanComponent {
  activeRoute = inject(ActivatedRoute)
  title = inject(Title)
  meta = inject(Meta)

  stan = signal<{stan: any, sprat: any}>({
    stan: null,
    sprat: 'prizemlje'
  });

  type = computed(() => {
    const { sprat } = this.stan()
    return sprat === 'suteren' ? 'garaza' : 'stan'
  })

  details = computed(() => {
    let { stan, sprat } = this.stan()
    sprat = (sprat as string).toLowerCase() === 'p' ? 'prizemlje' : sprat
    const { title, description } = this.generateWebsiteMeta(sprat, stan)
    const pageTitle = 'Ciglana Park View | ' + (title ?? 'Ciglana Park View');
    const pageDescription = description ?? 'Ciglana Park View';
    this.title.setTitle(pageTitle);
    this.meta.addTag({ name: 'title', content: 'Ciglana Park View | ' + pageTitle });
    this.meta.addTag({ name: 'description', content: pageDescription });
    this.meta.addTag({ name: 'og:title', content: pageTitle });
    this.meta.addTag({ name: 'og:description', content: pageDescription });
    this.meta.addTag({ name: 'og:url', content: 'https://aludinstyle.com/parkview/' });
    this.meta.addTag({ name: 'twitter:title', content: pageTitle });
    this.meta.addTag({ name: 'twitter:description', content: pageDescription });
    this.meta.addTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.addTag({ name: 'twitter:url', content: 'https://aludinstyle.com/parkview/' });


    const info = stanovi[sprat].find((s: any) => s.stan === stan)
    const ignoreSums = ['SAMO STAN', 'UKUPNE POVRSINE']

    const ext = 'svg' // ['prizemlje', '1', '3'].includes(sprat) ? 'svg' : 'jpg'

    const img = `assets/stanovi/${sprat}/${stan}/` + (info?.img || `Stan ${stan}.${ext}`)

    return {
      img,
      povrsina: info?.povrsina,
      info: {
        ...(info || {}),
        kvadrature: info?.kvadrature
          .filter((k: any) => !ignoreSums.includes(k.name))
          .filter((k: any) => !!k.size)
      },
      title,
    }
  })

  napalativa = computed(() => {
    const { povrsina }= this.details().info as any;
    return povrsina.stan + povrsina.terasa * 0.5 + povrsina.lodja * 0.75
  })

  constructor() {
    this.activeRoute.params.subscribe((params: any) => {
      this.stan.set(params)
    })
  }

  generateWebsiteMeta(sprat: string, stan: string) {
    const level = stanovi[sprat];
    if (!level) {
      return {}
    }

    const room = level.find((s: any) => s.stan === stan) as IStan;
  
    const roomSizes = room.kvadrature;
  
    // Calculate total area
    const totalArea = room.povrsina.ukupno || 0;
  
    const roomNum = room.brojSoba;
  
    const soban = {
      '1': 'Jednosoban',
      '2': 'Dvosoban',
      '3': 'Trosoban',
      '4': 'Cetvorosoban',
    }[roomNum];
  
    const spratu = {
      'suteren': 'suterenu',
      'prizemlje': 'prizemlju',
      '1': 'prvom spratu',
      '2': 'drugom spratu',
      '3': 'trecem spratu',
    }[sprat];
  
    // Generate individual room descriptions
    const roomDescriptions = roomSizes
      .filter((room: any) => room.size !== null)
      .map((room: any) => `${room.name}: ${room.size} m²`)
      .join(', ');

    const title = sprat === 'suteren' ?
      `Garaza ${stan} u ${spratu} sa površinom od ${totalArea.toFixed(2)} m²` :
      `${soban} stan na ${spratu} sa ukupnom površinom od ${totalArea.toFixed(2)} m²`;

    const description = `${title}. ${
      roomDescriptions.length > 0 ? `Prostorije: ${roomDescriptions}.` : ''
    }`;
  
    return {
      title,
      description
    };
  }
}
