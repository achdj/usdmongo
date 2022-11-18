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
  Person.findById({_id: personId}, function(err, onePerson) {
    if(err) return console.log(err);  
    console.log(onePerson);
    done(null, onePerson);
  });
};

const findEditThenSave = (personId, done) => {
  // .findById() method to find a person by _id with the parameter personId as search key.
  Person.findById({_id: personId}, function(err, onePerson) {
    if(err) return console.log(err);
    const foodToAdd = "hamburger";
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    onePerson.favoriteFoods.push(foodToAdd);
    // and inside the find callback - save() the updated Person.
    onePerson.save(function(err, data) {
      if(err) return console.log(err);
      done(null, data);
    });
  });
};

/* find one document by one attribut and update this data and retur new document update with new: true(by default function return old document*/
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(err, data) {
    if(err) return console.log(err);
    done(null, data);
  })

};

const removeById = (personId, done) => {
  Person.findOneAndDelete({_id: personId}, function(err, data) {
    if(err) return console.log(err);
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, data) {
    if(err) return console.log(err);
    done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select("-age")//pour cacher les age
  .exec( 
    function(err, data) {
      if(err) return console.log(err);
      done(null, data);  
    }
  )
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
