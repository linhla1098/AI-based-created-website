import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { IdleResource } from './entities/idle-resource.entity';
import { AuthModule } from './auth/auth.module';
import { IdleResourcesModule } from './idle-resources/idle-resources.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'idle_resource_db',
      entities: [User, IdleResource],
      synchronize: true, // Only in development
      logging: true,
    }),
    AuthModule,
    IdleResourcesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
