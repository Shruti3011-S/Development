document.addEventListener("DOMContentLoaded", () => {
  const orderItemsEl = document.getElementById("order-items");
  const subtotalEl = document.getElementById("subtotal-value");
  const totalEl = document.getElementById("total-value");
  const couponInput = document.getElementById("coupon-input");
  const applyCouponBtn = document.getElementById("apply-coupon");
  const placeOrderBtn = document.getElementById("place-order-btn");
  const logoutLink = document.getElementById("logout-link");
  const billingForm = document.getElementById("billing-form");

  const formatCurrency = (value) => Number(value).toFixed(2);
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let discountPercent = 0;

  const renderOrderItems = () => {
    if (cart.length === 0) {
      orderItemsEl.innerHTML = '<div class="text-muted">No items in your order.</div>';
      updateTotals();
      return;
    }

    orderItemsEl.innerHTML = cart
      .map(
        (item) => `
        <div class="d-flex justify-content-between align-items-center py-2">
          <div class="d-flex align-items-center gap-2">
            <img src="${item.image}" alt="${item.name}" style="width:48px;height:48px;object-fit:cover" />
            <span>${item.name}</span>
          </div>
          <span>$${formatCurrency((item.quantity || 1) * Number(item.price || 0))}</span>
        </div>`
      )
      .join("");

    updateTotals();
  };

  function updateTotals() {
    const subtotal = cart.reduce(
      (sum, item) => sum + (item.quantity || 1) * Number(item.price || 0),
      0
    );
    const discount = subtotal * (discountPercent / 100);
    const total = subtotal - discount;
    subtotalEl.textContent = `$${formatCurrency(subtotal)}`;
    totalEl.textContent = `$${formatCurrency(total)}`;
  }

  if (applyCouponBtn) {
    applyCouponBtn.addEventListener("click", () => {
      const code = (couponInput?.value || "").trim().toUpperCase();
      if (!code) return;
      if (code === "SHRUDEVIT2526AUG") discountPercent = 10;
      else discountPercent = 0;
      updateTotals();
    });
  }

  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", (e) => {
      if (!billingForm.checkValidity()) {
        billingForm.reportValidity(); 
        return; 
      }

      if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
      }

      alert("Order placed successfully!");
    });
  }

  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "/index.html";
    });
  }

  renderOrderItems();
});
