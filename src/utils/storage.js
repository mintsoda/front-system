const local = window.localStorage;
export default {
  set(key, data) {
    return local.setItem(key, typeof data != 'string' ? JSON.stringify(data) : data);
  },
  get(key) {
    let data = local.getItem(key);
    if (!data) {
      return false
    }
    try {
      if (JSON.parse(data)) {
        data = JSON.parse(data)
      }
    } catch (err) {
    }
    return data;
  },
  remove(key) {
    return local.removeItem(key)
  }
}
