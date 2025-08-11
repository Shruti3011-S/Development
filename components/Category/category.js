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

    products.slice(0, 8).forEach(product => {
      container.innerHTML += `
        <div class="col-md-3">
          <div class="card h-100 text-center position-relative">

            <!-- Wishlist and View buttons -->
            <div style="position: absolute; top: 10px; right: 10px; z-index: 10;">
              <button class="btn btn-light btn-sm me-1" title="Add to Wishlist">
                <i class="fas fa-heart"></i>
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

              <button class="btn btn-dark w-100 mt-3">${product.buttonText || "Add to Cart"}</button>
            </div>
          </div>
        </div>
      `;
    });
  })
  .catch(error => console.error("Error loading products:", error));
