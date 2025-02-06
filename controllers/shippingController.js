import Shipping from '../models/shippingModel.js';

class ShippingController {

    /**
     * @method calculateCost
     * @description calculat shipping cost
     * @param {object} request - The Request Object
     * @param {object} response - The Response Object
     * @returns {object} JSON API Response
     */
    static async calculateCost(request, response) {
        try {
            const { weight, distance, cargoType } = request.body;

            console.log(cargoType);

            const rate = await Shipping.findOne({ cargoType }); 

            console.log("rate: ", rate);

            if (!rate) {
                return response.status(404).json({
                    error: "No rate found for this cargo type"
                });
            }

            const totalCost = rate.basePrice + weight * rate.weight + distance * rate.distance;

            console.log(totalCost);

            response.json({ cargoType, weight, distance, totalCost });

        } catch (error) {
            response.status(500).json({
                error: 'server error'
            });
        }
    }   

}

export default ShippingController;
