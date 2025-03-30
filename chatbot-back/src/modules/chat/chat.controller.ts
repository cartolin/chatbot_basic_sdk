import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Post('query')
    async query(@Body('question') question: string): Promise<{ answer: string }> {
        const answer = await this.chatService.getResponse(question);
        return { answer };
    }
}
