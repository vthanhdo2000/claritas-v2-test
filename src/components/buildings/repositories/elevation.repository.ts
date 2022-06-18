import { EntityRepository, Repository } from 'typeorm';
import { Elevation } from '../entities/elevation.entity';

@EntityRepository(Elevation)
export class ElevationRepository extends Repository<Elevation> {}
