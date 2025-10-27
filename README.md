1. 400 – Bad Request: The request is invalid or missing required data (client error).

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

# 409
409 – Conflict: The data you’re sending conflicts with existing data (e.g., duplicate file name).

# 500
500 – Internal Server Error: Something went wrong on the backend (server or query issue).