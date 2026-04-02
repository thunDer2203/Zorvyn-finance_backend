const Record = require("../models/records.js");

exports.getSummary = async (req, res) => {
  try {
    // 1. TOTAL INCOME + EXPENSE
    const totals = await Record.aggregate([
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" }
        }
      }
    ]);

    let totalIncome = 0;
    let totalExpense = 0;

    totals.forEach(item => {
      if (item._id === "income") totalIncome = item.total;
      if (item._id === "expense") totalExpense = item.total;
    });

    // 2. CATEGORY-WISE TOTALS
    const categoryTotals = await Record.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      }
    ]);

    // 3. RECENT ACTIVITY
    const recent = await Record.find()
      .sort({ date: -1 })
      .limit(5);

    // 4. MONTHLY TRENDS
    const monthlyTrends = await Record.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          income: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
            }
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
            }
          }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // 5. WEEKLY TRENDS
    const weeklyTrends = await Record.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            week: { $week: "$date" },
            month: { $month: "$date" }
          },
          income: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
            }
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
            }
          }
        }
      },
      { $sort: { "_id.year": 1, "_id.week": 1 } }
    ]);

    // FINAL RESPONSE
    res.json({
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense,
      categoryTotals,
      recentActivity: recent,
      monthlyTrends,
      weeklyTrends
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};