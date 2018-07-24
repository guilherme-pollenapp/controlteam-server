module.exports = () => {
    return (con) => {
        this.listSectors = () => {
            return new Promise((resolve,reject) => {
                con.query(
                    `select sector_company.*,company.name_company from sector_company,company where 
                    sector_company.id_company = company.id_company and sector_company.visible=1 and company.visible=1`,
                    (err,result) => {
                        if(err)
                            return reject(err);
                        
                        return resolve(result);
                    })
            })
        }

        this.listSectorsById = (id) => {
            return new Promise((resolve,reject) => {
                con.query(
                    `select sector_company.*,company.name_company from sector_company,company where 
                    sector_company.id_company = company.id_company and id_sector in (${id.join(",")}) and sector_company.visible=1 and company.visible=1`,
                    (err,result) => {
                        if(err)
                            return reject(err);
                        
                        return resolve(result);
                    })
            })
        }

        this.listSectorsByCompany = (id) => {
            return new Promise((resolve,reject) => {
                con.query(
                    `select sector_company.*,company.name_company from (sector_company 
                    INNER JOIN company ON sector_company.id_company = company.id_company)
                    where sector_company.id_company in (${id.join(",")}) and sector_company.visible=1 and company.visible=1`,
                    (err,result) => {
                        if(err)
                            return reject(err);
                        
                        return resolve(result);
                    })
            })
        }

        this.insertSector = (data) => {
            return new Promise((resolve,reject) => {
                con.query(
                    `INSERT INTO sector_company SET ?`,
                    data,
                    (err,result) => {
                        if(err)
                            return reject(err);
                        
                        return resolve(result);
                    })
            })
        }

        this.updateSector = (id,data) => {
            return new Promise((resolve,reject) => {
                con.query(
                    `UPDATE sector_company SET ? where id_sector ='${id}'`,
                    data,
                    (err,result) => {
                        if(err)
                            return reject(err);
                        
                        return resolve(result);
                    })
            })
        }

        this.deleteSector = (id) => {
            return new Promise((resolve,reject) => {
                con.query(
                    `UPDATE sector_company SET visible=0 where id_sector ='${id}'`,
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