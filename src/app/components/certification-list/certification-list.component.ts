import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { CertificationService } from '../../services/certification.service';


@Component({

  selector: 'app-certification-list',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],

  templateUrl: './certification-list.component.html',

  styleUrl: './certification-list.component.css'

})


export class CertificationListComponent implements OnInit {


  certifications: any[] = [];

  filteredCertifications: any[] = [];


  searchText: string = '';



  private certificationService = inject(CertificationService);

  private router = inject(Router);





  ngOnInit(): void {

    this.loadCertificates();

  }







  loadCertificates() {


    this.certificationService
    .getCertifications()
    .subscribe((data:any[])=>{


      this.certifications = data;


      this.calculateExpiryStatus();



      this.filteredCertifications =
      [...this.certifications];


    });


  }







  calculateExpiryStatus(){


    const today = new Date();



    this.certifications.forEach(cert => {



      if(!cert.expiryDate){


        cert.status = "No Expiry Date";


        return;


      }




      const expiryDate =
      new Date(cert.expiryDate);




      const difference =
      expiryDate.getTime()
      -
      today.getTime();




      const remainingDays =
      Math.ceil(

        difference /
        (1000 * 60 * 60 * 24)

      );






      if(remainingDays < 0){


        cert.status = "Expired";


      }

      else if(remainingDays <= 30){


        cert.status = "Expiring Soon";


      }

      else{


        cert.status = "Active";


      }



    });



  }








  filterCertificates(){



    const text =
    this.searchText
    .toLowerCase();




    this.filteredCertifications =
    this.certifications.filter(cert =>



      cert.memberId
      ?.toLowerCase()
      .includes(text)



      ||


      cert.memberName
      ?.toLowerCase()
      .includes(text)



      ||


      cert.certificationName
      ?.toLowerCase()
      .includes(text)



      ||


      cert.issuer
      ?.toLowerCase()
      .includes(text)



      ||


      cert.status
      ?.toLowerCase()
      .includes(text)



    );


  }







  editCertification(cert:any){


    this.router.navigate(

      ['/certification-form'],

      {

        state:{
          certificate:cert
        }

      }

    );


  }







  deleteCertification(id:string){


    if(confirm("Delete this certificate?")){


      this.certificationService
      .deleteCertification(id)
      .then(()=>{


        alert(
          "Certificate deleted successfully"
        );


        this.loadCertificates();


      });


    }


  }



}