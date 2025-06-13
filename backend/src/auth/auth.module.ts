import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ProdutorModel } from '../models/produtor.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProdutorService } from '../services/produtor.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { RolesGuard } from './guards/roles.guard'; // Importar RolesGuard

@Module({
  imports: [
    SequelizeModule.forFeature([ProdutorModel]), // Para injetar ProdutorModel no ProdutorService
    PassportModule,
    ConfigModule, // Importar ConfigModule para que ConfigService possa ser injetado
    JwtModule.registerAsync({
      imports: [ConfigModule], // Necessário para injetar ConfigService no useFactory
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' }, // Token expira em 1 dia
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    ProdutorService,
    JwtStrategy,
    LocalStrategy,
    // RolesGuard, // Não precisa ser provider global se usado com @UseGuards()
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
