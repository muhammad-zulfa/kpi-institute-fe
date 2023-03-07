export const toKB = (bytes: number) => (bytes / 1024).toFixed(2);
export const toMB = (bytes: number) => toKB(bytes / 1024);
export const toGB = (bytes: number) => toMB(bytes / 1024);

export const getTotalPages = (total: number, limit: number) => {
  return Math.ceil(total / limit);
}