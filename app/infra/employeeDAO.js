module.exports = () => {
    return (con) => {
        this.listEmployees = () => new Promise((resolve, reject) => {
            con.query(`
                select user.*,company.name_company,company.id_company,
                function_company.name_function,function_company.id_function, function_company.id_position
                from employee_company
                inner join user on user.id_user=employee_company.id_user
                inner join function_company on function_company.id_function=employee_company.id_function
                inner join company on company.id_company=employee_company.id_company
            `, (err, result) => {
                    if (err)
                        return reject(err)
                    return resolve(result);
                })
        })

        this.listEmployeesByEmployee = (id) => new Promise((resolve, reject) => {
            con.query(`
                select user.*,company.name_company,company.id_company,
                function_company.name_function,function_company.id_function, function_company.id_position
                from employee_company
                inner join user on user.id_user=employee_company.id_user
                inner join function_company on function_company.id_function=employee_company.id_function
                inner join company on company.id_company=employee_company.id_company
                where employee_company.id_user in (${id.join(",")})
            `, (err, result) => {
                    if (err)
                        return reject(err)
                    return resolve(result);
                })
        })

        this.listEmployeesByCompany = (company) => new Promise((resolve, reject) => {
            con.query(`
                select user.*,company.name_company,company.id_company,
                function_company.name_function,function_company.id_function, function_company.id_position
                from employee_company
                inner join user on user.id_user=employee_company.id_user
                inner join function_company on function_company.id_function=employee_company.id_function
                inner join company on company.id_company=employee_company.id_company
                where company.id_company in (${company.join(",")})
            `, (err, result) => {
                    if (err)
                        return reject(err)
                    return resolve(result);
                })
        })

        this.listEmployeesByFunction = (func) => new Promise((resolve, reject) => {
            con.query(`
                select user.*,company.name_company,company.id_company,
                function_company.name_function,function_company.id_function, function_company.id_position
                from employee_company
                inner join user on user.id_user=employee_company.id_user
                inner join function_company on function_company.id_function=employee_company.id_function
                inner join company on company.id_company=employee_company.id_company
                where function_company.id_function in (${func.join(",")})
            `, (err, result) => {
                    if (err)
                        return reject(err)
                    return resolve(result);
                })
        })

        this.insert = (data) => new Promise((resolve, reject) => {
            con.query(`
                insert INTO employee_company SET ?
            `,
                data,
                (err, result) => {
                    if (err)
                        return reject(err);
                    return resolve(result);
                })
        })

        this.update = (id, company, data) => new Promise((resolve, reject) => {
            con.query(`
                update employee_company SET ? where id_user='${id}' and id_company='${company}'
            `,
                data,
                (err, result) => {
                    if (err)
                        return reject(err);
                    return resolve(result);
                })
        })

        this.delete = (user, company) => new Promise((resolve, reject) => {
            con.query(`
                delete from employee_company where id_user='${user} and id_company=${company}'
            `,
                (err, result) => {
                    if (err)
                        return reject(err);
                    return resolve(result);
                })
        })

        this.getName = async (user) => new Promise((resolve, reject) => {
            con.query(`
                select id_user, firstname_user,lastname_user from user where id_user='${user}'
            `, (err, result) => {
                    if (err)
                        return reject(err);
                    return resolve(result);
                })
        })

        return this;
    }
}