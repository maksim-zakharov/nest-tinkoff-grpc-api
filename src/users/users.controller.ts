import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import {
  ClientGrpc,
} from '@nestjs/microservices';
import { Observable } from "rxjs";

//Запрос текущих лимитов пользователя.
interface GetUserTariffRequest {
}

//Запрос маржинальных показателей по счёту
interface GetMarginAttributesRequest {
  account_id: string;// Идентификатор счёта пользователя.
}

//Запрос информации о пользователе.
interface GetInfoRequest {
}

interface UsersService {
  getAccounts(params: any): Observable<any>;
  getMarginAttributes(params: GetMarginAttributesRequest): Observable<any>;
  getUserTariff(params: GetUserTariffRequest): Observable<any>;
  getInfo(params: GetInfoRequest): Observable<any>;
}

@Controller('users')
export class UsersController implements OnModuleInit {
  private usersService: UsersService;

  constructor(@Inject('USERS_PACKAGE') private client: ClientGrpc) {
  }

  onModuleInit() {
    this.usersService = this.client.getService<UsersService>('UsersService');
  }

  @Get('getAccounts')
  getAccounts(): Observable<any> {
    return this.usersService.getAccounts({});
  }

  @Get('getUserTariff')
  getUserTariff(): Observable<any> {
    return this.usersService.getUserTariff({});
  }

  @Get('getMarginAttributes')
  getMarginAttributes(): Observable<any> {
    return this.usersService.getMarginAttributes({account_id: '2138561564'});
  }

  @Get('getInfo')
  getInfo(): Observable<any> {
    return this.usersService.getInfo({});
  }
}
