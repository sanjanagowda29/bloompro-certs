import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = '';
  password = '';

  private authService = inject(AuthService);
  private memberService = inject(MemberService);
  private router = inject(Router);

  async login() {

    if (!this.email || !this.password) {
      alert('Please enter your email and password');
      return;
    }

    try {

      // Firebase Authentication
      await this.authService.login(this.email, this.password);

      // Get logged-in member from Firestore
      const members: any[] = await firstValueFrom(
        this.memberService.getMemberByEmail(this.email)
      );

      if (members.length === 0) {

        alert('User not found in Firestore');
        return;

      }

      const member = members[0];

      // Save logged-in member
      localStorage.setItem(
        'loggedInMember',
        JSON.stringify(member)
      );

      // Navigate according to role
      if (member.role === 'admin') {

        this.router.navigate(['/admin']);

      } else {

        this.router.navigate(['/member']);

      }

    } catch (error: any) {

      console.error(error);

      switch (error.code) {

        case 'auth/invalid-email':
          alert('Invalid email address');
          break;

        case 'auth/invalid-credential':
          alert('Invalid email or password');
          break;

        case 'auth/user-not-found':
          alert('User not found');
          break;

        case 'auth/wrong-password':
          alert('Wrong password');
          break;

        case 'auth/quota-exceeded':
          alert('Firebase quota exceeded');
          break;

        default:
          alert(error.message);

      }

    }

  }

}