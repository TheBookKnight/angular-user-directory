import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { UserListComponent } from './user-list';
import { UserService } from '../../core/services/user.service';
import { User } from '../../../models/user.model';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let mockUserService: { getUsers: () => Observable<User[]> };

  beforeEach(async () => {
    mockUserService = {
      getUsers: () => of([])
    };

    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display loading message when users are empty', () => {
    mockUserService.getUsers = () => of([]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const loadingElement = compiled.querySelector('p');
    expect(loadingElement?.textContent).toContain('Loading users...');
  });

  it('should load and render users on init', () => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'Alice',
        username: 'alice',
        email: 'alice@example.com',
        address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } },
        phone: '',
        website: '',
        company: { name: '', catchPhrase: '', bs: '' }
      }
    ];

    mockUserService.getUsers = () => of(mockUsers);
    fixture.detectChanges();

    expect(component.users).toEqual(mockUsers);

    const compiled = fixture.nativeElement as HTMLElement;
    const listItems = compiled.querySelectorAll('li');
    expect(listItems.length).toBe(1);
    expect(listItems[0].textContent).toContain('Alice (alice@example.com)');
  });

  it('should handle error and display error message when loading fails', () => {
    const errorResponse = new Error('Failed to fetch users');
    mockUserService.getUsers = () => throwError(() => errorResponse);
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Failed to fetch users');

    const compiled = fixture.nativeElement as HTMLElement;
    const errorElement = compiled.querySelector('.error');
    expect(errorElement?.textContent).toContain('Failed to fetch users');
  });
});
