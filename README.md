
---

# **Template 1 Product API - GET /api/products**

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

## **Importing API Data into Your Sanity Project**

To import the data from the `/api/products` endpoint into your Sanity project, you can follow these steps:

### 1. Create `importData.js` (or any name you prefer):

Here’s the code to fetch data from the API and import it into Sanity:

```javascript
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'your-project-id',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-01-13',
  token: 'your-auth-token',
});

async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);

    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${imageUrl}`);
    }

    const buffer = await response.arrayBuffer();
    const bufferImage = Buffer.from(buffer);

    const asset = await client.assets.upload('image', bufferImage, {
      filename: imageUrl.split('/').pop(),
    });

    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error('Failed to upload image:', imageUrl, error);
    return null;
  }
}

async function uploadProduct(product) {
  try {
    const imageId = await uploadImageToSanity(product.imageUrl);

    if (imageId) {
      const document = {
        _type: 'product',
        name: product.name,
        description: product.description,
        price: product.price,
        image: {
          _type: 'image',
          asset: {
            _ref: imageId,
          },
        },
        category: product.category,
        discountPercent: product.discountPercent,
        isNew: product.isNew,
      };

      const createdProduct = await client.create(document);
      console.log(`Product ${product.name} uploaded successfully:`, createdProduct);
    } else {
      console.log(`Product ${product.name} skipped due to image upload failure.`);
    }
  } catch (error) {
    console.error('Error uploading product:', error);
  }
}

async function importProducts() {
  try {
    const response = await fetch('https://template1-neon-nu.vercel.app/api/products');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const products = await response.json();

    for (const product of products) {
      await uploadProduct(product);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

importProducts();
```

### 2. Replace with your credentials:

- **projectId**: Your Sanity project ID.
- **dataset**: Your Sanity dataset name.
- **token**: Your Sanity token (if required).

### 3. Run the Script:

Once you have created the `importData.js` file and replaced the credentials, run the script using Node.js:

```
node importData.js
```

This will fetch the data from the API and import it into your Sanity project.

---