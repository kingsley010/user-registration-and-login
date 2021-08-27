const jwt = require("jsonwebtoken");

class AuthMiddleware {

    /**
     * @method verifyToken
     * @description verify token
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} JSON API Response
     */
    async verifyToken(req, res) {
        let token = req.headers['x-access-token'];

        // Check for token
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied!' })
        }

        try {

            // Verify Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //console.log(decoded);
            if (!decoded) throw Error('unable to decode token');

            // Add user from payload
            req.user = decoded.id;
           // console.log(decoded.id);
        
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    }
}    

export default AuthMiddleware;
