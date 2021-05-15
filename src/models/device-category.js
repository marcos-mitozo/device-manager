
import Device from './device.js';
import Category from './category.js';

Category.hasMany(
    Device,
    {
        foreignKey: {
            allowNull: true
        }
    })

Device.belongsTo(
    Category,
    {
        foreignKey: {
            allowNull: false
        }
    })

export { Device, Category }