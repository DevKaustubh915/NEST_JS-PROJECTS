// src/notifications/notifications.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notification.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // React app calls this to save the token
  @Post('save-token')
  saveToken(@Body() body: { token: string; userId?: string }) {
    return this.notificationsService.saveToken(body.token, body.userId);
  }

  // Call this to send a notification to a specific token
  @Post('send')
  sendNotification(
    @Body() body: { token: string; title: string; body: string },
  ) {
    return this.notificationsService.sendNotification(
      body.token,
      body.title,
      body.body,
    );
  }

  // Call this to send notification to a user by userId
  @Post('send-to-user')
  sendToUser(@Body() body: { userId: string; title: string; body: string }) {
    return this.notificationsService.sendNotificationToUser(
      body.userId,
      body.title,
      body.body,
    );
  }
}
