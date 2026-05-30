import { userRepository } from "../repositories/userRepository.js";

class UserService {
  getAll() {
    return userRepository.getAll()
  }

  getOne(id) {
    const user = userRepository.getOne({ id });
    if (!user) {
      throw new Error("User not found");
    }

    return user
  }

  create(data) {
    const existingByEmail = userRepository.getOne({ email: data.email });

    if (existingByEmail) {
      throw new Error("Email already exists");
    }

    const existingByPhone = userRepository.getOne({ phone: data.phone });

    if (existingByPhone) {
      throw new Error("Phone already exists");
    }

    return userRepository.create(data)
  }

  update(id, data) {
    const user = userRepository.getOne({ id });

    if (!user) {
      throw new Error("User not found");    
    }

    if (data.email) {
      const existingByEmail = userRepository.getOne({ email: data.email });

      if (existingByEmail && existingByEmail.id !== id) {
        throw new Error("Email already exists");
      }
    }

    if (data.phone) {
      const existingByPhone = userRepository.getOne({
        phone: data.phone,
      });

      if (existingByPhone && existingByPhone.id !== id) {
        throw new Error("Phone already exists");
      }
    }

  }

  delete(id) {
    const user = userRepository.getOne({ id });

    if (!user) {
      throw new Error("User not found");
    }

    userRepository.delete(id);
    
    return user;
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
