import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Customer } from "@service/customers/domain/customer.entity";

@Injectable()
export class CustomerHistoryTableConverter {
   fromCustomer = (source: Customer): Prisma.CustomerHistoryCreateInput => {
     return source === null
       ? null
       : {
         customerId: source._id,
         version: source._version,
         rank: source._rank,
         name: source._name,
         address: source._address,
         createAt: source._updateAt
       };
   };
  
}