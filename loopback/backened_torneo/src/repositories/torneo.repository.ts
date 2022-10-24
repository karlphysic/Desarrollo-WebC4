import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Torneo, TorneoRelations, Equipo} from '../models';
import {EquipoRepository} from './equipo.repository';

export class TorneoRepository extends DefaultCrudRepository<
  Torneo,
  typeof Torneo.prototype.id,
  TorneoRelations
> {

  public readonly equipos: HasManyRepositoryFactory<Equipo, typeof Torneo.prototype.id>;

  constructor(
    @inject('datasources.MongoDb') dataSource: MongoDbDataSource, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>,
  ) {
    super(Torneo, dataSource);
    this.equipos = this.createHasManyRepositoryFactoryFor('equipos', equipoRepositoryGetter,);
    this.registerInclusionResolver('equipos', this.equipos.inclusionResolver);
  }
}
