/**
 * Component: UserCardComponent
 * 
 * Displays information about a single user
 */
import { Component, Input } from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-card',
  standalone: false,
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCardComponent {
  @Input() user?: User;
}

