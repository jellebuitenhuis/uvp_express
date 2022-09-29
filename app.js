var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var convert = require('xml-js');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

const {createProxyMiddleware, responseInterceptor, fixRequestBody} = require('http-proxy-middleware');

// var xmlparser = require('express-xml-bodyparser');
// app.use(xmlparser());
var bodyParser = require('body-parser');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// var xml = require('xml');
app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: false}));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.raw({type: 'text/xml'}));

const baseUrl = 'https://www.uvponline.nl/uvponlineConnector/api/';

app.post('/run', createProxyMiddleware({
    target: `${baseUrl}run`,
    changeOrigin: true,
    onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-API-KEY';
    }
}));

app.post('/categorie', createProxyMiddleware({
    target: `${baseUrl}categorie`,
    changeOrigin: true,
    onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-API-KEY';
    }
}));

app.post('/groep', createProxyMiddleware({
    target: `${baseUrl}groep`,
    changeOrigin: true,
    onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-API-KEY';
    }
}));

app.post('/deelnemers_per_wedstrijd', createProxyMiddleware({
    target: `${baseUrl}deelnemers_per_wedstrijd`,
    changeOrigin: true,
    onProxyReq: fixRequestBody,
    onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-API-KEY';
    }
}));

app.post('/ping', createProxyMiddleware({
    target: `${baseUrl}ping`,
    changeOrigin: true,
    onProxyReq: fixRequestBody,
    onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-API-KEY';
    }
}));

// var xmlrpc = require('xmlrpc')
const xmlrpc = require('express-xmlrpc')
// app.use(xmlrpc.bodyParser)


const cors = require('cors');
const fs = require("fs");
const corsOptions = {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'X-API-KEY'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.post('/xmlrpc_server', bodyParser.raw({type: 'application/json',}), function (req, res, next) {
    let params = req.body.params;
    let output = convert.json2xml(req.body.runData, {compact: true, spaces: 4});
    params.push(output)

    const client = xmlrpc.createClient({
        host: 'www.uvponline.nl',
        path: '/uvponlineConnector/index.php/xmlrpc_server',
        headers: {
            'Content-Type': 'text/xml'
        }
    })
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-API-KEY');
    res.header('Access-Control-Allow-Origin', '*');
    client.methodCall(req.body.method, params, function (err, value) {
        if (err) {
            console.log(err)
            res.send(err)
        } else {

            res.send(value)
        }
    })
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
