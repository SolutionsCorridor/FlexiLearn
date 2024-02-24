import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ParentService } from '../services/parent.service';
import { CreateParentDto, UpdateParentDto } from '../dto/parent.dto';

@Controller('parent')
export class ParentController {
    constructor(private readonly parentService: ParentService) { }

    @Post()
    create(@Body() createParentDto: CreateParentDto) {
        return this.parentService.createParent(createParentDto);
    }

    @Get(':parentId')
    findOne(@Param('parentId') parentId: string) {
        return this.parentService.getParent(parentId);
    }

    // @Put(':parentId')
    // update(@Param('parentId') parentId: string, @Body() updateParentDto: UpdateParentDto) {
    //     return this.parentService.updateParent(parentId, updateParentDto);
    // }

    @Delete(':parentId')
    remove(@Param('parentId') parentId: string) {
        return this.parentService.deleteParent(parentId);
    }
}
