import {Entity, model, property, hasOne} from '@loopback/repository';
import {Equipo} from './equipo.model';

@model()
export class Transporte extends Entity {
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
  NombreConductor: string;

  @property({
    type: 'string',
    required: true,
  })
  Matricula: string;

  @hasOne(() => Equipo)
  equipo: Equipo;

  constructor(data?: Partial<Transporte>) {
    super(data);
  }
}

export interface TransporteRelations {
  // describe navigational properties here
}

export type TransporteWithRelations = Transporte & TransporteRelations;
