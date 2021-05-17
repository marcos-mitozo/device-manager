import { Sequelize } from 'sequelize';

import sequelize from '../database/connection.js';
import { isTooLong, isLongEnough } from '../utils/fieldValidator.js';

const Category = sequelize.define('category',
    {
        name: {
            type: Sequelize.STRING(128),
            allowNull: false,
            unique: true,
            validate: {
                isLongEnough: ((name) => { isLongEnough('name', name) }),
                isTooLong: ((name) => { isTooLong('name', name, 128) }),
                isUnique: (async (name) => {
                    return (Category.findOne({ where: { name } })
                        .then((category) => {
                            if (category) {
                                throw new Error(`A category named '${category.name}' already exists!`)
                            }
                        })
                    )
                })
            },
        }
    }
)

export default Category