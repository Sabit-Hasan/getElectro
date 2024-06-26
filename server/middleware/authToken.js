const jwt = require('jsonwebtoken');

const authToken = async (req, res, next) => {

    const token = req.header("Authorization");

    if (!token) {
        throw new Error("Unauthorized, Token not provided!");
    }

    const jwtToken = token.replace("Bearer", "").trim();

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JTW_SECRET_KEY)

        req.userId = isVerified.tokenData.id;
        req.user = isVerified.tokenData;

        next();

    } catch (error) {
        res.status(400).json({ success: false, error: true, message: 'Unauthorized, Invalid Token!' });
    }
};

module.exports = authToken;
