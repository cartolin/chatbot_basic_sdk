import { Module } from '@nestjs/common';
import { ChatLangchainService } from './chat-langchain.service';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ContactsModule } from '../contacts/contacts.module';

@Module({
  imports: [ContactsModule],
  providers: [ChatLangchainService, ChatService],
  controllers: [ChatController]
})
export class ChatModule {}
