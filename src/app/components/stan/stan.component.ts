import { CommonModule } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { stanovi } from './stanovi'
import { Meta, Title } from "@angular/platform-browser";

const generateWebsiteMeta = (sprat: string, stan: string) => {
  const room = stanovi[sprat][stan];
  if (!room) {
    return {}
  }

  const roomSizes = room.kvadrature;

  // Calculate total area
  const totalArea = roomSizes.find((room: any) => room.name === 'UKUPNE POVRSINE')?.size || 0;

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
    `${soban} stan na ${spratu} sa ukupnom površinom od ${totalArea.toFixed(2)} m²`
  const metaDescription = `${title}. ${
    roomDescriptions.length > 0 ? `Prostorije: ${roomDescriptions}.` : ''
  }`;

  return {
    title,
    metaDescription
  };
}

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
    const { title, metaDescription } = generateWebsiteMeta(sprat, stan)
    const pageTitle = title ?? 'Ciglana Park View';
    this.title.setTitle(pageTitle);
    this.meta.addTag({ name: 'title', content: 'Ciglana Park View | ' + pageTitle });
    this.meta.addTag({ name: 'description', content: pageTitle });

    const info = stanovi[sprat].find((s: any) => s.stan === stan)
    const ignoreSums = ['SAMO STAN', 'UKUPNE POVRSINE']

    return {
      img: `assets/stanovi/${sprat}/${stan}/Stan ${stan}.jpg`,
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
}
