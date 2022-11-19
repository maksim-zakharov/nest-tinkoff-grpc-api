import { Module } from '@nestjs/common';
import { OperationsController } from './operations.controller';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import * as grpc from "@grpc/grpc-js";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'OPERATIONS_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'invest-public-api.tinkoff.ru',
          package: 'tinkoff.public.invest.api.contract.v1',
          protoPath: join(__dirname, '../contracts/operations.proto'),
          loader: {
            keepCase: true
          },
          credentials: grpc.credentials.combineChannelCredentials(
            grpc.credentials.createSsl(),
            grpc.credentials.createFromMetadataGenerator(function (args, callback) {
              const metadata = new grpc.Metadata();
              metadata.add('Authorization', `Bearer ${process.env.API_TOKEN}`);
              callback(null, metadata);
            })
          )
        },
      },
    ])],
  controllers: [OperationsController]
})
export class OperationsModule {
}
