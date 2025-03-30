// src/seed.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Contact } from '../modules/contacts/contact.entity';

// Cargar variables de entorno (asegúrate de tener un .env con la configuración de MySQL)
config();

// Configuración del DataSource para seeding (puedes ajustar según tu configuración actual)
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT??'0', 10) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'chatbot',
    entities: [Contact],
    synchronize: true, // Crea las tablas automáticamente en desarrollo
    logging: false,
});

// Datos de ejemplo para poblar la tabla
const seedData = [
    {
        id: 1,
        name: "Juan Pérez",
        phone: "5551234567",
        area: "Ventas",
        descripcion: "Encargado de ventas nacionales."
    },
    {
        id: 2,
        name: "María García",
        phone: "5559876543",
        area: "Soporte",
        descripcion: "Responsable de atención al cliente."
    },
    {
        id: 3,
        name: "Carlos Rodríguez",
        phone: "5554567890",
        area: "Desarrollo",
        descripcion: "Desarrollador de software."
    },
    {
        id: 4,
        name: "Ana Martínez",
        phone: "5556789012",
        area: "Marketing",
        descripcion: "Especialista en campañas publicitarias."
    },
    {
        id: 5,
        name: "Luis Sánchez",
        phone: "5552345678",
        area: "Finanzas",
        descripcion: "Gestor de recursos financieros."
    },
    {
        id: 6,
        name: "Marta López",
        phone: "5553456789",
        area: "Recursos Humanos",
        descripcion: "Coordinadora de personal y formación."
    },
    {
        id: 7,
        name: "Pedro Gómez",
        phone: "5557890123",
        area: "Administración",
        descripcion: "Encargado de gestión administrativa."
    },
    {
        id: 8,
        name: "Isabel Díaz",
        phone: "5558901234",
        area: "Legal",
        descripcion: "Asesora legal de la empresa."
    },
    {
        id: 9,
        name: "Jorge Ruiz",
        phone: "5559012345",
        area: "Operaciones",
        descripcion: "Responsable de logística y operaciones."
    },
    {
        id: 10,
        name: "Lucía Fernández",
        phone: "5550123456",
        area: "IT",
        descripcion: "Soporte técnico y mantenimiento de sistemas."
    }
];

async function seed() {
    try {
        // Inicializar la conexión con la base de datos
        const dataSource = await AppDataSource.initialize();
        const contactRepository = dataSource.getRepository(Contact);

        for (const data of seedData) {
            // Verificar si el contacto ya existe para evitar duplicados
            const existing = await contactRepository.findOne({ where: { phone: data.phone } });
            if (!existing) {
                // Ten en cuenta: nuestra entidad Contact tiene la propiedad "role".
                // Aquí mapeamos "descripcion" a "role" para simplificar; 
                // alternativamente, puedes modificar la entidad para usar "descripcion".
                const contact = contactRepository.create({
                    id: data.id,
                    name: data.name,
                    phone: data.phone,
                    area: data.area,
                    descripcion: data.descripcion,
                });
                await contactRepository.save(contact);
                console.log(`Guardado: ${contact.name}`);
            }
        }
        console.log('Seeding completado.');
        await dataSource.destroy();
    } catch (err) {
        console.error('Error en el seeding:', err);
    }
}

seed();
