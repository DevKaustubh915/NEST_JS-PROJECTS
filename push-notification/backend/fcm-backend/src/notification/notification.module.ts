import { Module } from '@nestjs/common';
import { NotificationsController } from './notification.controller';
import { NotificationsService } from './notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserToken } from './entities/user-token.entity';
import { FirebaseAdminService } from 'src/firebase/firebase-admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserToken])],
  controllers: [NotificationsController],
  providers: [NotificationsService, FirebaseAdminService],
})
export class NotificationModule {}
