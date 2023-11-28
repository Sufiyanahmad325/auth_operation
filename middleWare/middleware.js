const JWT = require("jsonwebtoken");

const jwtAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({
      success: false,
      messange: " cookies not authorized",
    });
  }
  try {
    const tata = JWT.verify(token, process.env.SECRET);
    req.user = { id: tata.id, email: tata.email };
  } catch (error) {
    return res.status(400).json({
      success: false,
      messange: error.message,
    });
  }
  next()
};



module.exports = jwtAuth;
