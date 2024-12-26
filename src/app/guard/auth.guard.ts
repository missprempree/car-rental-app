import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const authUser = localStorage.getItem("CAR_RENTAL_USERID");
  
  if (authUser != null) {
    return true;
  } else{
    router.navigateByUrl("login");
    return false;
  }
};
