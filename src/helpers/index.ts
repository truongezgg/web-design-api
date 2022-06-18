export function randomString(length = 64) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function assignPaging(params: { [key: string]: any }) {
  params.pageIndex = Number(params.pageIndex) || 1;
  params.pageSize = Number(params.pageSize) || 10;
  params.skip = (params.pageIndex - 1) * params.pageSize;
  return params;
}
