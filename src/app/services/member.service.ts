import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private firestore = inject(Firestore);

  private membersRef = collection(this.firestore, 'members');

  // ===========================
  // Login
  // ===========================

  getMemberByEmail(email: string) {

    const q = query(
      this.membersRef,
      where('email', '==', email)
    );

    return collectionData(q, {
      idField: 'id'
    });

  }

  // ===========================
  // Get All Members
  // ===========================

  getMembers() {

    return collectionData(this.membersRef, {
      idField: 'id'
    });

  }

  // ===========================
  // Add Member
  // ===========================

  addMember(member: any) {

    return addDoc(
      this.membersRef,
      member
    );

  }

  // ===========================
  // Update Member
  // ===========================

  updateMember(id: string, member: any) {

    const memberDoc = doc(
      this.firestore,
      `members/${id}`
    );

    return updateDoc(
      memberDoc,
      {
        ...member
      }
    );

  }

  // ===========================
  // Delete Member
  // ===========================

  deleteMember(id: string) {

    const memberDoc = doc(
      this.firestore,
      `members/${id}`
    );

    return deleteDoc(memberDoc);

  }

}