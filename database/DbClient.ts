import sql from "mssql";

export class DbClient {

    private static pool: sql.ConnectionPool;

    static async getConnection() {

        if (!this.pool) {

            this.pool = await sql.connect({
                server: process.env.DB_SERVER!,
                database: process.env.DB_DATABASE!,
                user: process.env.DB_USER!,
                password: process.env.DB_PASSWORD!,
                port: Number(process.env.DB_PORT),
                options: {
                    trustServerCertificate: true
                }
            });
        }

        return this.pool;
    }
}