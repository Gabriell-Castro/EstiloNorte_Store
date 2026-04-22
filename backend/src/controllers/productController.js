import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct
} from '../services/productService.js';

function parseProductPayload(body) {
  return {
    name: body.name,
    description: body.description,
    category: body.category,
    price: body.price,
    image: body.image,
    sizes: Array.isArray(body.sizes) ? body.sizes : [],
    stock: body.stock,
    featured: body.featured
  };
}

function hasRequiredFields(product) {
  return product.name && product.description && product.category && product.price && product.image;
}

export async function listProducts(req, res) {
  const { search = '', category = '' } = req.query;
  const products = await getAllProducts();

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? product.category === category : true;
    return matchesSearch && matchesCategory;
  });

  return res.json(filteredProducts);
}

export async function showProduct(req, res) {
  const product = await getProductById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Produto não encontrado.' });
  }

  return res.json(product);
}

export async function storeProduct(req, res) {
  const productPayload = parseProductPayload(req.body);

  if (!hasRequiredFields(productPayload)) {
    return res.status(400).json({ message: 'Preencha os campos obrigatórios do produto.' });
  }

  const product = await createProduct(productPayload);
  return res.status(201).json(product);
}

export async function updateProductById(req, res) {
  const productPayload = parseProductPayload(req.body);

  if (!hasRequiredFields(productPayload)) {
    return res.status(400).json({ message: 'Preencha os campos obrigatórios do produto.' });
  }

  const product = await updateProduct(req.params.id, productPayload);

  if (!product) {
    return res.status(404).json({ message: 'Produto não encontrado.' });
  }

  return res.json(product);
}

export async function destroyProduct(req, res) {
  const deletedProduct = await deleteProduct(req.params.id);

  if (!deletedProduct) {
    return res.status(404).json({ message: 'Produto não encontrado.' });
  }

  return res.json({ message: 'Produto removido com sucesso.', product: deletedProduct });
}
