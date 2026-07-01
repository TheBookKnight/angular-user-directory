import { inject, Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { environment } from "../../../../environment"
import { User } from "../../../models/user.model"
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly apiUrl = environment.prodUrl + 'users';
    private httpClient = inject(HttpClient)

    /**
     * Retrieves a list of users from the API.
     * @returns An Observable of an array of User objects.
     */
    getUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(this.apiUrl)
    }
}