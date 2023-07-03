import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http : HttpClient) { }

  private baseApiUrl = 'https://localhost:44308/api/User/';

  getProduct():Observable<Product[]>
  {
    return this.http.get<Product[]>(this.baseApiUrl+'GetProduct');
  }

addProduct(user:Array<string>)
{
  return this.http.post(this.baseApiUrl + 'AddProduct',
  {
    pname:user[0],
    color:user[1],
    size:user[2],
    description:user[3],
    rate:user[4],
    qty:user[5]  
  },{
    responseType : "text",
  })
}


}
