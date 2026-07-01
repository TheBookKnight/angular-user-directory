import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCardComponent } from './user-card';
import { User } from '../../../models/user.model';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render user details correctly when user input is provided', () => {
    const mockUser: User = {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      website: 'johndoe.com',
      company: {
        name: 'Doe Enterprises',
        catchPhrase: 'Innovating solutions',
        bs: 'e-commerce scaling'
      },
      address: {
        street: '123 Main St',
        suite: 'Apt 4',
        city: 'Metropolis',
        zipcode: '12345',
        geo: { lat: '0', lng: '0' }
      }
    };

    component.user = mockUser;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.user-name')?.textContent).toContain('John Doe');
    expect(compiled.textContent).toContain('john.doe@example.com');
    expect(compiled.textContent).toContain('123-456-7890');
    expect(compiled.textContent).toContain('johndoe.com');
    expect(compiled.textContent).toContain('Doe Enterprises');
  });
});
