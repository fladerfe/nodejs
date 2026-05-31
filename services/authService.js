import { userService } from "./userService.js";

class AuthService {
  login({ email, password }) {
    const user = userService.search({ email });
    
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }

    if (user.password !== password) {
      const err = new Error("Invalid password");
      err.status = 400;
      throw err;
    }
    return user;
  }
}

const authService = new AuthService();

export { authService };
