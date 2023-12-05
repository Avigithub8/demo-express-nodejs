document.addEventListener("DOMContentLoaded", function () {
  function fetchAllExpenses() {
    fetch("http://localhost:4000/api/expenses")
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("electronics").innerText = "";
        document.getElementById("food").innerText = "";
        document.getElementById("skincare").innerText = "";

        data.forEach((product) => {
          const listItem = document.createElement("li");
          listItem.textContent = ` 
            Price:${product.sellingPrice},Name:${product.productName},category:${product.category}`;

          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.addEventListener("click", () =>
            deleteExpense(product.id, category)
          );

          listItem.appendChild(deleteButton).style.marginLeft = "10px";

          const categoryListId = product.category.toLowerCase();
          const categoryList = document.getElementById(categoryListId);
          if (categoryList !== null) {
            categoryList.appendChild(listItem);
          } else {
            console.error(`Element with ID "${categoryListId}" not found.`);
          }
        });
      })
      .catch((error) => console.error("Error fetching expenses:", error));
  }

  fetchAllExpenses();

  const expenseForm = document.getElementById("expenseForm");
  expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(expenseForm);
    const sellingPrice = formData.get("sellingPrice");
    const productName = formData.get("productName");
    const category = formData.get("category");

    fetch("http://localhost:4000/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sellingPrice,
        productName: productName,
        category,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchAllExpenses();
      })
      .catch((error) => console.error("Error adding product:", error));
  });
});

function deleteExpense(id, category) {
  fetch(`http://localhost:4000/api/expenses/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      fetchExpensesByCategory(category);
    })
    .catch((error) => console.error("Error deleting expense:", error));
}
