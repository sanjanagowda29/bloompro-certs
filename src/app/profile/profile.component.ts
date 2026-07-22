import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfileService } from './profile.service';

import { Auth, onAuthStateChanged } from '@angular/fire/auth';


@Component({

  selector: 'app-profile',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './profile.component.html',

  styleUrls: ['./profile.component.css']

})


export class ProfileComponent {


  profile:any = {};

  uid:string = '';

  editMode:boolean = false;



  constructor(
    private profileService: ProfileService,
    private auth: Auth
  ){


    onAuthStateChanged(this.auth,(user)=>{


      if(user){

        this.uid = user.uid;

        this.loadProfile();

      }


    });


  }





  async loadProfile(){

  console.log("User UID:", this.uid);


  this.profile =
  await this.profileService.getProfile(this.uid);


  console.log("Profile Data:", this.profile);


}





  enableEdit(){

    this.editMode = true;

  }





  async saveProfile(){


    await this.profileService.updateProfile(
      this.uid,
      this.profile
    );


    this.editMode=false;


    alert("Profile Updated Successfully");


  }



}