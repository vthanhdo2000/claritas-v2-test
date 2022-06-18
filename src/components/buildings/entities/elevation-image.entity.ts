import { Base } from 'src/common/entites/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({ name: 'elevation_images' })
@Index(['elevation_id', 'order'], { unique: true })
export class ElevationImage extends Base {
  @Column({ type: 'int4' })
  elevation_id: number;

  @Column({ type: 'int' })
  order: number;

  // @Column({ type: 'text' })
  // image_name: string;

  @Column({ type: 'text' })
  url: string;
}
