# Back-end

**[Endpoints]** Base URL - https://anywhere-fitness-tt42.herokuapp.com/api

## [Register - Login]

  * **[POST] [Register] /auth/register** </br>
    "username" - required, string, unique </br>
    "password" - required, string </br>
    "role"     - required, string, must be "instructor" or "client" </br>

  * **[POST] [Login] /auth/login** </br>
    "username" - required, string </br>
    "password" - required, string </br>

## [Users]

- Token required in Authorization header

  * **[GET] [FindAll] /users**

  * **[GET] [FindUserById] /users/:id**

## [Classes]  

- Token required in Authorization header

  * **[GET] [FindAll] /classes**

  * **[GET] [FindClassById] /classes/:id**

  * **[POST] [Add] /classes** </br>
    "name" - required, string, unique </br>
    "type" - required, string </br>
    "start_time" - required, string </br>
    "duration" - required, string </br>
    "intensity_level" - required, string </br>
    "location" - required, string </br>
    "attendees" - required, integer </br>
    "max_size" - required, integer </br>
