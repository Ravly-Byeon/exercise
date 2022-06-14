import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import {MailerService} from "@nestjs-modules/mailer";

@Injectable()
export class EmailsService {
  constructor(
      private readonly mailerService: MailerService,
  ) {
  }
  create(createEmailDto: CreateEmailDto) {
    return 'This action adds a new email';
  }

  findAll() {
    return `This action returns all emails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  update(id: number, updateEmailDto: UpdateEmailDto) {
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }

  async emailSubmit(to: string, str: string){
    await this._send(
        [to],
        '[SecondHanded] 회원가입을 위한 이메일 인증',
        'emailSubmit.ejs',
        {
          email: to,
          rStr: str,
        });
  }

  async _send(
      tos: string[],
      subject: string,
      templateName: string,
      context: any = {},
  ): Promise<boolean>{
    console.log(tos,'_',subject,'_',templateName,'_',context);
    await this.mailerService.sendMail({
      to: tos.join(', '),
      subject,
      template: `${templateName}`,
      context,
    });
    return true;
  }

}
