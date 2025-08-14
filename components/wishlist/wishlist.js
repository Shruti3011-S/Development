 // Load wishlist from localStorage
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const container = document.getElementById("wishlist-container");

    if (wishlist.length === 0) {
      container.innerHTML = `<p>You have no items in your wishlist.</p>`;
    } else {
      wishlist.forEach(product => {
        container.innerHTML += `
          <div class="col-md-3">
            <div class="card h-100 text-center">
              <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: contain;" />
              <div class="card-body">
                <h6>${product.name}</h6>
                <p><strong>$${product.price}</strong> <del class="text-muted">$${product.originalPrice}</del></p>
                <button class="btn btn-danger remove-btn">Remove</button>
              </div>
            </div>
          </div>
        `;
      });

      // Add remove functionality
      document.querySelectorAll(".remove-btn").forEach((btn, i) => {
        btn.addEventListener("click", () => {
          wishlist.splice(i, 1);
          localStorage.setItem("wishlist", JSON.stringify(wishlist));
          location.reload(); // Refresh the page to update wishlist
        });
      });
    }