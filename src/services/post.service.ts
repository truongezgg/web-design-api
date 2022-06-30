import { error } from '$helpers/response';
import { CategoryModel } from '$models/CategoryModel';
import { PostModel } from '$models/PostModel';
import { CommonStatus, ErrorCode } from '$types/enum';

export interface ICreatePost {
  category: string;
  name: string;
  avatar: string;
  location: string;
  area: string;
  design: string;
  year: string;
  description: string;
  payload: { [key: string]: any };
  images: { priority: number; url: string }[];
  videos: { url: string }[];
  isDefault: number;
}
export async function createPost(userId: string, params: ICreatePost) {
  const Post = new PostModel({
    ...params,
    createdBy: userId,
  });

  const result = await Post.save();

  const postCountCategory = await PostModel.countDocuments({
    category: params.category,
    status: CommonStatus.ACTIVE,
  });
  const Category = await CategoryModel.findOne({ _id: params.category });
  await Category.update({ postCount: postCountCategory });

  return result.toObject();
}

export interface IGetListPost {
  pageIndex: number;
  pageSize: number;
  keyword?: string;
  status?: CommonStatus[];
  skip: number;
  categoryIds: string[];
  isDefault?: CommonStatus[];
}
export async function getListPost(params: IGetListPost) {
  const queryBuilder = PostModel.find()
    .populate('createdBy', '_id status name')
    .populate('category', '_id name');

  const countQueryBuilder = PostModel.find();

  if (params.status && params.status.length) {
    queryBuilder.where('status').in(params.status);
    countQueryBuilder.where('status').in(params.status);
  }

  if (params.categoryIds && params.categoryIds.length) {
    queryBuilder.where('category').in(params.categoryIds);
    countQueryBuilder.where('category').in(params.categoryIds);
  }

  if (params.keyword) {
    queryBuilder.where('name').regex(new RegExp(params.keyword, 'i'));
    countQueryBuilder.where('name').regex(new RegExp(params.keyword, 'i'));
  }
  if (params.isDefault && params.isDefault.length) {
    queryBuilder.where('isDefault').in(params.isDefault);
    countQueryBuilder.where('isDefault').in(params.isDefault);
  }

  const totalItems = await countQueryBuilder.count();

  const results = await queryBuilder
    .sort({ createdAt: -1 })
    .skip(params.skip)
    .limit(params.pageSize)
    .exec();
  return { results, totalItems };
}

export interface IUpdatePost {
  category: string;
  name: string;
  avatar: string;
  location: string;
  area: string;
  design: string;
  isDefault: CommonStatus;
  year: string;
  description: string;
  payload: { [key: string]: any };
  images: { priority: number; url: string }[];
  status: CommonStatus;
  videos: { url: string }[];
}
export async function updatePost(PostId: string, params: IUpdatePost) {
  const Post = await PostModel.findOne({ _id: PostId });
  if (!Post) throw error(ErrorCode.Not_Found);

  Object.assign(Post, params);
  await Post.save();

  const postCountCategory = await PostModel.countDocuments({
    category: Post.category,
    status: CommonStatus.ACTIVE,
  });
  const Category = await CategoryModel.findOne({ _id: Post.category });
  await Category.update({ postCount: postCountCategory });
}

export async function getDetailPost(postId: string) {
  const post = await PostModel.findOne({ _id: postId })
    .populate('createdBy', '_id status name')
    .populate('category', '_id name');

  return post;
}
