import { inject, Injectable } from "@angular/core"
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { environment } from "../../../environments/environment.local"
import { User } from "../../../models/user.model"
import { Observable, catchError, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly apiUrl = environment.prodUrl + 'users';
    private httpClient = inject(HttpClient)

    /**
     * Retrieves a list of users from the API.
     * Logs network errors and propagates a user-friendly error message.
     * @returns An Observable of an array of User objects.
     */
    getUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(this.apiUrl)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.error('JsonPlaceholder API error fetching users:', error);
                    return throwError(() => new Error('Unable to load user data. Please try again later.'));
                })
            );
    }
}