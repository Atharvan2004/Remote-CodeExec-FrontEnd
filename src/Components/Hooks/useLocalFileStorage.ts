const useLocalFileStorage = async(key: string, initialValue: string,fileName:string) => {
  const storedValue = localStorage.getItem(key);

  if(fileName.length>1){
    const storedFile = JSON.parse(storedValue||"")
    return storedFile[fileName].value
  }

  if (storedValue !== null) {
    return [storedValue, (value: string) => localStorage.setItem(key, value)] as const;
  } else {
    localStorage.setItem(key, initialValue);
    return [initialValue, (value: string) => localStorage.setItem(key, value)] as const;
  }
};

export  {useLocalFileStorage};
