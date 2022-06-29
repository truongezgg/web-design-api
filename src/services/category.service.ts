import { error } from '$helpers/response';
import { CategoryModel } from '$models/CategoryModel';
import { PostModel } from '$models/PostModel';
import { CommonStatus, ErrorCode } from '$types/enum';
import mongoose from 'mongoose';

export interface ICreateCategory {
  name: string;
  avatar: string;
  description: string;
}
export async function createCategory(userId: string, params: ICreateCategory) {
  const Category = new CategoryModel({
    ...params,
    createdBy: userId,
  });

  const result = await Category.save();

  return result.toObject();
}

export interface IGetListCategory {
  pageIndex: number;
  pageSize: number;
  keyword?: string;
  status?: CommonStatus[];
  skip: number;
}
export async function getListCategory(params: IGetListCategory) {
  const queryBuilder = CategoryModel.find().populate('createdBy', '_id status name');
  const countQueryBuilder = CategoryModel.find();

  if (params.status && params.status.length) {
    queryBuilder.where('status').in(params.status);
    countQueryBuilder.where('status').in(params.status);
  }

  if (params.keyword) {
    queryBuilder.where('name').regex(new RegExp(params.keyword, 'i'));
    countQueryBuilder.where('name').regex(new RegExp(params.keyword, 'i'));
  }

  const totalItems = await countQueryBuilder.count();

  const results = await queryBuilder
    .sort({ createdAt: -1 })
    .skip(params.skip)
    .limit(params.pageSize)
    .exec();
  return { results, totalItems };
}

export interface IUpdateCategory {
  name: string;
  avatar: string;
  description: string;
  status: CommonStatus;
}
export async function updateCategory(categoryId: string, params: IUpdateCategory) {
  const category = await CategoryModel.findOne({ _id: categoryId });
  if (!category) throw error(ErrorCode.Not_Found);

  Object.assign(category, params);

  await category.save();
}

export async function getDetailCategory(categoryId: string) {
  const category = await CategoryModel.findOne({ _id: categoryId }).populate(
    'createdBy',
    '_id status name'
  );

  return category;
}

export interface IGetListPostByCategory {
  pageIndex: number;
  pageSize: number;
  keyword?: string;
  status?: CommonStatus[];
  skip: number;
}
export async function getListPostByCategory(categoryId: string, params: IGetListPostByCategory) {
  const objectId = new mongoose.Types.ObjectId(categoryId);
  const queryBuilder = PostModel.find({ category: objectId });
  const countQueryBuilder = PostModel.find({ category: objectId });

  if (params.status && params.status.length) {
    queryBuilder.where('status').in(params.status);
    countQueryBuilder.where('status').in(params.status);
  }

  if (params.keyword) {
    queryBuilder.where('name').regex(new RegExp(params.keyword, 'i'));
    countQueryBuilder.where('name').regex(new RegExp(params.keyword, 'i'));
  }

  const totalItems = await countQueryBuilder.count();
  const results = await queryBuilder
    .sort({ createdAt: -1 })
    .skip(params.skip)
    .limit(params.pageSize)
    .exec();

  return {
    results,
    totalItems,
  };
}
