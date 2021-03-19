module.exports = () => {
    let salt = bcrypt.genSaltSync(10),
        Account = sequelize.define('account', {
            id: {
                type: Sequelize.STRING(36),
                primaryKey: true,
                defaultValue: uuid.v4
            },    
            fullName: {
                type: Sequelize.STRING(50)
            },
            email: {
                type: Sequelize.STRING(100)
            },
            phone: {
                type: Sequelize.STRING(12)
            },            
            password: {
                type: Sequelize.STRING(255)
            },         
            role: {
                type: Sequelize.STRING(50),
                defaultValue: "user",
            },
            active: {
                type: Sequelize.INTEGER,
                defaultValue: 1
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        }, {
            tableName: "accounts",
            
        })
    Account.prototype.validPassword = (password, user) => bcrypt.compareSync(password, user.dataValues.password)
    Account.hashPassword = (password) => bcrypt.hashSync(password, salt)
    Account.sync()
    return Account
}