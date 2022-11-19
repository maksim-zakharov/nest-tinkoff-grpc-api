import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";

interface MoneyValue{

}

interface Quotation{

}

interface PortfolioPosition{

}

//Текущий портфель по счёту.
interface PortfolioResponse {
  totalAmountShares: MoneyValue; //Общая стоимость акций в портфеле в рублях.
  totalAmountBonds: MoneyValue; //Общая стоимость облигаций в портфеле в рублях.
  totalAmountEtf : MoneyValue; //Общая стоимость фондов в портфеле в рублях.
  total_amount_currencies: MoneyValue; //Общая стоимость валют в портфеле в рублях.
  total_amount_futures: MoneyValue; //Общая стоимость фьючерсов в портфеле в рублях.
  expected_yield: Quotation; //Текущая относительная доходность портфеля, в %.
  positions: PortfolioPosition[]; //Список позиций портфеля.
  account_id: string; //Идентификатор счёта пользователя.
}

//Запрос получения текущего портфеля по счёту.
interface PortfolioRequest {
  account_id: string; //Идентификатор счёта пользователя.
}

interface OperationsService {
  getPortfolio(params: PortfolioRequest): Observable<PortfolioResponse>;
}

@Controller('operations')
export class OperationsController implements OnModuleInit {
  private operationsService: OperationsService;

  constructor(@Inject('OPERATIONS_PACKAGE') private client: ClientGrpc) {
  }

  onModuleInit() {
    this.operationsService = this.client.getService<OperationsService>('OperationsService');
  }


  @Get('getPortfolio')
  getPortfolio(): Observable<any> {
    return this.operationsService.getPortfolio({account_id: '2000097424'});
  }
}
