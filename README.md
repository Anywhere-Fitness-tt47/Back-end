# Back-end

base_url - http://localhost:5000/api

## [Register - Login]

  * **[Register] [POST] "/auth/register"**. </br>
    "username" - required </br>
    "password" - required </br>
    "role" - required, "instructor" or "client" </br>

  * **[Login] [POST] "/auth/login"** </br>
    "username" - required </br>
    "password" - required </br>

## [Users]

  * **[FindAll] [GET] "/users"**

  * **[FindUserById] [GET] "/users/:id"**
