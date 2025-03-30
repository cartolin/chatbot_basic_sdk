import { Injectable } from '@nestjs/common';
import { ChatDeepSeek } from '@langchain/deepseek';

@Injectable()
export class ChatLangchainService {
    constructor() { }

    async getResponse(question: string): Promise<string> {
        const model = new ChatDeepSeek({
            apiKey: process.env.DEEPSEEK_API_KEY,
            model: process.env.DEEPSEEK_API_NAME,
        });

        const messages = [
            {
                role: 'system',
                content: `
                Eres un asistente especializado en información de contactos internos registrados en nuestra base de datos.
                Reglas que debes respetar:
                1. Solo provee datos (nombre, teléfono, área, descripción) de los contactos que aparecen en la base de datos.
                2. No proporciones datos personales o información confidencial que no esté en la base de datos oficial.
                3. No respondas sobre temas externos a los contactos o información corporativa interna (fuera de tu base de datos).
                4. Si la pregunta no está relacionada con la información de contactos disponibles, responde cortésmente que solo manejas información de la base de datos interna.
                5. Evita conversar sobre detalles de la empresa u otros temas que no sean la información de contactos internos.`,
            },
            {
                role: 'user',
                content: question,
            },
        ];

        const res = await model.invoke(messages);

        if (res && typeof res === 'object' && 'content' in res) {
            return res.content as string;
        }

        throw new Error("No valid response received from DeepSeek");
    }
}
