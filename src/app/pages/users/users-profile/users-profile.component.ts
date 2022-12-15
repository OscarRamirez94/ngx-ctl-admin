import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbToastrService } from '@nebular/theme';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ProfessionI } from '../../../interfaces/profession-i';
import { UserPassword } from '../../../models/user/user-password';
import { UserPost } from '../../../models/user/user-post';
import { UserPostService } from '../../../services/user/user-post.service';


@Component({
  selector: 'ngx-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.scss']
})

export class UsersProfileComponent implements OnInit {
  professions: ProfessionI[];
  userForm !: FormGroup;
  submitted = false;
  actionBtn: String = "Crear";
  isChecked;
  isResponsible;
  roleList: string[] = ['ROLE_ADMIN', 'ROLE_USERS', 'ROLE_SUPER'];
  selectedOptions: string[] = [];
  loading = false;
  editData = new UserPost();
  email:string;
  usuario:UserPost;
  userPassword;
  constructor(
    private service: UserPostService,
    private authService: NbAuthService,
    private formBuilder: FormBuilder,
    private toastrService: NbToastrService,
    private router:Router
  ) {

    this.userPassword  = new UserPassword();
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {

      if (token.isValid()) {

        this.email =token.getPayload()['username']
      }

    });

  }

  ngOnInit(): void {
    this.service.userByUsername(this.email).subscribe(data =>{
      this.usuario = data as UserPost;
      this.setForm();
    })

  }
  setForm() {
    this.userForm = this.formBuilder.group({
      id: [{value: this.usuario?.id, disabled: true}, Validators.required],
      username: [{value: this.usuario?.username, disabled: true}, Validators.required],
      email: [{value: this.usuario?.email, disabled: true}, Validators.required],
      firstName: [{value: this.usuario?.firstName, disabled: true}, Validators.required],
      additionalName: [{value: this.usuario?.additionalName, disabled: true}],
      lastName: [{value: this.usuario?.lastName, disabled: true}, Validators.required],
      secondName: [{value: this.usuario?.secondName, disabled: true}, Validators.required],
      profession: [{value: this.usuario?.profession.name, disabled: true}, Validators.required],
      password :['',[
        RxwebValidators.password(
          {validation:{maxLength: 10,minLength: 5,digit: true,specialCharacter: true}, }
          ),
          Validators.required]],

    });
  }



  get f() { return this.userForm.controls; }

  onSubmit() {

    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }

    this.userPassword.id =this.userForm.get('id').value,
    this.userPassword.password =this.userForm.get('password').value,

    this.service.updatePassword(this.userPassword).subscribe(data =>{
      this.toastrService.success("success","se modificó con éxito tu password")
      setTimeout(() => {
        localStorage.removeItem('auth_app_token');
        localStorage.removeItem('cid');
        localStorage.removeItem('cn');
        this.router.navigateByUrl('/auth/login');
      }, 2000)





    })


  }
}
