/**
 * Component: UserListComponent
 * 
 * The UserList component is a feature component that displays a list of users fetched 
 * from the JsonPlaceholder API.
 */
import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService);

  users: User[] = [];
  errorMessage = '';

  // Fetches users on component initialization
  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log('Loaded users:', users);
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to load users';
        console.error(err);
      }
    });
  }
}
