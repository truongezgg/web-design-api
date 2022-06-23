import { error } from '$helpers/response';
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
}
export async function createPost(userId: string, params: ICreatePost) {
  const Post = new PostModel({
    ...params,
    createdBy: userId,
  });

  const result = await Post.save();

  return result.toObject();
}

export interface IGetListPost {
  pageIndex: number;
  pageSize: number;
  keyword?: string;
  status?: CommonStatus[];
  skip: number;
  categoryIds: string[];
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
  year: string;
  description: string;
  payload: { [key: string]: any };
  images: { priority: number; url: string }[];
  status: CommonStatus;
}
export async function updatePost(PostId: string, params: IUpdatePost) {
  const Post = await PostModel.findOne({ _id: PostId });
  if (!Post) throw error(ErrorCode.Not_Found);

  Object.assign(Post, params);

  await Post.save();
}

export async function getDetailPost(postId: string) {
  const post = await PostModel.findOne({ _id: postId })
    .populate('createdBy', '_id status name')
    .populate('category', '_id name');

  return post;
}
