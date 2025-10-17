import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdleResourcesService } from './idle-resources.service';
import { IdleResourcesController } from './idle-resources.controller';
import { IdleResource } from '../entities/idle-resource.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IdleResource, User])],
  controllers: [IdleResourcesController],
  providers: [IdleResourcesService],
})
export class IdleResourcesModule {}
