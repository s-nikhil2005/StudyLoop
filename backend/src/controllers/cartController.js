const Cart = require("../models/cartModel");

// ✅ ADD TO CART
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.body;

let cart = await Cart.findOne({ user: userId }).populate("items");

if (!cart) {
  cart = new Cart({
    user: userId,
    items: [itemId],
  });
} else {
  const exists = cart.items.some(
    (item) => item.toString() === itemId
  );

  if (!exists) {
    cart.items.push(itemId);
  }
}

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item added",
      cart,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET CART
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId })
      .populate("items"); // VERY IMPORTANT

    res.status(200).json({
      success: true,
      items: cart ? cart.items : [],
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ REMOVE ITEM
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.toString() !== itemId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed",
      cart,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};  