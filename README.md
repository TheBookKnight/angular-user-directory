# Angular User Directory

A clean, production-ready Angular application demonstrating directory search and presentation. The application fetches user profiles from the external JSONPlaceholder REST API and showcases modern Angular architectural patterns, strong typing, and professional code standards.

---

## 🚀 Tech Stack

- **Core Framework**: Angular v21 (featuring zoneless change detection and modern control flow)
- **Asynchronous State & Data Streams**: RxJS v7.8
- **Networking**: Angular HttpClient
- **Styling**: Vanilla CSS for modular design
- **Testing & Tooling**:
  - Unit Tests: Vitest & JSDom (100% code coverage)
  - Linting: ESLint with `@angular-eslint`
  - Code Formatting: Prettier

---

## 🏗️ Architecture Flow & Data Binding

The application implements a strict **Service ➔ Container Component ➔ Presentational Component** unidirectional architecture.

```mermaid
flowchart TD
    subgraph Core Services
        Service[UserService]
    end
    subgraph Features (User Directory)
        Parent[UserListComponent <br/> Container / Parent Component]
        Child[UserCardComponent <br/> Presentational / Child Component]
    end

    API[(JSONPlaceholder API)] -->|HTTP GET /users| Service
    Service -->|Observable&lt;User[]&gt;| Parent
    Parent -->|Injects via inject()| Service
    Parent -->|Data Binding: [user]='user'| Child
    Child -->|Renders via @Input() user| UI[User Details Card]
    
    style Service fill:#f9f,stroke:#333,stroke-width:2px
    style Parent fill:#bbf,stroke:#333,stroke-width:2px
    style Child fill:#bfb,stroke:#333,stroke-width:2px
```

- **Service Layer (`UserService`)**: Centralizes HTTP requests, wraps raw responses in typed models (`User[]`), handles API errors, and exposes clean Observable streams.
- **Container (Parent) Component (`UserListComponent`)**: Injects the service, manages loading, error, and list state, handles change detection alerts, and orchestrates presentation.
- **Presentational (Child) Component (`UserCardComponent`)**: Receives data via `@Input()` and renders the user's details inside a styled card. It remains decoupled from API logic, side effects, and state management.

---

## 🛠️ Getting Started

### Installation

Clone the repository and install the dependencies:
```bash
npm install
```

### Running the Application

There are two modes to run the application depending on whether you want to see detailed console debug logs:

1. **Development Mode (With Debug Logs)**:
   Starts a local server with verbose `console.debug` logs enabled for testing user list data fetching and state changes.
   ```bash
   npm start
   ```
   Open [http://localhost:4200/](http://localhost:4200/) in your browser.

2. **No-Debug Mode (Production Environment)**:
   Swaps out development configurations via Angular `fileReplacements` to silence verbose console output, simulating a production build environment.
   ```bash
   npm run start:no-debug
   ```

---

## 🧪 Testing and Quality Control

### Run Linter
Verify code style consistency, unused imports, and Angular best practices:
```bash
npm run lint
```

### Run Unit Tests
Run the Vitest test runner to verify logic correctness:
```bash
npm test
```

### Run Test Coverage
Check test coverage metrics (which are maintained at 100%):
```bash
npm run test:coverage
```

### Build Production Bundle
Compile and build optimized artifacts under `dist/angular-user-directory/`:
```bash
npm run build
```

---

## 📋 User Data Schema

The application maps endpoint data to the following strongly-typed `User` schema structure:

```typescript
export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
```

---

## 💡 Key Angular Concepts Demonstrated

### 1. Dependency Injection (DI)
Utilizes the modern functional `inject()` API instead of standard constructor injection for clean, readable, and type-safe DI:
```typescript
private userService = inject(UserService);
private cdr = inject(ChangeDetectorRef);
```

### 2. Angular Services
Decoupled business logic inside singleton services annotated with `@Injectable({ providedIn: 'root' })`. It abstracts communication with endpoints from components.

### 3. Observables (RxJS)
Manages asynchronous network calls reactively. Implements robust pipelines with error propagation via `catchError` and `throwError`:
```typescript
getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl)
        .pipe(
            catchError((error) => {
                return throwError(() => new Error('Unable to load user data.'));
            })
        );
}
```

### 4. Parent-to-Child Communication (`@Input`)
Passes structured objects down the tree via `@Input()`, ensuring strong encapsulation of presentational components:
```typescript
export class UserCardComponent {
  @Input() user?: User;
}
```

### 5. Component Composition & Control Flow
Leverages Angular's modern block-based control flow syntax (`@if`, `@for`, `@else`) in templates for clean DOM rendering without structural directives like `*ngIf` or `*ngFor`.
