import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Contact } from './contact.entity';

@Injectable()
export class ContactService {

    constructor(
        @InjectRepository(Contact)
        private readonly contactRepository: Repository<Contact>,
    ) { }

    async searchContacts(query: Partial<Contact>): Promise<Contact[]> {
        const whereClause: any = {};

        if (query.name && query.name.trim() !== '') {
            whereClause.name = Like(`%${query.name.trim()}%`);
        }

        if (query.phone && query.phone.trim() !== '') {
            whereClause.phone = Like(`%${query.phone.trim()}%`);
        }

        if (query.area && query.area.trim() !== '') {
            whereClause.area = Like(`%${query.area.trim()}%`);
        }

        // Si deseas también realizar búsquedas parciales en "descripcion", agrégalo aquí:
        // if (query.descripcion && query.descripcion.trim() !== '') {
        //   whereClause.descripcion = Like(`%${query.descripcion.trim()}%`);
        // }

        if (Object.keys(whereClause).length === 0) {
            return [];
        }

        // Si todos los campos están vacíos, this.contactRepository.find({ where: {} }) devolverá todos los registros.
        // Para evitar esto, podrías manejar el caso en que no se ingresó ningún campo.

        return await this.contactRepository.find({
            where: whereClause,
        });
    }

    async findContactByPhone(phone: string): Promise<Contact | null> {
        return await this.contactRepository.findOne({ where: { phone } });
    }

    async findContactByName(name: string): Promise<Contact | null> {
        return await this.contactRepository.findOne({ where: { name } });
    }

    async findContactsByDescripcion(descripcion: string): Promise<Contact[]> {
        return await this.contactRepository.find({ where: { descripcion } });
    }

    async findContactsByArea(area: string): Promise<Contact[]> {
        return await this.contactRepository.find({ where: { area } });
    }

}
