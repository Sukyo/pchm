interface LocalEntry<T extends number | string | boolean> {
    key: string,
    value: T,
}
type Entry = Partial<LocalEntry<number | string | boolean>>;
/**
 * 获取
 * @param key 要获取的key
 */
export const getLocal = (key: string): string | null => {
    return window.localStorage.getItem(key);
}
/**
 * 删除
 * @param key 要删除的key
 */
export const removeLocal = (key: string): void => {
    window.localStorage.removeItem(key);
}
/**
 * 保存
 * @param entry 要对本地存储操作的entry键值对
 */
export const saveLocal = (entry: Entry): void => {
    window.localStorage.setItem(entry.key!, entry.value!.toString());
}
/**
 * 清空
 * 
 */
export const clearLocal = (): void => {
    window.localStorage.clear();
}
