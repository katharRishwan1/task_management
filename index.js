const { dotenv, app, morgan, cors, bodyParser, helment, xss, http } = require("./app/services/imports");

dotenv.config();
const config = require("./app/config/config");
const responseHandler = require("./app/middlewares/response-handler");

require('./connection')
app.use(responseHandler())

// adding morgan to log the http request
app.use(morgan('tiny'));

//enabling cors for all request
app.use(cors());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// adding Helmet to enhance your API's security
app.use(helment());

// sanitize request data
app.use(xss());

const router = require('./app/router/__index.js');
app.use('/', router);

app.listen(config.port, () => {
    console.log('server running on prot', config.port);
});