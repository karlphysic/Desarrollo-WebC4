import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Equipo, EquipoRelations, Jugador} from '../models';
import {JugadorRepository} from './jugador.repository';

export class EquipoRepository extends DefaultCrudRepository<
  Equipo,
  typeof Equipo.prototype.id,
  EquipoRelations
> {

  public readonly jugadors: HasManyRepositoryFactory<Jugador, typeof Equipo.prototype.id>;

  constructor(
    @inject('datasources.MongoDb') dataSource: MongoDbDataSource, @repository.getter('JugadorRepository') protected jugadorRepositoryGetter: Getter<JugadorRepository>,
  ) {
    super(Equipo, dataSource);
    this.jugadors = this.createHasManyRepositoryFactoryFor('jugadors', jugadorRepositoryGetter,);
    this.registerInclusionResolver('jugadors', this.jugadors.inclusionResolver);
  }
}
