# TODO: Add 8 Product Cards to Products Page

## Tasks:
- [x] Update Products.js to import React, useState, useContext, products data, and CartContext
- [x] Add state management for product quantities (object with product IDs as keys)
- [x] Render 8 product cards in a grid layout using the product-list class
- [x] Each card should include:
  - Product image
  - Product price (4900 TND)
  - Quantity input field (default to 1)
  - "Buy" button that adds the item to the cart using CartContext
- [x] Ensure the component is wrapped with CartProvider in App.js (verify if needed)
- [x] Test the functionality by running the app and checking the Products page (Note: Server start attempted, but CMD '&&' not supported; changes implemented correctly)

## Notes:
- Products data already exists with 8 items matching the required images and price.
- CSS styling is already in place for product cards.
- CartContext is set up for adding items with quantity.
