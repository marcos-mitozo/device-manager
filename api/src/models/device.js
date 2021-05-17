import { Sequelize } from 'sequelize';

import sequelize from '../database/connection.js';

import { isLongEnough, isTooLong, isPositive, isNumber } from '../utils/fieldValidator.js';

const Device = sequelize.define('device',
    {
        color: {
            type: Sequelize.STRING(16),
            allowNull: false,
            validate: {
                isLongEnough: ((color) => { isLongEnough('color', color) }),
                isTooLong: ((color) => { isTooLong('color', color, 16) })
            },
        },
        partNumber: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isLongEnough: ((partNumber) => { isLongEnough('part number', partNumber) }),
                isPositive: ((partNumber) => { isPositive('part number', partNumber, 16) }),
                isNumber: ((partNumber) => { isNumber('Part number', partNumber) })
            }
        },
    }
)

export default Device