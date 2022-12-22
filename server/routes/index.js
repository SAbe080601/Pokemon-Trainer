/* Name: Shinya Abe
   Date: 11/20/22
   Pledge: I pledge my honor that I have abided by the Stevens honors system
   Class: CS 554
   Assignment: lab6
*/

const apiRoutes = require('./apiRoutes');

const constructorMethod = (app) => {
  app.use('/pokemon', apiRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Route not valid'});
  });
};

module.exports = constructorMethod;