import { DocumentDefinition, QueryOptions } from 'mongoose';
import Product, { ProductDocument } from '../models/product.model';
export const createProduct = async (
	input: DocumentDefinition<
		Omit<ProductDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>
	>
) => {
	return Product.create(input);
};

export const findProduct = async (
	query: FilterQuery<ProductDocument>,
	options: QueryOptions = { lean: true }
) => {
	return Product.findOne(query, {}, options);
};

export const updateProduct = async (
	query: FilterQuery<ProductDocument>,
	update: updateQuery<ProductDocument>,
	options: QueryOptions
) => {
	return Product.findOneAndUpdate(query, update, options);
};

export const deleteProduct = async (query: FilterQuery<ProductDocument>) => {
	return Product.findOneAndDelete(query);
	//return Product.deleteOne(query);
};
