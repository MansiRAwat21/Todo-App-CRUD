const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const jwtSecret = process.env.JWT_KEY

const createJwt = (payload) => {
    try {
        const expire = 30 * 24 * 60 * 60 // 30 days
        return jwt.sign(payload, jwtSecret, {expiresIn : expire})
        
    } catch (error) {
        console.log(error,'jwt error')
        return false
    }
}

const varify = (req, res, next) => {
   try {
    // Get the token from various sources in the request (headers, query parameters, cookies)
    const token =
      req.headers.authorization ||
      req.query.token ||
      req.cookies.token ||
      req.cookies.Authorization;
    // Check if the token is missing or improperly formatted
    if (!token || !token.split(' ') || !token.split(' ')[1])
      return res.status(401).json({ status: false, message: 'Unauthorized: No token provided' });
    // Verify the token's authenticity using the secret key
    jwt.verify(token.split(' ')[1], jwtSecret, (err, decoded) => {
      if (err) {
        // Token verification failed; send an unauthorized response
        return res.status(401).json({ status: false, message: 'Unauthorized: Invalid token' });
      }
      // If the token is valid, store its payload in the 'req.user' object
      req.user = decoded;

      // Move on to the next middleware or route handler
      next();
    });
    } catch (error) {
       return res.status(401).json({message:"Unauthorized"})
    }
}

module.exports = { createJwt, varify}
  