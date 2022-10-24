import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Equipo} from './equipo.model';

@model()
export class Jugador extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Documento: string;

  @property({
    type: 'string',
    required: true,
  })
  EstadoCivil: string;

  @property({
    type: 'string',
    required: true,
  })
  NumeroJugador: string;

  @property({
    type: 'string',
    required: true,
  })
  Sexo: string;

  @property({
    type: 'string',
    required: true,
  })
  Posicion: string;

  @property({
    type: 'string',
    required: true,
  })
  Eps: string;

  @belongsTo(() => Equipo)
  equipoId: string;

  constructor(data?: Partial<Jugador>) {
    super(data);
  }
}

export interface JugadorRelations {
  // describe navigational properties here
}

export type JugadorWithRelations = Jugador & JugadorRelations;
