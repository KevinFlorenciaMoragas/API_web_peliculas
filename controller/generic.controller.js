const createItem = async (req, res, Model) => {
    try {
        const item = await Model.create(req.body)
        res.status(201).json(item)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const readAllItems = async (req, res, Model) => {
    try {
        const item = await Model.findAll()
        res.json(item)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const createItemWithImage = async (req, res, Model) => {
    try {
        const photo = req.file.filename
        console.log(photo)
        console.log(req.body)
        const itemData = {
            ...req.body,
            photo
        }
        const item = await Model.create(itemData)
        console.log(item)
        res.status(201).json(item)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const readItem = async (req, res, Model) => {
    const item = await Model.findByPk(req.params.id)
    try {
        if (item) {
            res.json(item)
        } else {
            return res.status(404).json({ error: `Item not found` })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const updateItem = async (req, res, Model) => {
    try {
        const item = await Model.findByPk(req.params.id)
        if (!item) {
            return res.status(404).json({ error: `Item not found` })
        }
        await item.update(req.body)
        res.json(item)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const deleteItem = async (req, res, Model) => {
    try {
        const item = await Model.findByPk(req.params.id)
        if (!item) {
            return res.status(404).json({ error: `${Model} not found` })
        }
        await item.destroy()
        res.json({ message: Model + "delete succesfully" })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = {
    createItem,
    readAllItems,
    readItem,
    deleteItem,
    updateItem,
    createItemWithImage
}