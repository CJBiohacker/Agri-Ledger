import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
  ConflictException,
  NotFoundException,
  UseGuards,
  Req,
  Logger,
} from '@nestjs/common';
import { ProdutorService } from '../services/produtor.service';
import { CreateProdutorDto } from '../dtos/create-produtor.dto';
import { UpdateProdutorDto } from '../dtos/update-produtor.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProdutorModel } from '../models/produtor.model';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Produtores')
@Controller('produtores')
export class ProdutorController {
  private readonly logger = new Logger(ProdutorController.name);

  constructor(private readonly produtorService: ProdutorService) {}

  @IsPublic()
  @Post()
  @ApiOperation({ summary: 'Cria um novo produtor' })
  @ApiResponse({
    status: 201,
    description: 'Produtor criado com sucesso.',
    type: ProdutorModel,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({
    status: 409,
    description: 'Produtor com este CPF/CNPJ já existe.',
  })
  async create(@Body() createProdutorDto: CreateProdutorDto) {
    try {
      return await this.produtorService.create(createProdutorDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin', 'generico')
  @ApiOperation({ summary: 'Lista todos os produtores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtores.',
    type: [ProdutorModel],
  })
  @ApiBearerAuth()
  findAll(@Req() req: any) {
    this.logger.log('Acessando GET /produtores');
    if (req.user) {
      this.logger.log(
        `Usuário autenticado detectado: ${JSON.stringify(req.user)}`,
      );
    } else {
      this.logger.log(
        'Nenhum usuário autenticado detectado (deveria ser bloqueado pelo guard se não for público).',
      );
    }
    return this.produtorService.findAll();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles('admin', 'generico')
  @ApiOperation({ summary: 'Busca um produtor pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Detalhes do produtor.',
    type: ProdutorModel,
  })
  @ApiResponse({ status: 404, description: 'Produtor não encontrado.' })
  @ApiBearerAuth()
  async findOne(@Param('id') id: string, @Req() req: any) {
    this.logger.log(`Acessando GET /produtores/${id}`);
    if (req.user) {
      this.logger.log(
        `Usuário autenticado (findOne): ${JSON.stringify(req.user)}`,
      );
    }
    const produtor = await this.produtorService.findOne(id);
    if (!produtor) {
      throw new NotFoundException(`Produtor com ID ${id} não encontrado`);
    }
    return produtor;
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Atualiza um produtor existente' })
  @ApiResponse({
    status: 200,
    description: 'Produtor atualizado com sucesso.',
    type: ProdutorModel,
  })
  @ApiResponse({ status: 404, description: 'Produtor não encontrado.' })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateProdutorDto: UpdateProdutorDto,
    @Req() req: any,
  ) {
    this.logger.log(`Acessando PATCH /produtores/${id}`);
    if (req.user) {
      this.logger.log(
        `Usuário autenticado (update): ${JSON.stringify(req.user)}`,
      );
    }
    // Adicionar verificação de propriedade/admin aqui futuramente
    try {
      return await this.produtorService.update(id, updateProdutorDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Remove um produtor' })
  @ApiResponse({ status: 204, description: 'Produtor removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produtor não encontrado.' })
  @ApiBearerAuth()
  async remove(@Param('id') id: string, @Req() req: any) {
    this.logger.log(`Acessando DELETE /produtores/${id}`);
    if (req.user) {
      this.logger.log(
        `Usuário autenticado (remove): ${JSON.stringify(req.user)}`,
      );
    }
    // Adicionar verificação de propriedade/admin aqui futuramente
    try {
      await this.produtorService.remove(id);
      // Retornar void ou uma mensagem de sucesso explícita, dependendo da preferência.
      // O status 204 No Content é comum para DELETE.
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
