# Back-end

**[Endpoints]** Base URL: https://anywhere-fitness-tt42.herokuapp.com/api

## [Register - Login]
- Example: https://anywhere-fitness-tt42.herokuapp.com/api/auth/register
- No token required

  * **[POST] [Register]** </br>
    **/auth/register** 
   
    "username" - required, string, unique </br>
    "first_name" - required, string </br>
    "last_name" - required, string </br>
    "email" - required, string </br>
    "password" - required, string </br>
    "role"     - required, string, must be "instructor" or "client" </br>

  * **[POST] [Login]** </br>
    **/auth/login** 
    
    "username" - required, string, unique </br>
    "password" - required, string </br>

## [Users]  
- Example: https://anywhere-fitness-tt42.herokuapp.com/api/users
- Token required

  * **[GET] [FindAllUsers]** </br>
    **/users**

  * **[GET] [FindUserById]** </br>
    **/users/:id**

## [Classes]  
- Example: https://anywhere-fitness-tt42.herokuapp.com/api/classes
- Token required

  * **[GET] [FindAllClasses]** </br>
    **/classes**

  * **[GET] [FindClassById]** </br>
    **/classes/:id**

  * **[POST] [AddClass]** </br>
    **/classes**
    
    "name" - required, string, unique </br>
    "type" - required, string </br>
    "start_time" - required, string </br>
    "date" - required, string </br>
    "duration" - required, integer, # of minutes </br>
    "intensity_level" - required, string </br>
    "location" - required, string </br>
    "attendees" - required, integer </br>
    "max_size" - required, integer </br>
    "instructor_username" - required, string, must be a valid instructor_username </br>

  * **[PUT] [UpdateClassById]** </br>
    **/classes/:id**
    
    "name" - required, string, unique </br>
    "type" - required, string </br>
    "start_time" - required, string </br>
    "date" - required, string </br>
    "duration" - required, integer, # of minutes </br>
    "intensity_level" - required, string </br>
    "location" - required, string </br>
    "attendees" - required, integer </br>
    "max_size" - required, integer </br>
    "instructor_username" - required, string, must be a valid instructor_username </br>

  * **[DELETE] [RemoveClassById]** </br>
    **/classes/:id**

## [User_Classes]  
- Example: https://anywhere-fitness-tt42.herokuapp.com/api/user_classes/1
- Token required

  * **[GET] [FindClassesByUserId]** </br>
    **/user_classes/user/:id**

  * **[GET] [FindUsersByClassId]** </br>
    **/user_classes/class/:id**  

  * **[POST] [AddUserToClass]** </br>
    **/user_classes** 

    "user_id" - required, integer </br>
    "class_id" - required, integer </br>

  * **[DELETE] [RemoveUserFromClass]** </br>
    **/user_classes** 

    "user_id" - required, integer </br>
    "class_id" - required, integer </br>
