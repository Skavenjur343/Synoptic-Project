const PORT = 3000

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const fs = require("fs");
const cookieParser = require("cookie-parser")

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Iterate each <route>.js file and register it with Express
const routes_path = path.join(__dirname, "routes");
fs.readdirSync(routes_path).forEach((route_file) => {
    if (!route_file.endsWith(".js")) return;
    const { router_path, router } = require(path.join(routes_path, route_file));
    console.log(`Route - ${router_path}`);
    if (!router_path || !router) {
        console.error(`Invalid route ${route_file}`);
        process.exit();
    }
    app.use(router_path, router);
});

// Forward 404 errors to the error handler
app.use((req, res, next) => {
    next(createError(404));
});

// Render error page for server errors or 404
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    // Include error message if in development
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
    console.log(`Access at http://localhost:${PORT}`)
})

module.exports = app;