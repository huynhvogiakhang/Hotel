module.exports = () => {
    Room = sequelize.define('room', {
        id: {
            type: Sequelize.STRING(36),
            primaryKey: true,  
            defaultValue: uuid.v4              
        },    
        name: {
            type: Sequelize.STRING(36),
        },
        description: {
            type: Sequelize.STRING(36),
        },
        type: {
            type: Sequelize.STRING(36),            
            allowNull: false
        },
        image: {
            type: Sequelize.STRING(36),
        },
        quantity: {
            type: Sequelize.INTEGER,            
            allowNull: false
        },
        price: {
            type: Sequelize.STRING(36),
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
        tableName: "rooms",           
    })   
Room.sync()
return Room
}