import { Sequelize } from 'sequelize';

import sequelize from '../database/connection.js';

const Category = sequelize.define('category',
    {
        name: {
            type: Sequelize.STRING(128),
            allowNull: false,
            unique: true,
            validate: {
                isTooLong: ((name) => {
                    if (name.length > 128) {
                        throw new Error("Field 'name' has exceeded the maximum number of 128 characters!")
                    }
                }),
                isLongEnough: ((name) => {
                    if (name.length === 0) {
                        throw new Error("Field 'name' should not be empty!")
                    }
                }),
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