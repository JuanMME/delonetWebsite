import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'classFilter'
})

export class ClassFilterPipe implements PipeTransform {
  transform(items: any[], option: number): any[] {
    if (!items) {
      return [];
    }
    if (!option) {
      return items;
    }
    if (option === 1) {
      return items.filter( it => {
        if (it.nombre === 'Natación Infantil') {
          return true;
        }
      });
    } else if (option === 2) {
      return items.filter( it => {
        if (it.nombre === 'Natación Iniciación') {
          return true;
        }
      });
    } else if (option === 3) {
      return items.filter( it => {
        if (it.nombre === 'Natación Avanzada') {
          return true;
        }
      });
    } else if (option === 4) {
      return items.filter( it => {
        if (it.nombre === 'Espalda') {
          return true;
        }
      });
    } else if (option === 5) {
      return items.filter( it => {
        if (it.nombre === 'Aquagym') {
          return true;
        }
      });
    }
  }
}
