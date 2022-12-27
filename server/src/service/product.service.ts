import {
	FilterQuery,
	DocumentDefinition,
	QueryOptions,
	UpdateQuery,
} from 'mongoose';
import Product, { ProductDocument } from '../models/product.model';
import { dataBaseResponseTimeHistogram } from '../utils/metrics';
export const createProduct = async (
	input: DocumentDefinition<
		Omit<ProductDocument, 'createdAt' | 'updatedAt' | 'productId'>
	>
) => {
	const metricLabels = {
		operation: 'createProduct',
	};
	const timer = dataBaseResponseTimeHistogram.startTimer();

	try {
		const result = await Product.create(input);
		timer({ ...metricLabels, success: true });
		return result;
	} catch (error: any) {
		timer({ ...metricLabels, success: false });
		throw new error();
	}
};

export const findProduct = async (
	query: FilterQuery<ProductDocument>,
	options: QueryOptions = { lean: true }
) => {
	const metricLabels = {
		operation: 'findProduct',
	};
	const timer = dataBaseResponseTimeHistogram.startTimer();

	try {
		const result = await Product.findOne(query, {}, options);
		timer({ ...metricLabels, success: true });
		return result;
	} catch (error: any) {
		timer({ ...metricLabels, success: false });
		throw new error();
	}
};

export const updateProduct = async (
	query: FilterQuery<ProductDocument>,
	update: UpdateQuery<ProductDocument>,
	options: QueryOptions
) => {
	return Product.findOneAndUpdate(query, update, options);
};

export const deleteProduct = async (query: FilterQuery<ProductDocument>) => {
	return Product.findOneAndDelete(query);
	//return Product.deleteOne(query);
};
