module.exports = () => {
    RoomStatus = sequelize.define('roomstatus', {
        id: {
            type: Sequelize.STRING(36),
            primaryKey: true,  
            defaultValue: uuid.v4              
        },            
        roomId: {
            type: Sequelize.STRING(36),
        },      
        quantityLeft: {
            type: Sequelize.INTEGER,            
            allowNull: false
        },
        day: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        month: {
            type: Sequelize.INTEGER,
            allowNull: false
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
        tableName: "roomstatus",           
    })   
RoomStatus.sync()
return RoomStatus
}