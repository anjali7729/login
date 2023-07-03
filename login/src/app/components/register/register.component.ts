import { Component } from '@angular/core';
import { FormGroup,FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  displayMsg:string = '';
  isAccountCreated:boolean = false;
  repeatPass:string = 'none';

  constructor(private authservice:AuthService){}
  
  ngOnInit():void{}

  registerForm: FormGroup = new FormGroup({
    firstname: new FormControl("",[Validators.required,Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]),
    lastname: new FormControl("",[Validators.required,Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]),
    email: new FormControl("",[Validators.required,Validators.email]),
    mobile: new FormControl("",[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("[0-9]*")]),
    gender: new FormControl("",[Validators.required]),
    pwd: new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(15)]),
    rpwd: new FormControl(""),
  })

  registrationSubmit(){
    if(this.Pwd.value == this.Rpwd.value)
    {
      console.log(this.registerForm.valid);
      this.repeatPass = "none";
      this.authservice.registerUser([
        this.registerForm.value.firstname,
        this.registerForm.value.lastname,
        this.registerForm.value.email,
        this.registerForm.value.mobile,
        this.registerForm.value.gender,
        this.registerForm.value.pwd,
      ])
      .subscribe((res) => {
        if(res == 'Success')
        {
          this.displayMsg = 'Account Created Successfully';
          this.isAccountCreated = true;
        }
        else if(res == 'Alredy Exist')
        {
          this.displayMsg = 'Already Exist';
          this.isAccountCreated = false;
        }
        else{
          this.displayMsg = 'Something Went Wrong';
          this.isAccountCreated = false;
        }
        //console.log(res);
      });
      //console.log("Submited");
    }
    else{
      this.repeatPass = 'inline';
    }

  }
  get FirstName():FormControl{
    return this.registerForm.get("firstname") as FormControl;
  }
  get LastName():FormControl{
    return this.registerForm.get("lastname") as FormControl;
  }
  get Email():FormControl{
    return this.registerForm.get("email") as FormControl;
  }
  get Number():FormControl{
    return this.registerForm.get("mobile") as FormControl;
  }
  get Gender():FormControl{
    return this.registerForm.get("gender") as FormControl;
  }
  get Pwd():FormControl{
    return this.registerForm.get("pwd") as FormControl;
  }
  get Rpwd():FormControl{
    return this.registerForm.get("rpwd") as FormControl;
  }
}
