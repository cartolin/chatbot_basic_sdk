import { Injectable } from '@nestjs/common';
import { ContactService } from '../contacts/contact.service';
import { ChatLangchainService } from './chat-langchain.service';
import { Contact } from '../contacts/contact.entity';

@Injectable()
export class ChatService {

    constructor(private readonly contactsService: ContactService, private readonly chatLangchainService: ChatLangchainService) { }

    async extractQueryFieldsUsingAI(question: string): Promise<Partial<Contact>> {
        const prompt = `
        Devuelve únicamente un objeto JSON con las claves "name", "phone" y "area".
        No incluyas explicaciones adicionales antes o después del JSON.

        Ejemplo de respuesta si el usuario pregunta:
        "¿Cuál es el teléfono de Juan Pérez?"
        {
        "name": "Juan Pérez",
        "phone": "",
        "area": ""
        }

        No agregues texto adicional. Solo el JSON, y si decides envolverlo en triple-backticks, no agregues más texto fuera de ellos.

        Pregunta del usuario: "${question}"
        `;

        const aiResponse = await this.chatLangchainService.getResponse(prompt);

        const codeBlockRegex = /```json([\s\S]*?)```/i;
        const match = aiResponse.match(codeBlockRegex);

        let possibleJson: string;
        if (match) {
            possibleJson = match[1].trim();
        } else {
            possibleJson = aiResponse.trim();
        }

        try {
            return JSON.parse(possibleJson);
        } catch (error) {
            console.error('Error al parsear JSON:', error, 'Contenido:', possibleJson);
            return {};
        }
    }


    async getResponse(question: string): Promise<string> {
        const queryFields = await this.extractQueryFieldsUsingAI(question);

        const hasSomeField = Object.values(queryFields).some(
            (value) => value && value.toString().trim() !== ''
        );

        if (!hasSomeField) {
            return 'No especificaste ningún criterio (nombre, teléfono o área) para buscar en el registro de contactos.';
        }

        const contacts = await this.contactsService.searchContacts(queryFields);

        if (!contacts || contacts.length === 0) {
            return `No se encontraron contactos que coincidan con tu búsqueda.`;
        }

        let context = '';
        if (contacts && contacts.length > 0) {
            context = contacts
                .map(
                    (c) =>
                        `Nombre: ${c.name}, Teléfono: ${c.phone}, Área: ${c.area}, Descripción: ${c.descripcion}`
                )
                .join(' | ');
        }

        const finalPrompt = context
            ? `Utiliza la siguiente información : ${context}. Ahora responde la siguiente pregunta: ${question}`
            : question;

        return this.chatLangchainService.getResponse(finalPrompt);
    }

}
