/**
 * Component: UserListComponent
 * 
 * The UserList component is a feature component that displays a list of users fetched 
 * from the JsonPlaceholder API.
 */
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../../models/user.model';
import { environment } from '../../../environments/environment.local';
@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);

  users: User[] = [];
  errorMessage = '';
  isLoading = true;

  // Fetches users on component initialization
  ngOnInit() {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
        this.cdr.markForCheck();
        if (environment.enableDebugLogs) {
          console.debug('Loaded users:', users);
        }
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to load users';
        this.isLoading = false;
        this.cdr.markForCheck();
        if (environment.enableDebugLogs) {
          console.debug('User list load error:', err);
        }
      }
    });
  }
}
