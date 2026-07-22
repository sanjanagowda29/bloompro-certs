import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private firestore = inject(Firestore);

  async getMembers() {

    const snapshot = await getDocs(
      collection(this.firestore, 'members')
    );

    return snapshot.docs.map(d => d.data());

  }

  async getCertificates() {

    const snapshot = await getDocs(
      collection(this.firestore, 'certifications')
    );

    return snapshot.docs.map(d => d.data());

  }

}
