# Back-end

# [ENDPOINTS]
Base_url: "http://localhost:5000/api"

## [Register - Login]

  **[Register] [POST] "/auth/register"**
    "username" - required
    "password" - required
    "role" - required, "instructor" or "client"

  **[Login] [POST] "/auth/login"**
    "username" - required
    "password" - required

## [Users]

  **[FindAll] [GET] "/users"**

  **[FindUserById] [GET] "/users/:id"**
