import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
  ForbiddenException,
} from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../common/enums/user-role.enum';

@Controller()
export class AlertsController {
  constructor(private alertsService: AlertsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('alerts')
  async create(@Body() createAlertDto: CreateAlertDto) {
    return this.alertsService.create(createAlertDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('alerts')
  async findAll(@Param() params: any) {
    return this.alertsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('alerts/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.alertsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/:id/alerts')
  async findByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.alertsService.findByUserId(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('alerts/:id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.alertsService.updateStatus(id, updateStatusDto.status);
  }
}
