import { faker } from '@faker-js/faker'

export const generateProductData = (count = 1000) => {
  return Array.from({ length: count }, (_, index) => ({
    productId: faker.string.uuid(),
    productName: faker.commerce.productName(),
    productDesc: faker.commerce.productDescription(),
    productCost: parseFloat(faker.commerce.price()),
    productTax: parseFloat(
      (faker.number.float({ min: 0, max: 1, multipleOf: 0.01 }) * 100).toFixed(
        2,
      ),
    ),
    productImages: Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      () => faker.image.url(),
    ),
    productCategory: faker.commerce.department(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  }))
}
