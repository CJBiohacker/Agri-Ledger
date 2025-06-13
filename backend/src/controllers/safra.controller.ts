import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { SafraService } from '../services/safra.service';
import { CreateSafraDto } from '../dtos/create-safra.dto';
import { UpdateSafraDto } from '../dtos/update-safra.dto';
import { SafraModel } from '../models/safra.model';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Safras')
@Controller('safras')
@UseGuards(RolesGuard)
@ApiBearerAuth()
export class SafraController {
  constructor(private readonly safraService: SafraService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Cria uma nova safra' })
  @ApiResponse({
    status: 201,
    description: 'Safra criada com sucesso.',
    type: SafraModel,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() dto: CreateSafraDto) {
    return this.safraService.create(dto);
  }

  @Get()
  @Roles('admin', 'generico')
  @ApiOperation({ summary: 'Lista todas as safras' })
  @ApiResponse({
    status: 200,
    description: 'Lista de safras.',
    type: [SafraModel],
  })
  @ApiParam({
    name: 'propriedadeId',
    required: false,
    description: 'ID da propriedade para filtrar safras',
  })
  findAll(@Query('propriedadeId') propriedadeId?: string) {
    return this.safraService.findAll(propriedadeId);
  }

  @Get(':id')
  @Roles('admin', 'generico')
  @ApiOperation({ summary: 'Busca uma safra pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Detalhes da safra.',
    type: SafraModel,
  })
  @ApiResponse({ status: 404, description: 'Safra não encontrada.' })
  findOne(@Param('id') id: string) {
    return this.safraService.findOne(id);
  }

  @Put(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Atualiza uma safra existente' })
  @ApiResponse({
    status: 200,
    description: 'Safra atualizada com sucesso.',
    type: SafraModel,
  })
  @ApiResponse({ status: 404, description: 'Safra não encontrada.' })
  update(@Param('id') id: string, @Body() dto: UpdateSafraDto) {
    return this.safraService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Remove uma safra' })
  @ApiResponse({
    status: 204,
    description: 'Safra removida com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Safra não encontrada.' })
  remove(@Param('id') id: string) {
    return this.safraService.remove(id);
  }
}
