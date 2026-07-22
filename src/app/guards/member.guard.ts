import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const memberGuard: CanActivateFn = () => {

  const router = inject(Router);

  const user = JSON.parse(
    localStorage.getItem('loggedInMember') || '{}'
  );

  if (user.role === 'member') {

    return true;

  }

  router.navigate(['/login']);

  return false;

};