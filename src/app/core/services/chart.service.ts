import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  //Pose la instancia de Chart para manipular el grafico
  //Al usarse varias instancias del componente se tiene que destruir antes de redibujar incluso para rutas distintas
  instance:Chart | undefined

  constructor() { }
}
