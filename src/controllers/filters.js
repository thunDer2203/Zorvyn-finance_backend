const Record=require("../models/records.js");

exports.getFiltered = async (req, res) => {
  const { type, category, startDate, endDate } = req.query;

  let filter = {};

  if (type) filter.type = type;
  if (category) filter.category = category;

  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  const records = await Record.find(filter);
  res.json(records);
};