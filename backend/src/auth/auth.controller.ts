import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { IsPublic } from './decorators/is-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {} // Adicionado readonly

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Request() req,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() loginDto: LoginDto, // loginDto é validado pelo ClassValidator e usado pelo LocalAuthGuard
  ) {
    return this.authService.login(req.user);
  }
}
