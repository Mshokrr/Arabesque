/* The users database is required as a json in the seeding process
in seed.js then using "/db/seedUsers" the seeding process is executed */

module.exports.mobileNumberFormat = function(array, index){
  if(index < 0){
    return;
  }
  else{
    var mobileNumber = array[index].mobileNumber;
    mobileNumber = mobileNumber.toString();
    mobileNumber = "0" + mobileNumber;
    array[index].mobileNumber = mobileNumber;
    mobileNumberFormat(array, index - 1);
  }
}

module.exports.nameFormat = function(array, index){
  if(index < 0){
    console.log(array);
    return;
  }
  else{
    var nameArray = array[index].name.split(" ");
    var firstName = nameArray[0];
    var lastNameArray = nameArray.slice(1, nameArray.length);
    var lastName = lastNameArray.join(" ");
    array[index].firstName = firstName;
    array[index].lastName = lastName;
    nameFormat(array, index - 1);
  }
}
