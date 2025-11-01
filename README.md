1. 400 – Bad Request: The request is invalid or missing required data (client error).

Used when the route exists, but the request is wrong — e.g., missing fields, invalid JSON, wrong data format.

❌ Route exists but request is invalid → 400

# 401
401 – Unauthorized: 

A 401 error means “Unauthorized” — the user is not authenticated.

They haven’t logged in or provided valid credentials (like a token or password).

Unlike 403, they might gain access if they authenticate properly.

In short:

401 = you need to log in.

403 = you’re logged in but not allowed.

# 403
403 = forbidden (user is authenticated but not allowed).

# 404
404 – Not Found: The resource you’re trying to manipulate doesn’t exist.

❌ Route missing → 404

# 409
409 – Conflict: The data you’re sending conflicts with existing data (e.g., duplicate file name).

# 500
500 – Internal Server Error: Something went wrong on the backend (server or query issue).

Used when something went wrong in the backend logic itself — e.g., database crash, syntax error, or unhandled exception.

❌ Backend crashed or bugged → 500


# Command for generating the access token and the refresh token

node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
