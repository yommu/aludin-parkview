import { stanovi as prizemlje } from './prizemlje'
import { stanovi as prvi } from './1'
import { stanovi as drugi } from './2'
import { stanovi as treci } from './3'
import { stanovi as suteren } from './suteren'

export interface IStan {
  name: string;
  brojSoba: number;
  m2: number;
  stan: string;
  kvadrature: any[];
  povrsina: {
    stan: number;
    terasa: number;
    lodja: number;
    ukupno: number;
  };
  stanje: 'slobodan' | 'rezervisan' | 'prodat';
}

const cleanUp = (sprat: any[]) => {
  return sprat.map(s => {
    const ignoreSums = ['SAMO STAN', 'TERASA', 'LOĐA', 'UKUPNE POVRSINE']
    const sum = s.kvadrature
      .filter((k: any) => !ignoreSums.includes(k.name))
      .filter((k: any) => !!k.size)
      .reduce((acc: number, curr: any) => acc + curr.size, 0)

    const povrsina = {
      stan: Math.round(sum * 100) / 100,
      terasa: s.kvadrature.find((room: any) => room.name === 'TERASA')?.size || 0,
      lodja: s.kvadrature.find((room: any) => room.name === 'LOĐA')?.size || 0,
      ukupno: 0
    }
    povrsina.ukupno = povrsina.stan + povrsina.terasa + povrsina.lodja

    return {
      ...s,
      povrsina,
      kvadrature: s.kvadrature.filter((k: any) => !!k.size)
    }
  })
}

export const stanovi: {[key: string]: IStan[]} = {
  'suteren': cleanUp(suteren),
  'prizemlje': cleanUp(prizemlje),
  '1': cleanUp(prvi),
  '2': cleanUp(drugi),
  '3': cleanUp(treci),
}
