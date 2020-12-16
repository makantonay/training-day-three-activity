import { GlobalService } from './../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Profile } from './profile-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  isLogged: boolean;

  profileForm: any;

  profile: Profile = {
    email: '',
    firstName: '',
    lastName: '',
    alias: '',
    jobTitle: '',
    mobileNumber: '',
    password: '',
  }

  constructor(private service: GlobalService, private router: Router) {
    this.isLogged = true;
  }

  ngOnInit(): void {
    this.service.httpGetProfile();

    !(this.service.getToken()) ? this.router.navigate([''], {}) : '';

    this.service.onHttpGetProfile.subscribe(
      (profile: any) => {
        console.log('this is from my profile ts', profile);
        this.fillForm(profile);
      }
    )

    this.profileForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      alias: new FormControl('',[Validators.required]),
      jobTitle:  new FormControl('',[Validators.required]),
      mobileNumber:  new FormControl('',[Validators.required]),
      password:  new FormControl(''),
      confirmPassword: new FormControl(''),
    })
  }

  fillForm(data: any): void {
    this.profileForm.patchValue({
      firstName: data.meta.first_name,
      lastName: data.meta.last_name,
      alias: data.alias,
      jobTitle: data.meta.job_title,
      email: data.email,
      mobileNumber: data.meta.mobile_number
    });
  }


  onSubmit(): void {
    if(this.profileForm.valid){
      const formValues = this.profileForm.value;
      const newFormValues = {
        meta: {
          first_name: formValues.firstName,
          last_name: formValues.lastName,
          job_ttle: formValues.jobTitle,
          mobile_number: formValues.mobileNumber,
          timezone: 'Asia/Manila'
        },
        current_password: '',
        email: formValues.email,
        alias: formValues.alias
      }

      this.service.httpUpdateProfile(newFormValues);
    } else {
      alert('Invalid Form!');
    }
    console.log(this.profileForm.value);
  }

  onLogout(): void {
    this.service.deleteToken();
    this.router.navigate([''], {})
  }
}
