import Device from '../models/device.js'
import Category from '../models/category.js'

export async function post(req, res) {

    await Device.create({
        color: req.body.color,
        partNumber: req.body.partNumber,
        categoryId: req.body.categoryId
    })
        .then(() => {
            res.status(201).send({
                message: 'Device has been created!'
            })
        })
        .catch(e => {
            res.status(e.status || 500).json({
                error: {
                    message: e.message || serverErrorMsg,
                }
            })
        })

}

export async function get(_req, res) {
    await Device.findAll({ include: Category })
        .then(response => {
            res.status(200).send(response)
        })
        .catch(e => {
            res.status(e.status || 500).send(e.message)
        })
}

export const _delete = async (req, res) => {
    const id = req.params.id
    let device = await Device.findByPk(id)
        .catch(e => {
            throw Error(e)
        })

    if (device) {
        await device.destroy()
            .then(() => {
                res.status(200).send({
                    message: `Device '${device.partNumber}' has been successfully deleted!`
                })
            })
            .catch(e => {
                res.status(e.status || 500).send(e.message)
            })
    } else {
        res.status(404).json({
            error: {
                message: "There was no device found for the provided id!",
            }
        })
    }
}
