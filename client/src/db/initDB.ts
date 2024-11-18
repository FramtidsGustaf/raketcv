export const initDB = () => {
  return new Promise((resolve) => {
    const request = indexedDB.open("cvDb", 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      db.createObjectStore("cv", { keyPath: "id" });
      db.createObjectStore("coverLetter", { keyPath: "id" });
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      console.error("Error opening database: ", request.error);
      resolve(false);
    };
  });
};
