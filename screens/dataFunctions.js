import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (str,value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(str.toString(), jsonValue)
    } catch (e) {
      console.log(e)
    }
  }