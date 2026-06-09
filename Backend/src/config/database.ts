import { Pool } from 'pg';

export const db = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "2026",
    database: "disagro_catalogo", 
    
});