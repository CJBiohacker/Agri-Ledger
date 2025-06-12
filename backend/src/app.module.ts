import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './database/orm.config';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';

@Module({
  imports: [SequelizeModule.forRoot(sequelizeConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
