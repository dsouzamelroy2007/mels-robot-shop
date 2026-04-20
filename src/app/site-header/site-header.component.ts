import { Component } from '@angular/core';
import { IUser } from '../user/user.model';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bot-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent {
  user: IUser | null = null;
  showSignOut: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  toggleSignOut() {
    this.showSignOut = !this.showSignOut;
  }

  signOut() {
    this.userService.signOut();
     // this.user = null; should be automatically handled by the user service's getUser observable, but we can also set it to null here for immediate UI feedback
      this.showSignOut = false;
      this.router.navigate(['/', 'sign-in']); // Optionally navigate to home or login page after signing out
  }
}
