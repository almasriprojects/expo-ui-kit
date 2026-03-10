import AsyncStorage from '@react-native-async-storage/async-storage';

function warn(method: string, key: string, error: unknown) {
  if (__DEV__) {
    console.warn(`[storage.${method}] Failed for key "${key}":`, error);
  }
}

export const storage = {
  async get<T = string>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null) return null;
      return JSON.parse(value) as T;
    } catch (e) {
      warn('get', key, e);
      return null;
    }
  },

  async set<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      warn('set', key, e);
    }
  },

  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      warn('remove', key, e);
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      warn('clear', '*', e);
    }
  },
};
