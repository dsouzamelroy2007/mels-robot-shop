import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { SignInComponent } from './sign-in.component';
import { UserService } from '../user.service';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['signIn']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [FormsModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty credentials', () => {
    expect(component.credentials.email).toBe('');
    expect(component.credentials.password).toBe('');
  });

  it('should initialize signInError as false', () => {
    expect(component.signInError).toBe(false);
  });

  it('should call userService.signIn and navigate on success', () => {
    const mockUser = { firstName: 'John', lastName: 'Doe', email: 'test@example.com' };
    userService.signIn.and.returnValue(of(mockUser));
    component.credentials = { email: 'test@example.com', password: 'password123' };

    component.signIn();

    expect(userService.signIn).toHaveBeenCalledWith(component.credentials);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should set signInError to true on failure', () => {
    userService.signIn.and.returnValue(throwError(() => new Error('Invalid credentials')));
    component.credentials = { email: 'test@example.com', password: 'wrongpassword' };

    component.signIn();

    expect(component.signInError).toBe(true);
  });

  it('should render sign-in form', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('form')).toBeTruthy();
    expect(compiled.querySelector('input[name="email"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="password"]')).toBeTruthy();
  });
});
