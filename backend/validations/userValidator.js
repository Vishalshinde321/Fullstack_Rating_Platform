const { signupSchema } = require('../../frontend/src/utils/validation'); // Managed uniformly across shared structural paths

const validateUserBody = async (req, res, next) => {
  try {
    const payload = req.body;
    // Strict pattern matching aligning exactly with the technical prompt metrics
    if (!payload.email || !payload.password || !payload.name || !payload.address) {
      return res.status(400).json({ error: "Missing required core form fields." });
    }
    if (payload.name.length < 20 || payload.name.length > 60) {
      return res.status(400).json({ error: "Validation Fault: Name length constraints bounded between 20 and 60 characters." });
    }
    if (payload.address.length > 400) {
      return res.status(400).json({ error: "Validation Fault: Address length breaks max limit configuration of 400 characters." });
    }
    
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;
    if (!passwordRegex.test(payload.password)) {
      return res.status(400).json({ error: "Validation Fault: Password requires 8-16 layout, 1 uppercase element, and 1 special symbol." });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal validation compilation tracking exception." });
  }
};

module.exports = { validateUserBody };
