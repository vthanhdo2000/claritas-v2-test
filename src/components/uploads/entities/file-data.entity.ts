import { Base } from 'src/common/entites/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'file_datas' })
export class FileData extends Base {
  @Column({ type: 'text', nullable: true, default: null })
  name: string;

  @Column({ type: 'text', nullable: true, default: null })
  url: string;
}
