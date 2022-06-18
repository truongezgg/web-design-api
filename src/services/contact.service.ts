import { error } from '$helpers/response';
import { ContactModel } from '$models/ContactModel';
import { CommonStatus, ContactState, ErrorCode } from '$types/enum';

export interface ICreateContact {
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
}
export async function createContact(params: ICreateContact) {
  const Contact = new ContactModel(params);

  const result = await Contact.save();

  return result.toObject();
}

export interface IGetListContact {
  pageIndex: number;
  pageSize: number;
  keyword?: string;
  status?: CommonStatus[];
  skip: number;
  state: ContactState[];
}
export async function getListContact(params: IGetListContact) {
  const queryBuilder = ContactModel.find();
  const countQueryBuilder = ContactModel.find();

  if (params.status && params.status.length) {
    queryBuilder.where('status').in(params.status);
    countQueryBuilder.where('status').in(params.status);
  }

  if (params.state && params.state.length) {
    queryBuilder.where('state').in(params.state);
    countQueryBuilder.where('state').in(params.state);
  }

  if (params.keyword) {
    queryBuilder.where({
      $or: [
        { name: { $regex: new RegExp(params.keyword, 'i') } },
        { email: { $regex: new RegExp(params.keyword, 'i') } },
        { address: { $regex: new RegExp(params.keyword, 'i') } },
        { phone: { $regex: new RegExp(params.keyword, 'i') } },
        { description: { $regex: new RegExp(params.keyword, 'i') } },
      ],
    });
    countQueryBuilder.where({
      $or: [
        { name: { $regex: new RegExp(params.keyword, 'i') } },
        { email: { $regex: new RegExp(params.keyword, 'i') } },
        { address: { $regex: new RegExp(params.keyword, 'i') } },
        { phone: { $regex: new RegExp(params.keyword, 'i') } },
        { description: { $regex: new RegExp(params.keyword, 'i') } },
      ],
    });
  }

  const totalItems = await countQueryBuilder.count();

  const results = await queryBuilder
    .sort({ createdAt: -1 })
    .skip(params.skip)
    .limit(params.pageSize)
    .exec();
  return { results, totalItems };
}

export interface IUpdateContact {
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  status: CommonStatus;
  state: ContactState;
}
export async function updateContact(ContactId: string, params: IUpdateContact) {
  const Contact = await ContactModel.findOne({ _id: ContactId });
  if (!Contact) throw error(ErrorCode.Not_Found);

  Object.assign(Contact, params);

  await Contact.save();
}
