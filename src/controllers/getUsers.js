const User=require("../models/users.js");

exports.getUsers = async (req, res) => {
  const { id,username } = req.query;

  let filter = {};

  if (id) filter._id = id;
  if (username) filter.username = username;

  const users = await User.find(filter).select("-password"); // Exclude password field
  res.json(users);
};