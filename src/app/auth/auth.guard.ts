import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.userService.isSignedIn()) {
      return true;
    }

    return this.router.createUrlTree(['/sign-in']);
  }
}
