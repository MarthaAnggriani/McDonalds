const { Item, User, Category, Ingredient } = require("../models")
const { generateAccessToken } = require("../helpers/jwt");

class Controller {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) throw ({ name: "ValidationError" })
            // mencari data berdasarkan email
            const user = await User.findOne({ where: { email } });
            if (!user) throw ({ name: "UserNotFound" })

            // check password
            const isValidated = user.verifyPassword(password);
            if (!isValidated) throw ({ name: "InvalidInput" })

            const access_token = generateAccessToken(user);
            res.status(200).json({ access_token: access_token });
        }
        catch (error) {
            next(error);
        }
    }
    static async register(req, res, next) {
        try {
            const { email, password, phoneNumber, address } = req.body;
            if (!email || !password) { throw ({ name: "ValidationError" }) }

            const customer = await User.create({
                email,
                password,
                phoneNumber,
                address
            });
            res.status(201).json({ id: customer.id, email: customer.email });
        } catch (error) {
            next(error);
        }
    }

    static async getCategories(req, res, next) {
        try {
            const categories = await Category.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            })
            res.status(200).json(categories)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    static async getCategoryById(req, res, next) {
        try {
            const { id } = req.params;
            const category = await Category.findOne({
                where: { id },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            })
            res.status(200).json(category)
        } catch (error) {
            console.log(error);
            next(error)
        }

    }
    static async createCategory(req, res, next) {
        const { name } = req.body;
        try {
            const data = await Category.create({ name })
            res.status(201).json(data);
        }
        catch (error) {
            next(error)
        }

    }
    static async deleteCategory(req, res, next) {
        try {
            const { id } = req.params;
            const category = await Category.findOne({ where: { id } })
            if (!category) throw ({ name: "NotFound" });
            await Category.destroy({ where: { id } });
            res.status(200).json({ message: `${category.name} success to delete` });
        } catch (error) {
            next(error);
        }
    }

    static async editCategory(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            await Category.update({ name }, { where: { id } })
            const message = `Category with id ${id} is updated`;
            res.status(200).json({ message });

        } catch (error) {
            next(error);
        }
    }

    static async getItems(req, res, next) {
        try {
            const items = await Item.findAll({
                include: [
                    {
                        model: Category,
                        attributes: {
                            include: ['id', 'name']
                        }
                    },
                    {
                        model: User,
                        attributes: {
                            include: ['id', 'username']
                        }
                    }
                ],
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            })
            res.status(200).json(items)
        } catch (error) {
            next(error);
        }
    }
    static async getItemById(req, res, next) {
        try {
            const { id } = req.params;
            const item = await Item.findOne({
                where: { id },
                include: [{
                    model: Category,
                    attributes: {
                        include: ["id", "name"]
                    }
                },
                {
                    model: User,
                    attributes: {
                        include: ["id", "username", "email"]
                    }
                },
                {
                    model: Ingredient,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                }]
            })
            res.status(200).json(item)
        } catch (error) {
            console.log(error);
        }

    }

    static async createItem(req, res, next) {
        try {
            await Item.createItem(req);
            res.status(201).json({ message: "Item successfully created" });
        } catch (error) {
            next(error);
        }
    }

    static async editItem(req, res, next) {
        try {
            const { id } = req.params;
            const { name, description, price, imgUrl, categoryId } = req.body;
            const authorId = req.user.id
            const data = { name, description, price, imgUrl, categoryId, authorId }

            const updatedItem = await Item.update(data, { where: { id } });
            const message = `Menu with id ${id} is updated`;
            res.status(200).json({ message, updatedItem });
        } catch (error) {
            next(error);
        }
    }

    static async deleteItem(req, res, next) {
        try {
            const { id } = req.params;
            const item = await Item.findOne({ where: { id } })
            if (!item) throw ({ name: "NotFound" });
            await Item.destroy({ where: { id } });
            res.status(200).json({ message: `${item.name} success to delete` });
        } catch (error) {
            next(error);
        }
    }

}

module.exports = Controller