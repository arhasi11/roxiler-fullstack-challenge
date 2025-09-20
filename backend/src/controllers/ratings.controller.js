import { Rating } from "../models/index.js";

export const submitOrUpdateRating = async (req, res) => {
  const { storeId } = req.params;
  const { rating } = req.body;
  const userId = req.user.id;

  try {
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    // Check if rating already exists
    let record = await Rating.findOne({ where: { UserId: userId, StoreId: storeId } });

    if (record) {
      record.rating = rating;
      await record.save();
    } else {
      record = await Rating.create({ UserId: userId, StoreId: storeId, rating });
    }

    res.json({
      message: "Rating saved successfully",
      rating: { id: record.id, rating: record.rating, StoreId: record.StoreId },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserRatingForStore = async (req, res) => {
  const { storeId } = req.params;
  const userId = req.user.id;

  try {
    const record = await Rating.findOne({
      where: { UserId: userId, StoreId: storeId },
      attributes: ["id", "rating", "StoreId"],
    });

    if (!record) {
      return res.status(404).json({ message: "No rating found for this store" });
    }

    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
