import Shipping from '../models/shippingModel.js';
import redis from 'redis';

const redisClient = redis.createClient();

await redisClient.connect();

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
            const cacheKey = `shipping:${cargoType}:${weight}:${distance}`;

            console.log("cached key: ", cacheKey);

            // Check Redis Cache
            const cachedData = await redisClient.get(cacheKey);
            console.log("cachedData: ", cachedData);
            console.log("parsed cached Data: ", JSON.parse(cachedData));

            if (cachedData) {
                return response.json(JSON.parse(cachedData)); 
            }

            console.log(cargoType);

            const rate = await Shipping.findOne({ cargoType }); 

            console.log("rate: ", rate);

            if (!rate) {
                return response.status(404).json({
                    error: "No rate found for this cargo type"
                });
            }

            const totalCost = rate.basePrice + weight * rate.weight + distance * rate.distance;

            // Store result in Redis (Cache for 1 hour)
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(totalCost));

            console.log(totalCost);

            response.json({ cargoType, weight, distance, totalCost, currency: rate.currency });

        } catch (error) {
            console.log("error: ", error);
            response.status(500).json({
                error: error
            });
        }
    }   

}

export default ShippingController;
