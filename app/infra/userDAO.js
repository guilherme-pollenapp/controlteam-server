module.exports = () => {
    return (con) => {
        this.listUsers = () => new Promise((resolve, reject) => {
            con.query(`
                select * from user
            `,
                (err, result) => {
                    if (err)
                        return reject(err)
                    return resolve(result);
                })
        })

        this.listById = (id) => new Promise((resolve, reject) => {
            con.query(`
                select * from user where id_user=?
            `,id,
                (err, result) => {
                    if (err)
                        return reject(err)
                    return resolve(result);
                })
        })

        this.userExists = (id) => new Promise((resolve, reject) => {
            con.query(`
                select id_user from user where cpf_user=?
            `,id,
                (err, result) => {
                    if (err)
                        return reject(err)
                    return resolve(result);
                })
        })

        this.insert = (data) => new Promise((resolve, reject) => {
            con.query(`
                insert into user SET ?
            `,
                data,
                (err, result) => {
                    if (err)
                        return reject(err)
                    return resolve(result);
                })
        })

        this.update = (id, data) => new Promise((resolve, reject) => {
            con.query(`
                update user SET ? where id_user='${id}'
            `,
                data,
                (err, result) => {
                    if (err)
                        return reject(err)
                    return resolve(result);
                })
        })

        return this;
    }
}