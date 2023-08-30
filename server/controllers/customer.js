const { Item, User, Category, Ingredient } = require("../models")
class Controller {
    static async getItems(req, res, next) {
        try {
            const items = await Item.findAll({
                include: [{
                    model: Category,
                    attributes: {
                        include: ['id', 'name']
                    }
                }],
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            })
            res.status(200).json(items)
        } catch (error) {
            next(error);
        }
    }

    static async getItemDetail(req, res, next) {
        try {
            const { id } = req.params;
            const item = await Item.findOne({
                where: { id },
                include: [{
                    model: Category,
                    attributes: ['id', 'name']
                },
                {
                    model: User,
                    attributes: ['id', 'email', 'username']
                },
                {
                    model: Ingredient,
                    attributes: ['id', 'name', 'imgUrl']
                }],
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            })
            res.status(200).json(item)
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = Controller