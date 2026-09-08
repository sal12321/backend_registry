const User = require("../models/user");

const addUser = async (user) => {
    return await User.create(user);
};

const updateUser = async (user) => {


    console.log();

   return await User.findOneAndUpdate(
    { email: user.email }, // find OLD document
    user,
    { new: true }
);


};



const getAll = async () => {
    return await User.find({});
};

const deleteUser = async (email) => {
    return await User.findOneAndDelete({
        email: email
    });
};

module.exports = {
    addUser,
    updateUser,
    getAll,
    deleteUser
};