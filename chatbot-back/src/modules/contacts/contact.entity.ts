import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 20 })
    phone: string;

    @Column({ length: 100 })
    area: string;

    @Column({ length: 250 })
    descripcion: string;
}