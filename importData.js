import  { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'your-project-id', // Replace with your project ID
  dataset: 'production',        // Replace with your dataset
  useCdn: true,       
  apiVersion:'2025-01-13', // Optional: Add your API version
  token: 'your-auth-token',     // Optional: Add your token if required
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
        _type: 'product', // Type in your Sanity schema
        name: product.name,
        description: product.description,
        price: product.price,
        image: {
          _type: 'image',
          asset: {
            _ref: imageId, // Reference to the uploaded image
          },
        },
        category: product.category,
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
    const response = await fetch('https://templeate1.vercel.app/api/products');
    
    // Ensure the response is valid
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const products = await response.json();

    // Upload each product to Sanity
    for (const product of products) {
      await uploadProduct(product);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

importProducts();