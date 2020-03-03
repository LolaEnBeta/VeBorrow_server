# VeBorrow App

##Description
Imagine that you are in the city and need to go somewhere, but you don’t want to pay the expensive price for metro/bus tickets, or you don’t have any account to rent the public bikes… If this happens to you, VeBorrow is your solution!
VeBorrow is an app where the users can borrow the vehicles (bikes, electric scooters, cars, motorcycle..) from other users, without paying any cost.
Also, you can borrow your vehicle to other users that are in the same situation as you.

Let’s make this world more easy and friendly =)

<br>

## User Stories

- **Signup**: As an anon, I can sign up in the platform to start borrow / take borrow the vehicles when I need it.
- **Login**: As a user I can login to the platform to search vehicles to borrow or publish my vehicle.
- **Logout**: As a user I can logout from the platform so no one else can use it.
- **User profile**: As a user I can see, edit or delete my profile.
- **My vehicles list**: As a user I can create, edit or delete my vehicles.
- **Vehicles**: As a user I can search and borrow the vehicles published on the map.
- **Receive notifications**: As a user I can receive and send notifications to complete the borrow.
- **404**: As an anon/user, I can see a 404 page if I try to reach a page that does not exist.

<br>

## Backlog

- Confidence points (stars).
- Time interval for your vehicle.
- Confirm the credit card to avoid frauds.
- Filter by type when search for vehicles.

<br>

# Client / Front-end

## Routes (React App)

| Path                            | Component         | Permissions     | Behavior                                                            |
| -------------------------       | ---------------   | -----------     | ------------------------------------------------------------        |
| `/`                             | SplashPage        | anon only       | Home page                                                           |
| `/signup`                       | SignupPage        | anon only       | Signup form, link to login, navigate to home directory after signup |
| `/login`                        | LoginPage         | anon only       | Login form, link to signup, navigate to home directory after login  |
| `/logout`                       | n/a               | anon only       | Navigate to public login page after logout, expire session          |
| `/search`                       | SearchVehicle     | user            | Show Map with all the vehicles ready for borrow                     |
| `/search/:vehicleId`            | Vehicle           | user            | Show details of the vehicle                                         |
| `/my-vehicles`                  | VehiclesPage      | user            | Show a list of all the vehicles                                     |
| `/my-vehicles/:vehicleId`       | Vehicle           | user            | Show details of one vehicle                                         |
| `/notifications`                | NotificationsPage | user            | Show a list of all the vehicles                                     |
| `/notifications/:notificationId`| Notification      | user            | Show details of one notification                                    |
| `/borrow/:borrowId`             | Borrow            | user            | Show details of the borrow                                          |
| `/my-profile`                   | ProfilePage       | user            | Show details of the user profile                                    |


<br>

## Components

- SplashPage
- SignupPage
- LoginPage
- SearchVehicle
- Vehicle
- VehiclesPage
- NotificationsPage
- Notification
- Borrow
- Navbar
- ProfilePage
- 404Page

<br>

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()

- User Service
  - user.getOne(id)
  - user.getOneAndUpdate(id, body)

- Vehicle Service
  - vehicle.getAll()
  - vehicle.getOne(id)
  - vehicle.getOneAndUpdate(id, body)
  - vehicle.create(body)
  - vehicle.delete(id)

- Rent Service
  - rent.create(body)
  - rent.getOne(id)
  - rent.getOneAndUpdate(id, body)

  <br>
  <br>

  # Server / Back-end

  ## Models

  User model

  ```javascript
  {
    firtsName: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phoneNumber: {type: Number},
    password: {type: String, required: true},
    owner: {type: Boolean, default: false},
    vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vehicle"}],
    rentals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rental"}]
  }
  ```


  Vehicle model

  ```javascript
  {
    type: {type: String, required: true, enum: ["bike", "motorcycle", "car", "scooter", "electric scooter"]},
    ownerId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    latitude: {type: String},
    longitude: {type: String}
  }
  ```


  Rental model

  ```javascript
  {
    ownerId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    renterId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    message: {type: String},
    available: {type: Boolean}
  }
  ```

  <br>

  ## API Endpoints (back-end routes)

| HTTP Method | URL                     | Request Body                 | Success status | Error Status | Description                 |
| ----------- | ----------------------- | ---------------------------- | -------------- | ------------ | --------------------------- |
| GET         | `/auth/me    `          | Saved session                | 200            | 404          | Check if user is logged in and return home page    |
| POST        | `/auth/signup`          | {firstName, lastName, email, password, phoneNumber}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`           | {email, password}            | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`          | (empty)                      | 204            | 400          | Logs out the user                                          |
| GET         | `/user/:userId`         | {userId}                 | 200            | 400          | Get user information                                   |
| PUT         | `/user/:userId`         | {vehicleId, firstName, lastName,phoneNumber}           | 200          | 400          | edit user                           |
| GET         | `/vehicles`             |                              | 200            | 404          | show user vehicles                                        |
| GET         | `/vehicles/:vehicleId`  | {vehicleId}                  | 200            | 404          | show specific vehicle                                     |
| POST        | `/vechicles`            | {type,ownerId}               | 200            | 404          | create new vehicle                                        |
| PUT         | `/vehicles/:vehicleId`  | {vehicleId, latitude, longitude} | 201         | 400          | edit a specific vehicle                                   |
| DELETE      | `/vehicle/:vehicleId`   | {vehicleId}                  | 200            | 400          | delete specific vehicle                                   |
| GET         | `/rentals/:userId`      | {userId}                     | 201            | 400          | show user rentals                                         |

<br>

## Links

### Trello
[Trello board Link](https://trello.com/b/oL9dar4Q/veborrow-final-project)

## Git
[Client repository Link]()
[Server repository Link](https://github.com/LolaEnBeta/VeBorrow_server)
[Deploy Link]()

## Slides

[Slides Link]()


