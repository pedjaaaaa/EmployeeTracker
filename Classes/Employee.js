class Employee {
    constructor(connection, firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.connection;
    }
    create(cb) {
        const sql = `
            insert into employee set....
        `
        connection.query(sql, (err, result) => {
           // do stuff
           cb(result.insertId);
        });
    }
    delete(connection,cb) {
    }
    read(id, connection, cb) {
        const sql = `
            select from employee where id = ..
        `
        connection.query(sql, (err, result) => {
           // do stuff
            this.id = result.id;
           cb(result.insertId);
        });
    }
    getId() {
        return this.id;
    }
}











