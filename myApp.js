require('dotenv').config();

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var Person;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

/** Create a 'Person' Model */
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

/** Create and Save a Person */
Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  var user = new Person({name:"achille", age:22, favoriteFoods: ["Haricot, Pain"]});
  user.save(function(err, data) {
    if(err) return console.log(err);
    done(null, data);
  });
};

/** Create many People with `Model.create()` */
arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people) {
    if(err) return console.log(err);
    done(null, people);
  })
};

/** Use `Model.find()` */
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, people) {
    if(err) return console.log(err);  
    console.log(people);
    done(null, people);
  });
};

/** Use `Model.findOne()` for get one documentfor get array of document */
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, bouf) {
    if(err) return console.log(err);  
    console.log(bouf);
    done(null, bouf);
  });
};

/** Use `Model.findById()` for get document by id */
const findPersonById = (personId, done) => {
  Person.findById({id: personId}, function(err, onePseron) {
    if(err) return console.log(err);  
    console.log(onePseron);
    done(null, onePseron);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
