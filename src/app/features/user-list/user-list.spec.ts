import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
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

    component.ngOnInit();

    expect(component.users).toEqual(mockUsers);
  });
});
