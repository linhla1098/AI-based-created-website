import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  IdleResourcesService,
  CreateIdleResourceDto,
  UpdateIdleResourceDto,
  ResourceFilterDto,
} from './idle-resources.service';

@Controller('idle-resources')
@UseGuards(AuthGuard('jwt'))
export class IdleResourcesController {
  constructor(private readonly idleResourcesService: IdleResourcesService) {}

  @Post()
  create(@Body() createDto: CreateIdleResourceDto, @Request() req) {
    return this.idleResourcesService.create(createDto, req.user);
  }

  @Get()
  findAll(@Query() filters: ResourceFilterDto, @Request() req) {
    return this.idleResourcesService.findAll(filters, req.user);
  }

  @Get('dashboard-stats')
  getDashboardStats(@Request() req) {
    return this.idleResourcesService.getDashboardStats(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.idleResourcesService.findOne(+id, req.user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateIdleResourceDto,
    @Request() req,
  ) {
    return this.idleResourcesService.update(+id, updateDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.idleResourcesService.remove(+id, req.user);
  }
}
