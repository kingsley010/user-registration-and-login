import Item from '../models/itemModel';

class ItemController {

    /**
     * @method getItems
     * @description get all items
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} JSON API Response
     */
    static getItems(req, res) {
        Item.find()
            .sort({ datefield: -1 })
            .then(item => res.json(item));
    }

    /**
     * @method editItem
     * @description get one item
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} JSON API Response
     */
    static getOneItem(req, res) {
        Item.findById(req.params.id)
          .then(item => res.json(item))
          .catch((err) => console.log(err));
    }   

    /**
     * @method addItem
     * @description add an item
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} JSON API Response
     */
    static addItem(req, res) {
        const newItem = new Item({
            name: req.body.name,
            description: req.body.description,
            note: req.body.note
        });

        newItem.save()
            .then(item => res.json(item));
    }

    /**
     * @method editItem
     * @description edit an items
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} JSON API Response
     */
    static editItem(req, res) {
        const item = {
            name: req.body.name,
            description: req.body.description,
            note: req.body.note
        }

        Item.updateOne({ _id: req.params.id}, item)
            .then((item) => {
             res.json(item);
        }).catch((err) => console.log(err));
    }
    
    /**
     * @method deleteItem
     * @description delete an item
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} JSON API Response
     */
    static deleteItem(req, res) {
        Item.findById(req.params.id)
            .then(item => item.remove().then(() => res.json({success: true})))
            .catch(err => res.status(404).json({success: false}));
        }   


}

export default ItemController;
