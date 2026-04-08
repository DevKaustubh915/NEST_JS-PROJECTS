/* eslint-disable @typescript-eslint/no-unused-vars */
// src/users/users.service.ts

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // ── Get own profile ───────────────────────────────────
  async getMe(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException('User not found');
    return { data: this.sanitizeUser(user) };
  }

  // ── Update own profile ────────────────────────────────
  async updateMe(userId: string, dto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException('User not found');

    Object.assign(user, dto);
    await this.userRepository.save(user);

    return {
      message: 'Profile updated successfully',
      data: this.sanitizeUser(user),
    };
  }

  // ── Change password ───────────────────────────────────
  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException('User not found');

    // Verify current password
    const isMatch = await bcrypt.compare(dto.current_password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Current password is incorrect');
    }

    // Hash and save new password
    user.password = await bcrypt.hash(dto.new_password, 10);
    await this.userRepository.save(user);

    return { message: 'Password changed successfully' };
  }

  // ── Admin — get all users ─────────────────────────────
  async getAllUsers() {
    const users = await this.userRepository.find({
      order: { created_at: 'DESC' },
    });
    return { data: users.map((u) => this.sanitizeUser(u)) };
  }

  // ── Admin — get single user ───────────────────────────
  async getUserById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return { data: this.sanitizeUser(user) };
  }

  // ── Admin — deactivate user ───────────────────────────
  async deactivateUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    user.is_active = false;
    await this.userRepository.save(user);

    return { message: 'User deactivated successfully' };
  }

  // ── Admin — delete user ───────────────────────────────
  async deleteUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    await this.userRepository.remove(user);

    return { message: 'User deleted successfully' };
  }

  // ── Remove password from response ─────────────────────
  private sanitizeUser(user: User) {
    const { password, ...result } = user;
    return result;
  }
}
