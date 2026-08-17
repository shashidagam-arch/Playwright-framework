export class UserQueries {

    static getUserById(id: number) {

        return `
            SELECT *
            FROM Users
            WHERE Id = ${id}
        `;
    }
}