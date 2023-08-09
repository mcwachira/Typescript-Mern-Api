import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import Product, {
    ProductDocument,
    ProductInput,
} from "../models/product.model";


export async function createProduct(input: ProductInput) {

    try {
        const result = await Product.create(input);

        return result;
    } catch (e) {

        throw e;
    }
}

export async function findProduct(
    query: FilterQuery<ProductDocument>,
    options: QueryOptions = { lean: true }
) {
    const metricsLabels = {
        operation: "findProduct",
    };

    // const timer = databaseResponseTimeHistogram.startTimer();
    try {
        const result = await Product.findOne(query, {}, options);

        return result;
    } catch (e) {


        throw e;
    }
}

export async function findAndUpdateProduct(
    query: FilterQuery<ProductDocument>,
    update: UpdateQuery<ProductDocument>,
    options: QueryOptions
) {
    return Product.findOneAndUpdate(query, update, options);
}

export async function deleteProduct(query: FilterQuery<ProductDocument>) {
    return Product.deleteOne(query);
}