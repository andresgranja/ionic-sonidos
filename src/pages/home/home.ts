import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ANIMALES } from '../../data/data.animales';
import { animal } from '../../interfaces/animal.interface';
import { Refresher, reorderArray } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales: animal[] = [];
  audio = new Audio();
  audioTiempo: any;
  ordenando: boolean = false;
  
  constructor(public navCtrl: NavController) {
    this.animales = ANIMALES.slice(0);
  }

  reproducir(animal: animal) {

    this.pausar_audio(animal);

    if (animal.reproduciendo == true) {
      animal.reproduciendo = false;
      return;
    }

    console.log(animal);

    this.audio.src = animal.audio;

    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;

    this.audioTiempo = setTimeout(() => animal.reproduciendo = false, animal.duracion * 1000);
  }

  private pausar_audio(animalSel: animal) {
    clearTimeout(this.audioTiempo);
    this.audio.pause();
    this.audio.currentTime = 0;

    for (let animal of this.animales) {

      if (animal.nombre != animalSel.nombre) {
        animal.reproduciendo = false;
      }
    }
  }

  borrar_animal(idx: number) {
    this.animales.splice(idx, 1);
  }

  recargar_animales(refresher: Refresher) {
    setTimeout(() => {
      this.animales = ANIMALES.slice(0);
      refresher.complete();
    }, 1000);
  }

  reordenar_animales(indice: any) {
    this.animales = reorderArray(this.animales, indice);
  }

}
