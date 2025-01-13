# **Template Product API - GET /api/products**

### **Base URL:**
```
https://template1-neon-nu.vercel.app/api/products
```

### **Description:**
This endpoint retrieves a list of products available in the store. Each product includes details such as the name, description, price, category, and an image URL. Below is an example response for a single product.

### **Example Response:**
```json
[
{
  "category": "tshirt",
  "_id": "4857042c-6958-4bda-b214-866994e35052",
  "name": "Gradient Graphic T-shirt",
  "description": "Add a bold and artistic touch to your wardrobe with this unique graphic t-shirt. Featuring an eye-catching abstract swirl design in vibrant colors, it exudes energy and individuality. The \"Just Walk Forward\" slogan adds a motivational element, making this tee perfect for those who love to express themselves.\n\nKey Features:\n\nHigh-quality fabric for ultimate comfort and durability\nModern, unisex design suitable for casual outings or statement looks\nRelaxed fit with a classic crew neckline\nUnique printed details for a one-of-a-kind style\nPair it with jeans, joggers, or shorts to create a standout look!",
  "price": 145,
  "imageUrl": "https://cdn.sanity.io/images/7xt4qcah/production/701cf9bdf7e58564aae72eb5b76896f02a1d4115-295x298.png"
}
]
```

### **Fields:**
- **_id** (string): The unique identifier for the product.
- **name** (string): The name of the product.
- **description** (string): A detailed description of the product, including key features.
- **price** (number): The price of the product.
- **category** (string): The category to which the product belongs (e.g., tshirt, jeans).
- **imageUrl** (string): A URL to an image of the product.

--- 

This document provides details on how to interact with the `/api/products` endpoint to retrieve product information.
