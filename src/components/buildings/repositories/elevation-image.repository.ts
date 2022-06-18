import { ElevationImage } from './../entities/elevation-image.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ElevationImage)
export class ElevationImageRepository extends Repository<ElevationImage> {}
