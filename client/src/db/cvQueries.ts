import { notifications, type NotificationData } from "@mantine/notifications";
import { CVDataType, SavedCVData } from "./types";
import { LoadedCVName } from "../store/store";

const commonError = {
  color: "red",
  title: "Fel",
  message: "Något gick fel, försök igen senare",
  position: "bottom-center" as NotificationData["position"],
};

const dbRequest = () => {
  return window.indexedDB.open("cvDb", 1);
};

interface CVReqProps {
  handleSuccess: (store: IDBObjectStore) => void;
  handleError?: (transactions: IDBTransaction) => void;
  method: IDBTransactionMode;
}

const cVReq = ({ handleSuccess, method, handleError }: CVReqProps) => {
  const request = dbRequest();

  request.onsuccess = () => {
    const db = request.result;
    const transaction = db.transaction("cv", method);
    const store = transaction.objectStore("cv");
    handleSuccess(store);

    if (handleError) {
      transaction.onerror = () => {
        handleError(transaction);
      };
    }
  };

  request.onerror = () => {
    console.error("Error opening database: ", request.error);
    notifications.show(commonError);
  };
};

export const getCV = (name: string): Promise<CVDataType | null> =>
  new Promise((resolve) => {
    const handleSuccess = (store: IDBObjectStore) => {
      const cvRequest = store.get(name);

      cvRequest.onsuccess = () => {
        LoadedCVName.value = name;
        resolve(cvRequest.result);
      };

      cvRequest.onerror = () => {
        notifications.show({
          color: "red",
          title: "Fel",
          message: "Något gick fel, försök igen senare",
          position: "bottom-center",
        });
        resolve(null);
      };
    };

    cVReq({ handleSuccess, method: "readonly" });
  });

export const saveAsCV = async (name: string, data: any): Promise<boolean> =>
  new Promise(async (resolve) => {
    const hasCV = await hasDBCV(name);

    if (hasCV) {
      notifications.show({
        color: "red",
        title: "CV finns redan",
        message: "CV med detta namn finns redan. Välj ett annat namn",
        position: "bottom-center",
      });
      return false;
    }

    const handleSuccess = (store: IDBObjectStore) => {
      const createdAt = new Date().toISOString();
      const cvRequest = store.add({ id: name, cv: data, createdAt });

      cvRequest.onsuccess = () => {
        notifications.show({
          title: "Succé",
          message: "Ditt CV har sparats",
          position: "bottom-center",
        });
        resolve(true);
      };
    };

    const handleError = () => {
      notifications.show(commonError);
      resolve(false);
    };

    cVReq({ handleSuccess, method: "readwrite", handleError });
  });

export const saveCV = async (name: string, data: any): Promise<boolean> =>
  new Promise((resolve) => {
    const handleSuccess = (store: IDBObjectStore) => {
      const createdAt = new Date().toISOString();
      const cvRequest = store.put({ id: name, cv: data, createdAt });

      cvRequest.onsuccess = () => {
        notifications.show({
          title: "Succé",
          message: "Ditt CV har uppdaterats",
          position: "bottom-center",
        });
        resolve(true);
      };
    };

    const handleError = () => {
      notifications.show(commonError);
      resolve(false);
    };

    cVReq({ handleSuccess, method: "readwrite", handleError });
  });

export const getAllCVNames = () =>
  new Promise((resolve) => {
    const handleSuccess = (store: IDBObjectStore) => {
      const cvRequest = store.getAllKeys();

      cvRequest.onsuccess = () => {
        resolve(cvRequest.result);
      };

      cvRequest.onerror = () => {
        notifications.show(commonError);
        resolve([]);
      };
    };

    const handleError = () => {
      notifications.show(commonError);
      resolve([]);
    };

    cVReq({ handleSuccess, method: "readonly", handleError });
  });

export const hasDBCV = (name: string) =>
  new Promise((resolve) => {
    const handleSuccess = (store: IDBObjectStore) => {
      const cvRequest = store.getKey(name);

      cvRequest.onsuccess = () => {
        resolve(cvRequest.result !== undefined);
      };

      cvRequest.onerror = () => {
        resolve(false);
      };
    };

    const handleError = (transaction: IDBTransaction) => {
      console.error("Error checking if CV exists: ", transaction.error);
      resolve(false);
    };

    cVReq({ handleSuccess, method: "readonly", handleError });
  });

export const deleteCV = (name: string) => {
  const handleSuccess = (store: IDBObjectStore) => {
    const cvRequest = store.delete(name);

    cvRequest.onsuccess = () => {
      notifications.show({
        title: "Succé",
        message: "CV har tagits bort",
        position: "bottom-center",
      });
    };
  };

  const handleError = () => {
    notifications.show(commonError);
  };

  cVReq({ handleSuccess, method: "readwrite", handleError });
};

export const getSavedCVData = (): Promise<SavedCVData[]> =>
  new Promise((resolve) => {
    const handleSuccess = (store: IDBObjectStore) => {
      const cvRequest = store.getAll();

      cvRequest.onsuccess = () => {
        const cvData = cvRequest.result.map((cv) => ({
          name: cv.id,
          createdAt: cv.createdAt,
        }));

        resolve(cvData);
      };

      cvRequest.onerror = () => {
        notifications.show(commonError);
        resolve([]);
      };
    };

    const handleError = () => {
      notifications.show(commonError);
      resolve([]);
    };

    cVReq({ handleSuccess, method: "readonly", handleError });
  });
