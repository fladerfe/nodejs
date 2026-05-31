import { userService } from "./userService.js";

class AuthService {
  login(data) {
    const user = userService.search({ email: data.email });
    
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }

    if (user.password !== data.password) {
      const err = new Error("Invalid password");
      err.status = 400;
      throw err;
    }
    
    const { password, ...safeUser } = user;
    return safeUser;
  }
}

const authService = new AuthService();

export { authService };
