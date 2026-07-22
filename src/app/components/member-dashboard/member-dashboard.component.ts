import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CertificationService } from '../../services/certification.service';

@Component({
  selector: 'app-member-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-dashboard.component.html',
  styleUrl: './member-dashboard.component.css'
})
export class MemberDashboardComponent implements OnInit {

  member: any;
  certificates: any[] = [];
  
  private router = inject(Router);
  private certificationService = inject(CertificationService);

  ngOnInit(): void {

    this.member = JSON.parse(
      localStorage.getItem('loggedInMember') || '{}'
    );

    this.certificationService
      .getCertificationByMemberId(this.member.memberId)
      .subscribe((data: any[]) => {

        this.certificates = data;

      });

       }

  logout() {

    localStorage.removeItem('loggedInMember');

    this.router.navigate(['/login']);


  }

}