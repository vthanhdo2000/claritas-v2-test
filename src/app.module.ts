import { ElevationImage } from './components/buildings/entities/elevation-image.entity';
import { UserBuilding } from './components/buildings/entities/user-building.entity';
import { Elevation } from './components/buildings/entities/elevation.entity';
import { Building } from './components/buildings/entities/building.entity';
import { Company } from './components/companies/entities/company.entity';
import { FileData } from './components/uploads/entities/file-data.entity';
import { User } from './components/users/entities/user.entity';
import {
  BadRequestException,
  Module,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { db } from './config/config';
import { UsersModule } from './components/users/users.module';
import { CompaniesModule } from './components/companies/companies.module';
import { BuildingsModule } from './components/buildings/buildings.module';
import { UploadsModule } from './components/uploads/uploads.module';
const { database, host, password, port, username } = db;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host,
      port,
      username,
      database,
      password,
      synchronize: false,
      logging: process.env.NODE_ENV === 'production' ? false : true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      entities: [
        User,
        FileData,
        Company,
        Building,
        Elevation,
        UserBuilding,
        ElevationImage,
      ],
    }),
    UsersModule,
    CompaniesModule,
    BuildingsModule,
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        validationError: { target: false, value: false },
        exceptionFactory: (validationErrors: ValidationError[] = []) => {
          return new BadRequestException(validationErrors);
        },
      }),
    },
  ],
})
export class AppModule {}
