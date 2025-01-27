import { CreateCustomerReq } from "src/models/create-customer-req";
import { Customer } from "../customers";

export const to = (source: CreateCustomerReq): Customer => {
  return new Customer(null, 0, source.rank, source.name, source.address);
}
