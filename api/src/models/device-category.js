
import Device from './device.js';
import Category from './category.js';

Category.hasMany(
    Device,
    {
        foreignKey: {
            allowNull: true
        },
        onDelete: 'cascade'
    }),

Device.belongsTo(
    Category,
    {
        foreignKey: {
            allowNull: false
        }
    })

export { Device, Category }