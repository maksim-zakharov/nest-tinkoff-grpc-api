import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import * as grpc from '@grpc/grpc-js';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'invest-public-api.tinkoff.ru',
          package: 'tinkoff.public.invest.api.contract.v1',
          protoPath: join(__dirname, '../contracts/users.proto'),
          loader: {
            keepCase: true
          },
          credentials: grpc.credentials.combineChannelCredentials(
            grpc.credentials.createSsl(),
            grpc.credentials.createFromMetadataGenerator(function(args, callback) {
              const metadata = new grpc.Metadata();
              metadata.add('Authorization', `Bearer ${process.env.API_TOKEN}`);
              callback(null, metadata);
            })
          )
        },
      },
    ]),
  ],
  controllers: [UsersController]
})
export class UsersModule {
}
