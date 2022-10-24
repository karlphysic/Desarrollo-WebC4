import {Entity, model, property, hasMany} from '@loopback/repository';
import {Jugador} from './jugador.model';

@model()
export class Equipo extends Entity {
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
  NombreEquipo: string;

  @property({
    type: 'string',
    required: true,
  })
  NumeroJugadores: string;

  @property({
    type: 'string',
    required: true,
  })
  Entrenador: string;

  @property({
    type: 'string',
    required: true,
  })
  Escudo: string;

  @hasMany(() => Jugador)
  jugadors: Jugador[];

  @property({
    type: 'string',
  })
  transporteId?: string;

  @property({
    type: 'string',
  })
  alojamientoId?: string;

  @property({
    type: 'string',
  })
  torneoId?: string;

  constructor(data?: Partial<Equipo>) {
    super(data);
  }
}

export interface EquipoRelations {
  // describe navigational properties here
}

export type EquipoWithRelations = Equipo & EquipoRelations;
