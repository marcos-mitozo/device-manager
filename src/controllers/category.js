import Category from '../models/category.js'

export async function post(req, res) {

    await Category.create({
        name: req.body.name
    })
        .then(() => {
            res.status(201).send({
                message: 'Category has been created!'
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
    await Category.findAll()
        .then(response => {
            res.status(200).send(response)
        })
        .catch(e => {
            res.status(e.status || 500).send(e.message)
        })
}

export const _delete = async (req, res) => {
    const id = req.params.id
    let category = await Category.findByPk(id)
        .catch(e => {
            throw Error(e)
        })

    if (category) {
        await category.destroy()
            .then(() => {
                res.status(200).send({
                    message: `Category '${category.name}' has been successfully deleted!`
                })
            })
            .catch(e => {
                res.status(e.status || 500).send(e.message)
            })
    } else {
        res.status(404).json({
            error: {
                message: "There was no category found for the provided id!",
            }
        })
    }
}
