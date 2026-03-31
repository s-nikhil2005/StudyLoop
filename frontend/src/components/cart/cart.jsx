import { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../../services/cartServices";
import SkillCard from "../Dashboard/OwnerDashboard/CardsManager/SkillCard";
import "./cart.css";

function Cart() {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCart(res.items);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await getCart();
        setCart(res.items);
      } catch (err) {
        console.log(err);
      }
    };
    loadCart();
  }, []);

  const handleRemove = async (id) => {
    try {
      await removeFromCart(id);
      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Separate cards
  const skillCards = cart.filter(item => item.type === "skill");
  const paidCards = cart.filter(item => item.type === "paid");

  return (
    <div className="cart-container">
      <h2 className="cart-title">My Saved Cards ❤️</h2>

      {cart.length === 0 ? (
        <p className="empty-text">No items added yet</p>
      ) : (
        <>
          {/* SKILL CARDS */}
          {skillCards.length > 0 && (
            <>
              <h3 className="section-title">Skill Exchange</h3>
              <div className="cart-grid">
                {skillCards.map((item) => (
                  <div key={item._id} className="cart-card-wrapper">
                    <SkillCard card={item} />
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item._id)}
                    >
                      Remove ❌
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* PAID CARDS */}
          {paidCards.length > 0 && (
            <>
              <h3 className="section-title">Paid Sessions</h3>
              <div className="cart-grid">
                {paidCards.map((item) => (
                  <div key={item._id} className="cart-card-wrapper">
                    <SkillCard card={item} />
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item._id)}
                    >
                      Remove ❌
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;