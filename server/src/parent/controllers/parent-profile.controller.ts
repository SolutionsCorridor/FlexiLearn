import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ParentProfileService } from '../services/parent-profile.service';
import { CreateParentProfileDto, UpdateParentProfileDto } from '../dto/parent-profile.dto';

@Controller('parent/profile')
export class ParentProfileController {
    constructor(private readonly parentProfileService: ParentProfileService) { }

    @Post()
    create(@Body() createParentProfileDto: CreateParentProfileDto) {
        return this.parentProfileService.createParentProfile(createParentProfileDto);
    }

    @Get(':parentId')
    findOne(@Param('parentId') parentId: string) {
        return this.parentProfileService.getParentProfile(parentId);
    }

    @Put(':parentId')
    update(@Param('parentId') parentId: string, @Body() updateParentProfileDto: UpdateParentProfileDto) {
        return this.parentProfileService.updateParentProfile(parentId, updateParentProfileDto);
    }
}
