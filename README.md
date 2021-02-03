# Back-end

**[Endpoints]** Base URL: https://anywhere-fitness-tt42.herokuapp.com/api

## [Register - Login]
- Example: https://anywhere-fitness-tt42.herokuapp.com/api/auth/register
- No token required

  * **[POST] [Register]** 
    **/auth/register** 
   
    "username" - required, string, unique </br>
    "first_name" - required, string </br>
    "last_name" - required, string </br>
    "email" - required, string </br>
    "password" - required, string </br>
    "role"     - required, string, must be "instructor" or "client" </br>

  * **[POST] [Login]** 
    **/auth/login** 
    
    "username" - required, string, unique </br>
    "password" - required, string </br>

## [Classes]  
- Example: https://anywhere-fitness-tt42.herokuapp.com/api/classes
- Token required

  * **[GET] [FindAll]** 
    **/classes**

  * **[GET] [FindClassById]**
    **/classes/:id**

  * **[POST] [Add]**
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

  * **[PUT] [Update]**
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

  * **[DEL] [Remove]**
    **/classes/:id**

## [User_Classes]  
- Example: https://anywhere-fitness-tt42.herokuapp.com/api/user_classes
- Token required

  * **[GET] [FindClassByUserId]** 
    **/user_classes/:id**

  * **[POST] [AddUserToClass]** 
    **/user_classes/** 

    "user_id" - required, integer </br>
    "class_id" - required, integer </br>

  * **[DEL] [RemoveUserFromClass]** 
    **/user_classes/** 

    "user_id" - required, integer </br>
    "class_id" - required, integer </br>
