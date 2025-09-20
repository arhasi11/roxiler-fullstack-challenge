import { Op, fn, col, literal } from "sequelize";
import { Store, Rating, User } from "../models/index.js";

// 🏪 Create Store (admin/owner)
export const createStore = async (req, res) => {
  const { name, email, address, ownerId } = req.body;
  try {
    const store = await Store.create({ name, email, address, ownerId });
    res.status(201).json({
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,
      ownerId: store.ownerId,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📋 List All Stores (search + avg rating + user rating)
export const listAllStores = async (req, res) => {
  const { q, sortBy = "name", order = "ASC", limit = 50, offset = 0 } = req.query;
  const where = {};

  if (q) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${q}%` } },
      { address: { [Op.iLike]: `%${q}%` } },
    ];
  }

  try {
    const stores = await Store.findAll({
      where,
      attributes: {
        include: [
          [fn("AVG", col("Ratings.rating")), "overallRating"],
          [fn("COUNT", col("Ratings.id")), "ratingCount"],
        ],
      },
      include: [
        {
          model: Rating,
          attributes: [],
        },
      ],
      group: ["Store.id"],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, order]],
      subQuery: false,
    });

    // attach user rating if logged in
    const results = await Promise.all(
      stores.map(async (store) => {
        let userRating = null;
        if (req.user) {
          const r = await Rating.findOne({
            where: { StoreId: store.id, UserId: req.user.id },
          });
          if (r) userRating = r.rating;
        }
        return { ...store.toJSON(), userRating };
      })
    );

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ⭐ Get Stores + Ratings for Owner (restricted to logged-in owner)
export const getStoreRatingsForOwner = async (req, res) => {
  const ownerId = req.user.id;
  try {
    const stores = await Store.findAll({
      where: { ownerId },
      attributes: ["id", "name", "email", "address"],
    });

    const results = await Promise.all(
      stores.map(async (store) => {
        const ratings = await Rating.findAll({
          where: { StoreId: store.id },
          include: [{ model: User, attributes: ["name", "email"] }],
        });

        const avg = ratings.length
          ? ratings.reduce((a, b) => a + b.rating, 0) / ratings.length
          : null;

        return {
          store: {
            id: store.id,
            name: store.name,
            email: store.email,
            address: store.address,
          },
          average: avg,
          ratings: ratings.map((r) => ({
            id: r.id,
            rating: r.rating,
            user: r.User,
          })),
        };
      })
    );

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
