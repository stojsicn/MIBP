const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');

// We are using the dotenv library to load our environmental variables from the .env file. We don't have anything in the .env file for now, but we will soon.
dotenv.load();

// Just like external libraries, we can import our application code using the require function. The major difference is that we have to give the exact path to our file. We saw in the directory structure section that we will have an index.js file in a routes directory. Go ahead and create it if you haven't already, otherwise you'll get errors when compiling the code.
const routes = require('./routes/index');

// This line of code instantiates the Express JS framework. We assign it to a variable called app and will add our configuration to this variable.
const app = express();

// The .set method allows us to configure various options with the Express framework. Here we are setting our views directory as well as telling Express that our templating engine will be Jade. More on that soon.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// The .use method is similar to the .set method, where it allows us to set further configurations. The .use method also acts as a chain of events that will take place once a request hits our Node.js application. First we'll log the request data, parse any incoming data, and so on.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session( { secret: "njam" }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// If our application encounters an error, we'll display the error and stack trace accordingly.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

// Finally, we'll choose to have our app listen on port 3000. This means that once we launch our app, we'll be able to navigate to localhost:3000 and see our app in action. You are free to choose any port you want, so 8080, or 80, or really any number will work. The reason 3000 is typically used is that it's the lowest port number that can be used without requiring elevated privileges on Mac/Linux systems.
app.listen(3000, (err) => {
  if (err) console.log(err.message);
  console.log("App running on port 3000 of localhost");
});