import bcrypt from "bcryptjs";
import { Op, fn, col, literal } from "sequelize";
import { User, Store, Rating } from "../models/index.js";

// 📊 Dashboard Summary
export const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    res.json({ totalUsers, totalStores, totalRatings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 👤 Create User (Admin only)
export const createUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;
  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(409).json({ message: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
      address,
      role: role || "user",
    });

    res.status(201).json({ id: user.id, email: user.email, role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📋 List Users (filter/search/sort)
export const listUsers = async (req, res) => {
  const { q, role, sortBy = "name", order = "ASC", limit = 50, offset = 0 } = req.query;
  const where = {};

  if (role) where.role = role;
  if (q) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${q}%` } },
      { email: { [Op.iLike]: `%${q}%` } },
      { address: { [Op.iLike]: `%${q}%` } },
    ];
  }

  try {
    const users = await User.findAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, order]],
      attributes: ["id", "name", "email", "role", "address", "createdAt"],
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🏪 List Stores with Average Rating (optimized)
export const listStores = async (req, res) => {
  const { q, sortBy = "name", order = "ASC", limit = 50, offset = 0 } = req.query;
  const where = {};

  if (q) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${q}%` } },
      { email: { [Op.iLike]: `%${q}%` } },
      { address: { [Op.iLike]: `%${q}%` } },
    ];
  }

  try {
    const stores = await Store.findAll({
      where,
      attributes: {
        include: [
          [fn("AVG", col("Ratings.rating")), "averageRating"],
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

    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 👤 Get User Details + Owner’s Avg Store Rating
export const getUserDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id, {
      attributes: ["id", "name", "email", "address", "role"],
      include: [{ model: Store, as: "Stores" }],
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    let rating = null;
    if (user.role === "owner") {
      const ratings = await Rating.findAll({
        where: { StoreId: { [Op.in]: user.Stores.map((s) => s.id) } },
      });
      rating = ratings.length
        ? ratings.reduce((a, b) => a + b.rating, 0) / ratings.length
        : null;
    }

    res.json({ ...user.toJSON(), rating });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
