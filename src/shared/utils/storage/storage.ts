import AsyncStorage from "@react-native-async-storage/async-storage"
import { TUser } from "greenbowl-schema"

export const StorageKeys = {
  token: "greenbowl-token",
  user: "user",
} as const

export class Storage {
  static async set(key: keyof typeof StorageKeys, value: any): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  }

  static async get(key: keyof typeof StorageKeys): Promise<any | null> {
    try {
      const almostThere = await AsyncStorage.getItem(key)
      return JSON.parse(almostThere)
    } catch {
      return null
    }
  }

  /**
   * Removes something from storage.
   *
   * @param key The key to kill.
   */
  static async remove(key: keyof typeof StorageKeys): Promise<void> {
    try {
      await AsyncStorage.removeItem(key)
    } catch {}
  }

  /**
   * Burn it all to the ground.
   */
  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear()
    } catch {}
  }

  static async currentUser(): Promise<TUser | null> {
    return this.get("user")
  }
}

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export async function loadString(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key)
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function saveString(key: string, value: string): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export async function load(key: string): Promise<any | null> {
  try {
    const almostThere = await AsyncStorage.getItem(key)
    return JSON.parse(almostThere)
  } catch {
    return null
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function save(key: string, value: any): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export async function remove(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key)
  } catch {}
}

/**
 * Burn it all to the ground.
 */
export async function clear(): Promise<void> {
  try {
    await AsyncStorage.clear()
  } catch {}
}
