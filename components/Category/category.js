function getStarRating(rating) {
  let stars = "";
  for (let i = 0; i < 5; i++) {
    stars += i < rating ? "★" : "☆";
  }
  return stars;
}

fetch("category.json")
  .then(response => response.json())  
  .then(products => {
    const container = document.getElementById("product-container"); 
    container.innerHTML = ""; 

    products.slice(0, 8).forEach((product, index) => { // 8 product show
      container.innerHTML += ` 
        <div class="col-md-3">
          <div class="card h-100 text-center position-relative">

            <div style="position: absolute; top: 10px; right: 10px; z-index: 10;">
              <button class="btn btn-light btn-sm me-1 wishlist-btn" data-index="${index}" title="Add to Wishlist">
                <i class="fa-solid fa-heart"></i>
              </button><br><br>
              <button class="btn btn-light btn-sm" title="View Details">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>

            <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height:100%; width:100%;" />

            <div class="card-body">
              <h6>${product.name}</h6>
              <p class="mb-0">
                <strong>$${product.price}</strong>
                <del class="text-muted">$${product.originalPrice}</del>
              </p>
              <small class="text-warning">${getStarRating(product.rating)}</small>

              <button class="btn btn-dark w-100 mt-3 add-to-cart-btn" data-index="${index}">${product.buttonText || "Add to Cart"}</button>
            </div>
          </div>
        </div>
      `;
    });

    const cards = container.querySelectorAll('.card'); // all cards
    cards.forEach(card => { 
      const addToCartBtn = card.querySelector('.add-to-cart-btn');  //btn 
      if (!addToCartBtn) return;  
      addToCartBtn.style.opacity = '0'; 
      addToCartBtn.style.transition = 'opacity 0.3s ease'; 
      addToCartBtn.style.pointerEvents = 'none'; 

      card.addEventListener('mouseenter', () => {
        addToCartBtn.style.opacity = '1'; 
        addToCartBtn.style.pointerEvents = 'auto';
      });

      card.addEventListener('mouseleave', () => {
        addToCartBtn.style.opacity = '0'; 
        addToCartBtn.style.pointerEvents = 'none'; 
      });
    });

    container.querySelectorAll(".wishlist-btn").forEach(btn => { // btn wishlist
      btn.addEventListener("click", () => { 
        const index = btn.getAttribute("data-index"); 
        const product = products[index]; // product details get 

        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []; 
        if (!wishlist.some(item => item.name === product.name)) {
          wishlist.push(product); 
          localStorage.setItem("wishlist", JSON.stringify(wishlist)); 
        }

        alert(`${product.name} added to wishlist`);
      });
    });

    container.querySelectorAll('.add-to-cart-btn').forEach(btn => { // btn add to cart
      btn.addEventListener('click', () => {
        const index = btn.getAttribute('data-index');
        const product = products[index];

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingIndex = cart.findIndex(item => item.name === product.name);
        if (existingIndex !== -1) {
          const currentQty = cart[existingIndex].quantity || 1;
          cart[existingIndex].quantity = currentQty + 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} added to cart`);
      });
    });

  })
  .catch(error => console.error("Error loading products:", error));  
