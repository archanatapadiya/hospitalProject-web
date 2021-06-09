const storage = (() => {
    const setItem = async (key, value) => {
      return localStorage.setItem(key, value);
    };
  
    const getItem = async (key) => {
      return localStorage.getItem(key);
    };
  
    const removeItem = async (key) => {
      return localStorage.removeItem(key);
    };
  
    return {
      setItem,
      getItem,
      removeItem,
    };
  })();
  
  export default storage;
  