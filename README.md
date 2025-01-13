
---

# **Template Product API - GET /api/products**

### **Base URL:**
```
https://template1-neon-nu.vercel.app/api/products
```

### **Description:**
This endpoint retrieves a list of products available in the store. Each product includes detailed information such as the product's name, description, price, category, discount percentage, availability status, and an image URL. The response provides an array of products in JSON format.

### **Example Response:**
```json
[
  {
    "imageUrl": "https://cdn.sanity.io/images/7xt4qcah/production/4e2ed6a9eaa6e1413843e53f3113ccfd2104c301-278x296.png",
    "category": "hoodie",
    "discountPercent": 20,
    "isNew": true,
    "_id": "0dc7c847-8599-45d0-b02c-34429f7a639e",
    "name": "Casual Green Bomber Jacket",
    "description": "This stylish green bomber jacket offers a sleek and modern twist on a classic design. Made from soft and comfortable fabric, it features snap buttons and ribbed cuffs, giving it a sporty yet refined look. The minimalist style makes it perfect for layering over casual t-shirts or hoodies. Whether you're out with friends or just lounging, this jacket provides a laid-back yet fashionable vibe. Its muted green color adds a subtle, earthy tone that pairs well with a variety of outfits, making it a versatile addition to your casual wardrobe.",
    "price": 300
  }
]
```

### **Response Fields:**
- **_id** (string): The unique identifier for the product.
- **name** (string): The name of the product.
- **description** (string): A detailed description of the product, including key features.
- **price** (number): The price of the product (in the store's currency).
- **category** (string): The category to which the product belongs (e.g., hoodie, t-shirt, jeans).
- **imageUrl** (string): A URL to an image of the product.
- **discountPercent** (number, optional): The discount percentage applied to the product, if any (e.g., 20 for 20% off).
- **isNew** (boolean, optional): Indicates whether the product is new (true/false).

---

This document provides details on how to interact with the `/api/products` endpoint to retrieve product information from the store's catalog.

--- 