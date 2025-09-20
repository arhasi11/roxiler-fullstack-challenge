/**
 * Controller for user-centric actions, such as fetching a user's own profile.
 */

/**
 * Responds with the profile of the currently authenticated user.
 * This handler relies on the `authMiddleware` to have attached the user
 * object to the request.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
export const getMyProfile = (req, res) => {
  // The 'req.user' object is attached by the authMiddleware and is guaranteed
  // to be present. It already excludes the password due to our model's default scope.
  const currentUser = req.user;

  res.status(200).json(currentUser);
};