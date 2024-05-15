import { generateProduct } from "../../utils/faker.js";

export default class ProductRepository {

  constructor(dao) {
    this.dao = dao;
  }

  createProduct = async (body) => {
    return await this.dao.create({
      title: body.title,
      category: body.category,
      code: body.code,
      description: body.description,
      price: body.price,
      status: body.status,
      stock: body.stock,
      thumbnails: body.thumbnails,
    });
  };

  updateProduct = async (upFields, id) => {
    return await this.dao.findByIdAndUpdate(id, upFields);
  };

  updateProductStock = async (id,newStock) => {
    return await this.dao.updateStock(id,newStock)
  }

  deleteProduct = async (id) => {
    return await this.dao.deleteOneById(id);
  };

  getAllProducts = async () => {
    return await this.dao.findAll();
  };

  getProductById = async (id) => {
    return await this.dao.findById(id);
  };

  getProducts = async ({ limit, page = 1, query, sort }) => {
    // @ts-ignore
    return await this.dao.getPaginated(
      { title: { $regex: query, $options: "i" } },
      {
        limit,
        page,
        sort
      }
    );
  };

  getMockingProducts = async (amount = 100) => {
    const mockingproducts = []
    for (let i = 0; i < amount; i++) {
      const generatedProduct = generateProduct()
      mockingproducts.push(generatedProduct)
    }
    return mockingproducts
  }
}