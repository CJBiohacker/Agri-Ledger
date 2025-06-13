import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

// Importações diretas de controllers e services (se não houver módulos específicos)
import { ProdutorController } from './controllers/produtor.controller';
import { CulturaController } from './controllers/cultura.controller';
import { PropriedadeController } from './controllers/propriedade.controller';
import { SafraController } from './controllers/safra.controller';
import { PlantioController } from './controllers/plantio.controller';

import { ProdutorService } from './services/produtor.service';
import { CulturaService } from './services/cultura.service';
import { PropriedadeService } from './services/propriedade.service';
import { SafraService } from './services/safra.service';
import { PlantioService } from './services/plantio.service';

// Importações de Models para SequelizeModule.forFeature
import { ProdutorModel } from './models/produtor.model';
import { CulturaModel } from './models/cultura.model';
import { PropriedadeModel } from './models/propriedade.model';
import { SafraModel } from './models/safra.model';
import { PlantioModel } from './models/plantio.model';
import { sequelizeConfig } from './database/orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot(sequelizeConfig),
    SequelizeModule.forFeature([
      ProdutorModel,
      CulturaModel,
      PropriedadeModel,
      SafraModel,
      PlantioModel,
    ]),
    AuthModule,
  ],
  controllers: [
    ProdutorController,
    CulturaController,
    PropriedadeController,
    SafraController,
    PlantioController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    ProdutorService,
    CulturaService,
    PropriedadeService,
    SafraService,
    PlantioService,
  ],
})
export class AppModule {}
