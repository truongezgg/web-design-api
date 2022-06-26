import { error } from '$helpers/response';
import { ConfigModel } from '$models/ConfigModel';
import { ErrorCode } from '$types/enum';

export async function createConfig(key: string, value: string) {
  const Config = new ConfigModel({ key, value });

  return await Config.save();
}

export async function updateConfig(key: string, value: string) {
  const Config = await ConfigModel.findOne({ key });
  if (!Config) throw error(ErrorCode.Not_Found);

  Object.assign(Config, { value });
  return await Config.save();
}

export async function getConfig() {
  const results = await ConfigModel.find().lean();

  return results.reduce((acc, cur) => {
    acc[cur.key] = cur;
    return acc;
  }, {});
}

export async function deleteConfig(key: string) {
  const Config = await ConfigModel.findOne({ key });
  if (!Config) throw error(ErrorCode.Not_Found);

  return await Config.deleteOne();
}
