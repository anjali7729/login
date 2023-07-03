import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../model/Product';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent {

  constructor(private http:HttpClient,private router:Router,private crudservices:CrudService){
    this.isNewStudent;
  }
  isNewStudent:Boolean = true;


  product : Product = {

    pname: '',
    size:'',
    color:'',
    description:'',
    rate:undefined,
    qty:undefined,
  }

  // @ViewChild('addemployeeForm') addemployeeForm?:NgForm;

  addproductform:FormGroup = new FormGroup({
    pname:new FormControl("",[Validators.required]),
    size:new FormControl("",[Validators.required]),
    color:new FormControl("",[Validators.required]),
    description:new FormControl("",[Validators.required]),
    rate:new  FormControl("",[Validators.required]),
    qty:new FormControl("",[Validators.required]),
  })

  add()
  { 
    console.log(this.addproductform.valid);
    this.crudservices.addProduct([
      this.addproductform.value.pname,
      this.addproductform.value.color,
      this.addproductform.value.size,
      this.addproductform.value.description,
      this.addproductform.value.rate,
      this.addproductform.value.qty
    ]).subscribe( 
        (res) => {
          console.log(res);
          alert("successfull")
          this.router.navigateByUrl('home');
        })   
  }

  get Pname():FormControl{
    return this.addproductform.get("pname") as FormControl;
  }
  
  get Color():FormControl{
    return this.addproductform.get("color") as FormControl;
  }
  
  get Size():FormControl{
    return this.addproductform.get("size") as FormControl;
  }
  
  get Rate():FormControl{
    return this.addproductform.get("rate") as FormControl;
  }
  
  get Qty():FormControl{
    return this.addproductform.get("qty") as FormControl;
  }
  
  get Description():FormControl{
    return this.addproductform.get("description") as FormControl;
  }

  Update()
  {

  }

}
