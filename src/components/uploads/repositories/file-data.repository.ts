import { FileData } from './../entities/file-data.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(FileData)
export class FileDataRepository extends Repository<FileData> {}
