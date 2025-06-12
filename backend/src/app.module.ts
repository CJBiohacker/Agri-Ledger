import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './database/orm.config';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ProdutorController } from './controllers/produtor.controller';
import { ProdutorService } from './services/produtor.service';
import { ProdutorModel } from './models/produtor.model';
import { PropriedadeController } from './controllers/propriedade.controller';
import { PropriedadeService } from './services/propriedade.service';
import { PropriedadeModel } from './models/propriedade.model';
import { SafraController } from './controllers/safra.controller';
import { SafraService } from './services/safra.service';
import { SafraModel } from './models/safra.model';
import { CulturaController } from './controllers/cultura.controller';
import { CulturaService } from './services/cultura.service';
import { CulturaModel } from './models/cultura.model';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    SequelizeModule.forFeature([
      ProdutorModel,
      PropriedadeModel,
      SafraModel,
      CulturaModel,
    ]),
  ],
  controllers: [
    AppController,
    ProdutorController,
    PropriedadeController,
    SafraController,
    CulturaController,
  ],
  providers: [
    AppService,
    ProdutorService,
    PropriedadeService,
    SafraService,
    CulturaService,
  ],
})
export class AppModule {}
