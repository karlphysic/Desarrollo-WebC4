import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Estadio, EstadioRelations, Torneo} from '../models';
import {TorneoRepository} from './torneo.repository';

export class EstadioRepository extends DefaultCrudRepository<
  Estadio,
  typeof Estadio.prototype.id,
  EstadioRelations
> {

  public readonly torneo: HasOneRepositoryFactory<Torneo, typeof Estadio.prototype.id>;

  constructor(
    @inject('datasources.MongoDb') dataSource: MongoDbDataSource, @repository.getter('TorneoRepository') protected torneoRepositoryGetter: Getter<TorneoRepository>,
  ) {
    super(Estadio, dataSource);
    this.torneo = this.createHasOneRepositoryFactoryFor('torneo', torneoRepositoryGetter);
    this.registerInclusionResolver('torneo', this.torneo.inclusionResolver);
  }
}
