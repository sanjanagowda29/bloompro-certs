import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  docData,
  query,
  where
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CertificationService {

  private firestore = inject(Firestore);

  private certRef = collection(
    this.firestore,
    'certifications'
  );

  // ===========================
  // Add Certificate
  // ===========================

  addCertification(certification: any) {

    return addDoc(
      this.certRef,
      certification
    );

  }

  // ===========================
  // Get All Certificates
  // ===========================

  getCertifications() {

    return collectionData(
      this.certRef,
      {
        idField: 'id'
      }
    );

  }

  // ===========================
  // Get One Certificate
  // ===========================

  getCertification(id: string) {

    const certDoc = doc(
      this.firestore,
      `certifications/${id}`
    );

    return docData(
      certDoc,
      {
        idField: 'id'
      }
    );

  }

  // ===========================
  // Update Certificate
  // ===========================

  updateCertification(
    id: string,
    certification: any
  ) {

    const certDoc = doc(
      this.firestore,
      `certifications/${id}`
    );

    return updateDoc(
      certDoc,
      {
        ...certification
      }
    );

  }

  // ===========================
  // Delete Certificate
  // ===========================

  deleteCertification(id: string) {

    const certDoc = doc(
      this.firestore,
      `certifications/${id}`
    );

    return deleteDoc(certDoc);

  }

  // ===========================
  // Member Dashboard
  // ===========================

  getCertificationByMemberId(memberId: string) {

    const q = query(
    this.certRef,
    where('memberId', '==', memberId)
  );

  return collectionData(q, {
    idField: 'id'
  });

  }

}