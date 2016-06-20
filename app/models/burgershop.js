var mongoose = require('mongoose');

// http://blog.robertonodi.me/how-to-use-geospatial-indexing-in-mongodb-using-express-and-mongoose/

var burgershopSchema = mongoose.Schema({

  nameRomaji        : {
    type            : String,
    required        : true
  },
  nameJapanese      : String,
  userId            : {
    type            : String,
    required        : true
  },
  location          : {
    type            : [Number],  // [<longitude>, <latitude>]
    index           : '2d',      // create the geospatial index
    required        : true
  },
  address_1         : String,
  address_2         : String,
  address_3         : String,
  city              : String,
  county_province   : String,
  zip               : String,
  region            : {
    type            : String,
    default         : 'Tokyo'
  },
  country           : {
    type            : String,
    default         : 'Japan'
  },
  address_other     : String,
  hasNonSmoker      : Boolean,
  hasVegetarian     : Boolean,
  takesReservations : Boolean,
  isHidden          : {
    type            : Boolean,
    default         : false
  }
},
{
  timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});

module.exports = mongoose.model('Burgershop', burgershopSchema);
