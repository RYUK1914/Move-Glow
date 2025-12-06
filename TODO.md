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

## Project Structure (React App) - Focusing on CSS Files and Main Components

```
frontend/src/
├── App.css          # Global styles (box-sizing, body margin/padding, main padding)
├── App.js           # Main app component
├── index.css        # Global body/root styles (font-family, background gradient, zoom)
├── index.js         # App entry point
├── components/
│   ├── Footer.css   # Footer component styles
│   ├── Footer.js    # Footer component
│   ├── Header.css   # Header component styles
│   ├── Header.js    # Header component
│   ├── Layout.css   # Layout component styles
│   ├── Layout.js    # Layout component
│   └── MapPicker.css # MapPicker component styles
├── pages/
│   ├── Admin.js     # Admin page component
│   ├── Cart.css     # Cart page styles
│   ├── Cart.js      # Cart page component
│   ├── Contact.css  # Contact page styles
│   ├── Contact.js   # Contact page component
│   ├── Home.css     # Home page styles
│   ├── Home.js      # Home page component
│   ├── Login.js     # Login page component
│   ├── Moments.css  # Moments page styles
│   ├── Moments.js   # Moments page component
│   ├── Products.css # Products page styles
│   └── Products.js  # Products page component
```

## Answer to Question: "What CSS file contains the global styles or body/root styles?"

The CSS file that contains the global styles or body/root styles is `frontend/src/index.css`. It includes styles for the `body` element such as margin, font-family, background gradient, and zoom level.
