// src/modules/contacts/contact.service.int.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactService } from './contact.service';
import { Contact } from './contact.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ContactService Integration Tests', () => {
  let service: ContactService;
  let repository: Repository<Contact>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // Usamos SQLite en memoria para pruebas
        TypeOrmModule.forRoot({
          type: 'mysql',
          database: 'chatbot',
          username: 'root',
          password: '',
          port: 3306,
          dropSchema: true,
          entities: [Contact],
          synchronize: true,
          logging: false,
        }),
        TypeOrmModule.forFeature([Contact]),
      ],
      providers: [ContactService],
    }).compile();

    service = module.get<ContactService>(ContactService);
    repository = module.get<Repository<Contact>>(getRepositoryToken(Contact));
  });

  afterEach(async () => {
    // Limpiamos la tabla de contactos después de cada prueba
    await repository.clear();
  });

  it('debe retornar un contacto cuando se busca por teléfono', async () => {
    // Creamos e insertamos un contacto en la base de datos real (en memoria)
    const newContact = repository.create({
      name: 'Alice Smith',
      phone: '5550001',
      area: 'Marketing',
      descripcion: 'Director',
    });
    await repository.save(newContact);

    // Usamos el servicio para buscar el contacto por teléfono
    const result = await service.findContactByPhone('5550001');
    expect(result).not.toBeNull();
    expect(result!.name).toEqual('Alice Smith');
  });

  it('debe retornar un contacto cuando se busca por nombre', async () => {
    // Insertamos un contacto
    const newContact = repository.create({
      name: 'Bob Johnson',
      phone: '5550002',
      area: 'Ventas',
      descripcion: 'Ejecutivo',
    });
    await repository.save(newContact);

    // Buscamos por nombre
    const result = await service.findContactByName('Bob Johnson');
    expect(result).toBeDefined();
    expect(result!.phone).toEqual('5550002');
  });

  it('debe retornar una lista de contactos según la descripción', async () => {
    // Insertamos dos contactos con la misma descripción
    const contact1 = repository.create({
      name: 'Carlos Ruiz',
      phone: '5550003',
      area: 'Finanzas',
      descripcion: 'Gerente',
    });
    const contact2 = repository.create({
      name: 'Diana Reyes',
      phone: '5550004',
      area: 'Finanzas',
      descripcion: 'Gerente',
    });
    await repository.save(contact1);
    await repository.save(contact2);

    const result = await service.findContactsByDescripcion('Gerente');
    expect(result).toHaveLength(2);
    expect(result[0].descripcion).toEqual('Gerente');
  });

  it('debe retornar una lista de contactos según el área', async () => {
    // Insertamos contactos en áreas distintas
    const contact1 = repository.create({
      name: 'Eva Morales',
      phone: '5550005',
      area: 'Soporte',
      descripcion: 'Técnica',
    });
    const contact2 = repository.create({
      name: 'Fernando López',
      phone: '5550006',
      area: 'Soporte',
      descripcion: 'Especialista',
    });
    await repository.save(contact1);
    await repository.save(contact2);

    const result = await service.findContactsByArea('Soporte');
    expect(result).toHaveLength(2);
    expect(result[0].area).toEqual('Soporte');
  });
});
