import { DbClient } from "../DbClient";
import { UserQueries } from "../Queries/UserQueries";

export class UserDbService {

    async getUserById(id: number) {

        const pool = await DbClient.getConnection();

        const result = await pool.request().query(
            UserQueries.getUserById(id)
        );

        return result.recordset;
    }
}