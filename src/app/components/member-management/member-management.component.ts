import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-member-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './member-management.component.html',
  styleUrl: './member-management.component.css'
})
export class MemberManagementComponent implements OnInit {

  memberId = '';
  societyId = '';
  name = '';
  email = '';
  role = 'member';

  editingId = '';

  members: any[] = [];

  private memberService = inject(MemberService);

  ngOnInit() {

    this.loadMembers();

  }

  loadMembers() {

    this.memberService.getMembers().subscribe((data: any[]) => {

      this.members = data;

    });

  }

  saveMember() {

    const member = {

      memberId: this.memberId,
      societyId: this.societyId,
      name: this.name,
      email: this.email,
      role: this.role

    };

    if (this.editingId) {

      this.memberService.updateMember(this.editingId, member);

      alert('Member Updated');

    } else {

      this.memberService.addMember(member);

      alert('Member Added');

    }

    this.clear();

  }

  editMember(member: any) {

    this.editingId = member.id;

    this.memberId = member.memberId;
    this.societyId = member.societyId;
    this.name = member.name;
    this.email = member.email;
    this.role = member.role;

  }

  deleteMember(id: string) {

    if (confirm('Delete Member?')) {

      this.memberService.deleteMember(id);

    }

  }

  clear() {

    this.editingId = '';

    this.memberId = '';
    this.societyId = '';
    this.name = '';
    this.email = '';
    this.role = 'member';

  }

}