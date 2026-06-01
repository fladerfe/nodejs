import { userRepository } from "../repositories/userRepository.js";
import { sanitizeUser } from "../utils/sanitizeUser.js";

class UserService {
  getAll() {
    return userRepository.getAll().map(sanitizeUser)
  }

  getOne(id) {
    const user = userRepository.getOne({ id });
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }

    return sanitizeUser(user);
  }

  create(data) {
    const existingByEmail = userRepository.getOne({ email: data.email });

    if (existingByEmail) {
      const err = new Error("Email already exists");
      err.status = 400;
      throw err;
    }

    const existingByPhone = userRepository.getOne({ phone: data.phone });

    if (existingByPhone) {
      const err = new Error("Phone already exists");
      err.status = 400;
      throw err;
    }

    const user = userRepository.create(data)

    return sanitizeUser(user)
  }

  update(id, data) {
    const user = userRepository.getOne({ id });

    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;  
    }

    if (data.email) {
      const existingByEmail = userRepository.getOne({ email: data.email });

      if (existingByEmail && existingByEmail.id !== id) {
        const err = new Error("Email already exists");
        err.status = 400;
        throw err;
      }
    }

    if (data.phone) {
      const existingByPhone = userRepository.getOne({
        phone: data.phone,
      });

      if (existingByPhone && existingByPhone.id !== id) {
        const err = new Error("Phone already exists");
        err.status = 400;
        throw err;
      }
    }

    return sanitizeUser(userRepository.update(id, data))
  }

  delete(id) {
    const user = userRepository.getOne({ id });

    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }

    userRepository.delete(id);
    
    return sanitizeUser(user);
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
