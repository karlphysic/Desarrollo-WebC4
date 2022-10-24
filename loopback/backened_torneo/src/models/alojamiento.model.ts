import {Entity, model, property, hasMany} from '@loopback/repository';
import {Equipo} from './equipo.model';

@model()
export class Alojamiento extends Entity {
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
  NombreAlojamiento: string;

  @property({
    type: 'string',
    required: true,
  })
  Ubicacion: string;

  @property({
    type: 'string',
    required: true,
  })
  NumerodeHabitaciones: string;

  @hasMany(() => Equipo)
  equipos: Equipo[];

  constructor(data?: Partial<Alojamiento>) {
    super(data);
  }
}

export interface AlojamientoRelations {
  // describe navigational properties here
}

export type AlojamientoWithRelations = Alojamiento & AlojamientoRelations;
