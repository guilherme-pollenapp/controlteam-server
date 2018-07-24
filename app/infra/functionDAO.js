module.exports = () => {
    return (con) => {
        this.listFunctions = () => {
            return new Promise((resolve,reject) => {
                con.query(
                    `select function_company.*, 
                        position_company.name_position, position_company.id_position,
                        sector_company.name_sector, sector_company.id_sector,
                        company.name_company, company.id_company
                    from function_company
                        inner join position_company on function_company.id_position=position_company.id_position
                        inner join sector_company on position_company.id_sector=sector_company.id_sector
                        inner join company on sector_company.id_company=company.id_company
                        where function_company.visible=1 and position_company.visible=1 and sector_company.visible=1 and company.visible=1`,
                    (err,result) => {
                        if(err)
                            return reject(err);
                        return resolve(result);
                    }
                )
            })
        }

        this.listFunctionsByCompany = (company) => {
            return new Promise((resolve,reject) => {
                con.query(
                    `select function_company.*, 
                        position_company.name_position, position_company.id_position,
                        sector_company.name_sector, sector_company.id_sector,
                        company.name_company, company.id_company
                    from function_company
                        inner join position_company on function_company.id_position=position_company.id_position
                        inner join sector_company on position_company.id_sector=sector_company.id_sector
                        inner join company on sector_company.id_company=company.id_company 
                        where company.id_company in (${company.join(",")}) and function_company.visible=1 and position_company.visible=1 and sector_company.visible=1 and company.visible=1`,
                    (err,result) => {
                        if(err)
                            return reject(err);
                        return resolve(result);
                    }
                )
            })
        }

        this.listFunctionsBySector = (sector) => {
            return new Promise((resolve,reject) => {
                con.query(
                    `select function_company.*, 
                        position_company.name_position, position_company.id_position,
                        sector_company.name_sector, sector_company.id_sector,
                        company.name_company, company.id_company
                    from function_company
                        inner join position_company on function_company.id_position=position_company.id_position
                        inner join sector_company on position_company.id_sector=sector_company.id_sector
                        inner join company on sector_company.id_company=company.id_company
                        where sector_company.id_sector in (${sector.join(",")}) and function_company.visible=1 and position_company.visible=1 and sector_company.visible=1 and company.visible=1`,
                    (err,result) => {
                        if(err)
                            return reject(err);
                        return resolve(result);
                    }
                )
            })
        }

        this.listFunctionsByPosition = (position) => {
            return new Promise((resolve,reject) => {
                con.query(
                    `select function_company.*, 
                        position_company.name_position, position_company.id_position,
                        sector_company.name_sector, sector_company.id_sector,
                        company.name_company, company.id_company
                    from function_company
                        inner join position_company on function_company.id_position=position_company.id_position
                        inner join sector_company on position_company.id_sector=sector_company.id_sector
                        inner join company on sector_company.id_company=company.id_company
                        where position_company.id_position in (${position.join(",")}) and function_company.visible=1 and position_company.visible=1 and sector_company.visible=1 and company.visible=1`,
                    (err,result) => {
                        if(err)
                            return reject(err);
                        return resolve(result);
                    }
                )
            })
        }

        this.listFunctionsByFunctions = (funcs) => {
            return new Promise((resolve,reject) => {
                con.query(
                    `select function_company.*, 
                        position_company.name_position, position_company.id_position,
                        sector_company.name_sector, sector_company.id_sector,
                        company.name_company, company.id_company
                    from function_company
                        inner join position_company on function_company.id_position=position_company.id_position
                        inner join sector_company on position_company.id_sector=sector_company.id_sector
                        inner join company on sector_company.id_company=company.id_company
                        where function_company.id_function in (${funcs.join(",")}) and function_company.visible=1 and position_company.visible=1 and sector_company.visible=1 and company.visible=1`,
                    (err,result) => {
                        if(err)
                            return reject(err);
                        return resolve(result);
                    }
                )
            })
        }

        this.insert = (data) => {
            return new Promise((resolve,reject) => {
                con.query(
                    `insert into function_company SET ?`,
                    data,
                    (err,result) => {
                        if(err)
                            return reject(err);
                        return resolve(result);
                    }
                )
            })
        }

        this.update = (id,data) => {
            return new Promise((resolve,reject) => {
                con.query(
                    `update function_company set ? where id_function='${id}'`,
                    data,
                    (err,result) => {
                        if(err)
                            return reject(err);
                        return resolve(result);
                    }
                )
            })
        }

        this.delete = (id) => {
            return new Promise((resolve,reject) => {
                con.query(
                    `update function_company set visible=0 where id_function='${id}'`,
                    (err,result) => {
                        if(err)
                            return reject(err);
                        return resolve(result);
                    }
                )
            })
        }
        
        return this;
    }
}