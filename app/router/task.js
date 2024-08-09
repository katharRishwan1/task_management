const { task } = require("../controllers");
const { router } = require("../services/imports");

router.post('/task', task.create);
router.get('/task/:id?', task.get);
router.put('/task/:id', task.update);
router.delete('/task/:id', task.delete);


module.exports = router;