import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private authservices:AuthService,private router:Router,private crudServices:CrudService,private http:HttpClient){
    this.getAllProduct();
  }
  
  productArray:any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  currentpname = "";

  currentId? = undefined;

  getAllProduct()
  {
    this.crudServices.getProduct().subscribe(
      (res:any) => {
        this.isResultLoaded = true;
        console.log(res);
        this.productArray = res;
      }
    )   
  }

  pname:string = "";
  size:string ="";
  color:string="";
  description:string="";
  rate?:number=undefined;
  qty?:number=undefined;

  setUpdate(data:any)
  { 
    this.pname = data.pname;
    this.size = data.size;
    this.color = data.color;
    this.description = data.description;
    this.rate = data.rate;
    this.qty = data.qty;

    this.currentId = data.id; 
  }

  updateRecord()
  {
    let bodaydata = {
      "pname" : this.pname,
      "size" : this.size,
      "color" : this.color,
      "description" : this.description,
      "rate" : this.rate,
      "qty" : this.qty
    }

    // this.http.put("https://localhost:44308/api/User/UpdateProduct/1")
  }

  setDelete(data:any)
  {

  }


}
