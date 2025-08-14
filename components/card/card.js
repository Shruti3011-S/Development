let cart = JSON.parse(localStorage.getItem("cart")) || [];

let discountPercent = 0;
const couponInput = document.getElementById("coupon-code");
const applyCouponBtn = document.getElementById("apply-coupon");

function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  if (!cartItemsContainer) return;
  
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {  
    cartItemsContainer.innerHTML = `
      <tr>
        <td colspan="5" class="text-center py-5">
          <div class="text-muted">
            <i class="bi bi-cart-x fs-1 d-block mb-3"></i>
            <h5>Your cart is empty</h5>
            <p>Add some products to get started!</p>
            <a href="../category.html" class="btn btn-primary">Continue Shopping</a>
          </div>
        </td>
      </tr>
    `;
    updateTotals();
    return;
  }

  cart.forEach((item, index) => {
    let total = item.price * (item.quantity || 1);

    cartItemsContainer.innerHTML += `
      <tr class="cart-item">
        <td>
          <div class="d-flex align-items-center">
            <img src="${item.image}" alt="${item.name}" class="product-image" width="70" height="70">
            <div class="ml-3">
              <h6 class="mb-1 font-weight-bold">${item.name}</h6>
              <small class="text-muted">High-quality product</small>
            </div>
          </div>
        </td>
        <td class="text-center">
          <span class="h5 text mb-0">$${item.price}</span>
        </td>
        <td class="text-center">
          <div class="input-group quantity-control mx-auto" style="width: 130px;">
            <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${index}, -1)">
              <i class="bi bi-dash"></i>
            </button>
            <input type="text" class="form-control text-center border-0 bg-transparent" value="${item.quantity || 1}" readonly>
            <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${index}, 1)">
              <i class="bi bi-plus"></i>
            </button>
          </div>
        </td>
        <td class="text-center">
          <span class="h5 text mb-0">$${total}</span>
        </td>
        <td class="text-center">
          <button class="btn btn-outline btn-sm" onclick="removeItem(${index})" title="Remove item">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });

  updateTotals();
}

function updateQuantity(index, change) {
  if (cart[index]) {
    cart[index].quantity = (cart[index].quantity || 1) + change;
    if (cart[index].quantity <= 0) {
      removeItem(index);
    } else {
      saveCart();
      renderCart();
    }
  }
}

function removeItem(index) {
  if (confirm("Are you sure you want to remove this item?")) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
  }
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateTotals() {
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * (item.quantity || 1);
  });

  const discountAmount = (subtotal * discountPercent) / 100;
  const total = subtotal - discountAmount;

  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("discount").textContent = `$${discountAmount.toFixed(2)}`;
  document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

function returnToShop() {
  window.location.href = "../category.html";
}

function updateCart() {
  renderCart();
  alert("Cart updated successfully!");
}

function proceedToCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty! Please add some products first.");
    return;
  }
  alert("Proceeding to checkout...");
}

function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const cartBadge = document.getElementById('cart-count');
  if (cartBadge) {
    cartBadge.textContent = cartCount;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  renderCart();
  updateCartCount();
});
