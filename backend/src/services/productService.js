import { resolve } from 'path';
import { nanoid } from 'nanoid';
import { readJson, writeJson } from '../utils/fileDb.js';

const productsPath = resolve('src/data/products.json');

function normalizeProductPayload(productData, currentProduct = {}) {
  return {
    id: currentProduct.id || nanoid(8),
    name: productData.name?.trim(),
    description: productData.description?.trim(),
    category: productData.category?.trim(),
    price: Number(productData.price),
    image: productData.image?.trim(),
    sizes: Array.isArray(productData.sizes)
      ? productData.sizes.map((size) => String(size).trim()).filter(Boolean)
      : currentProduct.sizes || [],
    stock: Number(productData.stock) || 0,
    featured: Boolean(productData.featured)
  };
}

export async function getAllProducts() {
  return readJson(productsPath);
}

export async function getProductById(id) {
  const products = await getAllProducts();
  return products.find((product) => product.id === id);
}

export async function createProduct(productData) {
  const products = await getAllProducts();
  const newProduct = normalizeProductPayload(productData);
  products.push(newProduct);
  await writeJson(productsPath, products);
  return newProduct;
}

export async function updateProduct(id, productData) {
  const products = await getAllProducts();
  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    return null;
  }

  const updatedProduct = normalizeProductPayload(productData, products[productIndex]);
  products[productIndex] = updatedProduct;
  await writeJson(productsPath, products);
  return updatedProduct;
}

export async function deleteProduct(id) {
  const products = await getAllProducts();
  const productToDelete = products.find((product) => product.id === id);

  if (!productToDelete) {
    return null;
  }

  const filteredProducts = products.filter((product) => product.id !== id);
  await writeJson(productsPath, filteredProducts);
  return productToDelete;
}
