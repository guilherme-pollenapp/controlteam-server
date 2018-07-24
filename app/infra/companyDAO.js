var ObjectId = require("mongodb").ObjectId;

module.exports = () => {
    return (con) => {
        this.listCompany = () => {
            return new Promise((resolve,reject) => {
                con.query(
                    "select * from company where visible=1",
                    (err,result) => {
                        if(err)
                            return reject(err);
                        
                        return resolve(result);
                    })
            })
        }

        this.verifyCNPJ = (cnpj) => {
            return new Promise((resolve, reject) => {
                con.query(
                    "select id_company from company where cnpj_company=?",
                    cnpj,
                    (err, result) => {
                        if (err)
                            return reject(err);

                        return resolve(result);
                    })
            })
        }

        this.listCompanyId = (id) => {
            return new Promise((resolve,reject) => {
                con.query(
                    `select * from company where id_company='${id}' and visible=1`,
                    (err,result) => {
                        if(err)
                            return reject(err);
                        
                        return resolve(result);
                    })
            })
        }

        this.listCompanyRh = (ids) => {
            return new Promise((resolve,reject) => {
                con.query(
                    `select * from company where id_company in (${ids.join(",")}) and visible=1`,
                    (err,result) => {
                        if(err)
                            return reject(err);
                        
                        return resolve(result);
                    })
            })
        }

        this.insertCompany = (data) => {
            return new Promise((resolve,reject) => {
                con.query(
                    `INSERT INTO company SET ?`,
                    data,
                    (err,result) => {
                        if(err)
                            return reject(err);
                        
                        return resolve(result);
                    })
            })
        }

        this.updateCompanyMongo = (db,id,result) => new Promise((resolve,reject)=>{
            db.collection("company").update({
                _id: new ObjectId(id)
            }, {
                    $addToSet: {
                        managed_companies: result
                    }
                }, (err, doc) => {
                    if(err)
                        return reject(err)
                    return resolve(doc);
                })
        })

        this.updateCompany = (id,data) => {
            return new Promise((resolve,reject) => {
                con.query(
                    `UPDATE company SET ? where id_company=${id}`,
                    data,
                    (err,result) => {
                        if(err)
                            return reject(err);
                        
                        return resolve(result);
                    })
            })
        }

        this.deleteCompany = (id) => {
            return new Promise((resolve,reject) => {
                con.query(
                    `UPDATE company SET visible=0 where id_company=${id}`,
                    (err,result) => {
                        if(err)
                            return reject(err);
                        
                        return resolve(result);
                    })
            })
        }

        return this;
    }
}