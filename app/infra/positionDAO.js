module.exports = () => {
    return (con) => {
        this.listPositions = () => {
            return new Promise((resolve,reject) => {
                con.query(
                    `select position_company.*,sector_company.name_sector,company.name_company from position_company 
                        inner join sector_company on position_company.id_sector=sector_company.id_sector
                        inner join company on sector_company.id_company=company.id_company
                        where position_company.visible=1 and sector_company.visible=1 and company.visible=1
                    `,
                    (err,result) => {
                        if(err)
                            return reject(err);
                        
                        return resolve(result);
                    })
            })
        }

        this.listPositionsById = (id) => {
            return new Promise((resolve,reject) => {
                con.query(
                    `select position_company.*,sector_company.name_sector,company.name_company from position_company 
                        inner join sector_company on position_company.id_sector=sector_company.id_sector
                        inner join company on sector_company.id_company=company.id_company
                        where position_company.id_position in (${id.join(",")}) and position_company.visible=1 and sector_company.visible=1 and company.visible=1
                    `,
                    (err,result) => {
                        if(err)
                            return reject(err);
                        
                        return resolve(result);
                    })
            })
        }

        this.listPositionsBySector = (id) => {
            return new Promise((resolve,reject) => {
                con.query(
                    `select position_company.*,sector_company.name_sector,company.name_company from position_company 
                        inner join sector_company on position_company.id_sector=sector_company.id_sector
                        inner join company on sector_company.id_company=company.id_company
                        where sector_company.id_sector in (${id.join(",")}) and position_company.visible=1 and sector_company.visible=1 and company.visible=1
                    `,
                    (err,result) => {
                        if(err)
                            return reject(err);
                        
                        return resolve(result);
                    })
            })
        }

        this.listPositionsByCompany = (id) => {
            return new Promise((resolve,reject) => {
                con.query(
                    `select position_company.*,sector_company.name_sector,company.name_company from position_company 
                        inner join sector_company on position_company.id_sector=sector_company.id_sector
                        inner join company on sector_company.id_company=company.id_company
                        where company.id_company in (${id.join(",")}) and position_company.visible=1 and sector_company.visible=1 and company.visible=1
                    `,
                    (err,result) => {
                        if(err)
                            return reject(err);
                        
                        return resolve(result);
                    })
            })
        }

        this.listPositionsBySectorAndCompany = (company,sector) => {
            return new Promise((resolve,reject) => {
                con.query(
                    `select position_company.*,sector_company.name_sector,company.name_company from position_company 
                        inner join sector_company on position_company.id_sector=sector_company.id_sector
                        inner join company on sector_company.id_company=company.id_company
                        where company.id_company in (${company.join(",")}) and 
                        sector_company.id_sector in (${sector.join(",")}) and position_company.visible=1 and sector_company.visible=1 and company.visible=1
                    `,
                    (err,result) => {
                        if(err)
                            return reject(err);
                        
                        return resolve(result);
                    })
            })
        }

        this.insert = (position) => {
            return new Promise((resolve,reject) => {
                con.query(
                    `INSERT INTO position_company SET ?`,
                    position,
                    (err,result) => {
                        if(err)
                            return reject(err);
                        
                        return resolve(result);
                    })
            })
        }

        this.update = (id,position) => {
            return new Promise((resolve,reject) => {
                con.query(
                    `UPDATE position_company SET ? WHERE id_position='${id}'`,
                    position,
                    (err,result) => {
                        if(err)
                            return reject(err);
                        
                        return resolve(result);
                    })
            })
        }

        this.delete = (id) => {
            return new Promise((resolve,reject) => {
                con.query(
                    `UPDATE position_company SET visible=0 WHERE id_position='${id}'`,
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