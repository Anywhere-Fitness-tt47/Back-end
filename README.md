# Back-end

**[Endpoints]** Base URL: https://anywhere-fitness-tt42.herokuapp.com/api
- This url will be the start of all the endpoints, add endpoints to the base url

## [Register - Login]
- Example: https://anywhere-fitness-tt42.herokuapp.com/api/auth/register
- No token required

  * **[POST] [Register]** - Register a new user </br>
    **/auth/register** 
    
    **Required Fields:** </br>
    "username" - string, must not match any other registered username </br>
    "first_name" - string </br>
    "last_name" - string </br>
    "email" - string </br>
    "password" - string </br>
    "role" - string, must be "instructor" or "client" </br>

  * **[POST] [Login]** - Login a registered user to recieve a token </br>
    **/auth/login** 
    
    **Required Fields:** </br>
    "username" - string, must match a registered username </br>
    "password" - string, must match a registered password </br>

## [Users]  
- Example: https://anywhere-fitness-tt42.herokuapp.com/api/users
- Token required

  * **[GET] [FindAllUsers]** - Find all registered users  </br>
    **/users**

  * **[GET] [FindUserById]** - Find a registered user by user id </br>
    **/users/:id**
    
## [Classes]  
- Example: https://anywhere-fitness-tt42.herokuapp.com/api/classes
- Token required

  * **[GET] [FindAllClasses]** - Find all registered classes </br>
    **/classes**

  * **[GET] [FindClassById]** - Find a registered class by class id </br>
    **/classes/:id**

  * **[POST] [AddClass]** - Register a new class </br>
    **/classes**
    
    **Required Fields:** </br>
    "name" - string, must not match any other registered class name </br>
    "type" - string </br>
    "start_time" - string </br>
    "date" - string </br>
    "duration" - integer, in # of minutes </br>
    "intensity_level" - string </br>
    "location" - string </br>
    "attendees" - integer </br>
    "max_size" - integer </br>
    "instructor_username" - string, must be a valid instructor_username </br>

  * **[PUT] [UpdateClassById]** - Edit a registered class by class id </br>
    **/classes/:id**
    
    **Required Fields:** </br>
    "name" - string, must not match any other registered class name </br>
    "type" - string </br>
    "start_time" - string </br>
    "date" - string </br>
    "duration" - integer, in # of minutes </br>
    "intensity_level" - string </br>
    "location" - string </br>
    "attendees" - integer </br>
    "max_size" - integer </br>
    "instructor_username" - string, must be a valid instructor_username </br>

  * **[DELETE] [RemoveClassById]** - Remove a registered class by class id </br>
    **/classes/:id**

## [User_Classes]  
- Example: https://anywhere-fitness-tt42.herokuapp.com/api/user_classes/user/1
- Token required

  * **[GET] [FindClassesByUserId]** - Find all classes that a user has joined, by user id </br>
    **/user_classes/user/:id**

  * **[GET] [FindUsersByClassId]** - Find all users that have joined a class, by class id </br>
    **/user_classes/class/:id**  

  * **[POST] [AddUserToClass]** - Register a user to join a class </br>
    **/user_classes** 
    
    **Required Fields:** </br>
    "user_id" - integer, must be a valid user id, must not already be registered to the class </br>
    "class_id" - integer, must be a valid class id </br>

  * **[DELETE] [RemoveUserFromClass]** - Remove a user who has joined a class from that class </br>
    **/user_classes** 
    
    **Required Fields:** </br>
    "user_id" - integer, must be a valid user id, must already be registered to the class </br>
    "class_id" - integer, must be a valid class id </br>
