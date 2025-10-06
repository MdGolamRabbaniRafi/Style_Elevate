import { DataSource } from 'typeorm';
export declare class DatabaseService {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    clearDatabase(): Promise<{
        message: string;
    }>;
}
