import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Jugador, JugadorRelations, Equipo} from '../models';
import {EquipoRepository} from './equipo.repository';

export class JugadorRepository extends DefaultCrudRepository<
  Jugador,
  typeof Jugador.prototype.id,
  JugadorRelations
> {

  public readonly equipo: BelongsToAccessor<Equipo, typeof Jugador.prototype.id>;

  constructor(
    @inject('datasources.MongoDb') dataSource: MongoDbDataSource, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>,
  ) {
    super(Jugador, dataSource);
    this.equipo = this.createBelongsToAccessorFor('equipo', equipoRepositoryGetter,);
    this.registerInclusionResolver('equipo', this.equipo.inclusionResolver);
  }
}
