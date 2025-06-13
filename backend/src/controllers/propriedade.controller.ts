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
import { PropriedadeService } from '../services/propriedade.service';
import { CreatePropriedadeDto } from '../dtos/create-propriedade.dto';
import { UpdatePropriedadeDto } from '../dtos/update-propriedade.dto';
import { PropriedadeModel } from '../models/propriedade.model';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Propriedades')
@Controller('propriedades')
@UseGuards(RolesGuard)
@ApiBearerAuth()
export class PropriedadeController {
  constructor(private readonly propriedadeService: PropriedadeService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Cria uma nova propriedade' })
  @ApiResponse({
    status: 201,
    description: 'Propriedade criada com sucesso.',
    type: PropriedadeModel,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() dto: CreatePropriedadeDto) {
    return this.propriedadeService.create(dto);
  }

  @Get()
  @Roles('admin', 'generico')
  @ApiOperation({ summary: 'Lista todas as propriedades' })
  @ApiResponse({
    status: 200,
    description: 'Lista de propriedades.',
    type: [PropriedadeModel],
  })
  @ApiParam({
    name: 'produtorId',
    required: false,
    description: 'ID do produtor para filtrar propriedades',
  })
  findAll(@Query('produtorId') produtorId?: string) {
    return this.propriedadeService.findAll(produtorId);
  }

  @Get(':id')
  @Roles('admin', 'generico')
  @ApiOperation({ summary: 'Busca uma propriedade pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Detalhes da propriedade.',
    type: PropriedadeModel,
  })
  @ApiResponse({ status: 404, description: 'Propriedade não encontrada.' })
  findOne(@Param('id') id: string) {
    return this.propriedadeService.findOne(id);
  }

  @Put(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Atualiza uma propriedade existente' })
  @ApiResponse({
    status: 200,
    description: 'Propriedade atualizada com sucesso.',
    type: PropriedadeModel,
  })
  @ApiResponse({ status: 404, description: 'Propriedade não encontrada.' })
  update(@Param('id') id: string, @Body() dto: UpdatePropriedadeDto) {
    return this.propriedadeService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Remove uma propriedade' })
  @ApiResponse({
    status: 204,
    description: 'Propriedade removida com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Propriedade não encontrada.' })
  remove(@Param('id') id: string) {
    return this.propriedadeService.remove(id);
  }
}
