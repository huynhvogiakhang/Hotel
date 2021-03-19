module.exports = () => {
    Booking = sequelize.define('booking', {
        id: {
            type: Sequelize.STRING(36),
            primaryKey: true,  
            defaultValue: uuid.v4              
        },    
        userId: {
            type: Sequelize.STRING(36),
        },
        roomId: {
            type: Sequelize.STRING(36),
        },      
        quantity: {
            type: Sequelize.INTEGER,            
            allowNull: false
        },
        status: {
            type: Sequelize.INTEGER,
            defaultValue: 1
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
        tableName: "bookings",           
    })   
Booking.sync()
return Booking
}