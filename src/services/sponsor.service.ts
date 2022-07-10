import { error } from '$helpers/response';
import { CategoryModel } from '$models/CategoryModel';
import { PostModel } from '$models/PostModel';
import { SponsorModel } from '$models/SponsorModel';
import { CommonStatus, ErrorCode } from '$types/enum';

export interface ICreateSponsor {
  name: string;
  avatar: string;
}
export async function createSponsor(userId: string, params: ICreateSponsor) {
  const Sponsor = new SponsorModel({
    ...params,
    createdBy: userId,
  });

  const result = await Sponsor.save();
  return result.toObject();
}

export interface IGetListSponsor {
  pageIndex: number;
  pageSize: number;
  keyword?: string;
  status?: CommonStatus[];
  skip: number;
}
export async function getListSponsor(params: IGetListSponsor) {
  const queryBuilder = SponsorModel.find();

  const countQueryBuilder = SponsorModel.find();

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

export interface IUpdateSponsor {
  name: string;
  avatar: string;
  status: number;
}
export async function updateSponsor(PostId: string, params: IUpdateSponsor) {
  const Sponsor = await SponsorModel.findOne({ _id: PostId });
  if (!Sponsor) throw error(ErrorCode.Not_Found);

  Object.assign(Sponsor, params);
  await Sponsor.save();
}
