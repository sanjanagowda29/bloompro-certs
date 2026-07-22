import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CertificationService } from '../../services/certification.service';

@Component({
  selector: 'app-certification-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './certification-form.component.html',
  styleUrls: ['./certification-form.component.css']
})
export class CertificationFormComponent implements OnInit {

  certificate: any = {
    memberId: '',
    memberName: '',
    certificationName: '',
    issueDate: '',
    expiryDate: '',
    issuer: '',
    status: '',
    documentUrl: ''
  };

  editingId: string = '';
  saving = false;

  private certService = inject(CertificationService);
  router = inject(Router);

  ngOnInit() {

    const state = history.state?.certificate;

    if (state) {
      this.editingId = state.id;
      this.certificate = { ...state };
    }

  }

  calculateStatus() {

    if (!this.certificate.expiryDate) {
      this.certificate.status = 'Active';
      return;
    }

    const today = new Date();
    const expiry = new Date(this.certificate.expiryDate);
    const days = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (days < 0) {
      this.certificate.status = 'Expired';
    } else if (days <= 30) {
      this.certificate.status = 'Expiring Soon';
    } else {
      this.certificate.status = 'Active';
    }

  }

  async saveCertificate() {

    this.calculateStatus();
    this.saving = true;

    try {

      if (this.editingId) {

        await this.certService.updateCertification(this.editingId, this.certificate);
        alert('Certificate Updated Successfully');

      } else {

        await this.certService.addCertification(this.certificate);
        alert('Certificate Created Successfully');

      }

      this.router.navigate(['/certifications']);

    } catch (e) {

      alert('Error saving certificate');
      console.error(e);

    } finally {

      this.saving = false;

    }

  }

}
