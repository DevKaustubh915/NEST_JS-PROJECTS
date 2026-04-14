// src/notifications/notifications.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserToken } from './entities/user-token.entity';
import { FirebaseAdminService } from 'src/firebase/firebase-admin.service';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(UserToken)
    private userTokenRepository: Repository<UserToken>,
    private firebaseAdminService: FirebaseAdminService,
  ) {}

  // Save FCM token to database
  async saveToken(token: string, userId?: string) {
    const userToken = this.userTokenRepository.create({ token, userId });
    await this.userTokenRepository.save(userToken);
    return { message: 'Token saved successfully' };
  }

  // Send notification to a specific token
  async sendNotification(token: string, title: string, body: string) {
    const message = {
      token,
      notification: { title, body },
    };

    const response = await this.firebaseAdminService
      .getMessaging()
      .send(message);

    return { message: 'Notification sent', response };
  }

  // Send notification to a user by userId
  async sendNotificationToUser(userId: string, title: string, body: string) {
    // Find all tokens for this user
    const userTokens = await this.userTokenRepository.find({
      where: { userId },
    });

    if (!userTokens.length) {
      return { message: 'No tokens found for this user' };
    }

    // Send to all their devices
    const promises = userTokens.map((ut) =>
      this.sendNotification(ut.token, title, body),
    );

    await Promise.all(promises);
    return { message: `Notification sent to ${userTokens.length} device(s)` };
  }
}