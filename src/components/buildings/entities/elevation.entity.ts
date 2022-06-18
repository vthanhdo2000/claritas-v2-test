import { ElevationStatus } from './../constants/elevation-status.enum';
import { ElevationDirection } from './../constants/elevation-direction.enum';
import { Base } from 'src/common/entites/base.entity';
import { Column, Entity } from 'typeorm';

interface Image {
  order: number;
  url: string;
}

@Entity({ name: 'elevations' })
export class Elevation extends Base {
  @Column({ type: 'text', nullable: true, default: null })
  name: string;

  @Column({ type: 'int4', nullable: true, default: null })
  building_id: number;

  // @Column({
  //   type: 'enum',
  //   enum: ElevationDirection,
  //   default: ElevationDirection.RIGHT,
  // })
  // direction: ElevationDirection;

  @Column({ type: 'int' })
  direction: number;

  @Column({ type: 'int4', nullable: true, default: null })
  rows: number;

  @Column({ type: 'int4', nullable: true, default: null })
  columns: number;

  @Column({
    type: 'enum',
    enum: ElevationStatus,
    default: ElevationStatus.ACTIVE,
  })
  status: ElevationStatus;

  @Column({ type: 'json', default: null, nullable: true })
  images: Image[];
}
