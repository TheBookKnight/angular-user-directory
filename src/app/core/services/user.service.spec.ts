import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../../../models/user.model';
import { environment } from '../../../environments/environment.local';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that there are no outstanding requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users and match the mock response', () => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        address: {
          street: '123 Main St',
          suite: 'Apt 1',
          city: 'Anytown',
          zipcode: '12345',
          geo: { lat: '0', lng: '0' },
        },
        phone: '123-456-7890',
        website: 'johndoe.com',
        company: {
          name: 'Doe Inc',
          catchPhrase: 'Coding is fun',
          bs: 'business stuff',
        },
      },
    ];

    service.getUsers().subscribe((users) => {
      expect(users.length).toBe(1);
      expect(users).toEqual(mockUsers);
    });

    // Check that a GET request was made to the correct URL
    const req = httpMock.expectOne(`${environment.prodUrl}users`);
    expect(req.request.method).toBe('GET');

    // Resolve the request by flushing the mock user array
    req.flush(mockUsers);
  });

  it('should return an empty array when the API returns 0 users', () => {
    service.getUsers().subscribe((users) => {
      expect(users.length).toBe(0);
      expect(users).toEqual([]);
    });

    const req = httpMock.expectOne(`${environment.prodUrl}users`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should propagate error when the API request fails', () => {
    service.getUsers().subscribe({
      next: () => expect.fail('should have failed with a 500 error'),
      error: (error: Error) => {
        expect(error.message).toBe('Unable to load user data. Please try again later.');
      }
    });

    const req = httpMock.expectOne(`${environment.prodUrl}users`);
    expect(req.request.method).toBe('GET');
    
    // Simulate error response
    req.flush('Error fetching users', { status: 500, statusText: 'Internal Server Error' });
  });
});

