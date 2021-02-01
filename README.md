# Back-end

**[Endpoints]**
Base URL - https://anywhere-fitness-tt42.herokuapp.com/api

## [Register - Login]

  * **[POST] [Register] "/auth/register"**. </br>
    "username" - required </br>
    "password" - required </br>
    "role" - required, "instructor" or "client" </br>

  * **[POST] [Login] "/auth/login"** </br>
    "username" - required </br>
    "password" - required </br>

## [Users]

  * **[GET] [FindAll] "/users"**

  * **[GET] [FindUserById] "/users/:id"**
