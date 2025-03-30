import { Test, TestingModule } from '@nestjs/testing';
import { ChatLangchainService } from './chat-langchain.service';

describe('ChatLangchainService', () => {
  let service: ChatLangchainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatLangchainService],
    }).compile();

    service = module.get<ChatLangchainService>(ChatLangchainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
