const { auth } = require("../controllers");
const { router } = require("../services/imports");

router.post('/signup', auth.signup);
router.post('/signin', auth.signin);

module.exports = router;