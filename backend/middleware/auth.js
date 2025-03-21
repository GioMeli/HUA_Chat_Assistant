module.exports = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized. Please Sign In." });
    }
    next();
};

