import {Controller, Get, Post, Body, Patch, Param, Delete, Res, Header} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import * as XLSX from "xlsx";
import * as fs from "fs";

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    console.log(createBoardDto.fileList);
    return this.boardsService.create(createBoardDto);
  }

  /*@Get()
  findAll() {
    console.log('boards');
    return this.boardsService.findAll();
  }*/

  @Get(':id')
  findCategory(@Param('id') id: string) {
    console.log(id,'cago');
    return this.boardsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(+id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove(+id);
  }

  @Get()
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @Header('Content-Disposition', 'attachment; filename=users.xlsx')
  async makeExcel(@Res() res){
    const data = await this.boardsService.makeExcel();
    console.log(data,';;hi');
    const wb = XLSX.utils.book_new();
    const newWorksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb,newWorksheet,'test');
    const wbOptions: any = { bookType:'xlsx', type: 'binary'};
    const filename = 'test.xlsx';
    XLSX.writeFile(wb,filename,wbOptions);
    const stream = fs.createReadStream(filename);
    stream.pipe(res);
  }


}
