import { NotificationData, notifications } from "@mantine/notifications";
import { CoverLetterDataType, SavedCoverLetterData } from "./types";

const dbRequest = () => {
  return window.indexedDB.open("cvDb", 1);
};

const commonError = {
  color: "red",
  title: "Fel",
  message: "Något gick fel, försök igen senare",
  position: "bottom-center" as NotificationData["position"],
};

interface CoverLetterReqProps {
  handleSuccess: (store: IDBObjectStore) => void;
  handleError?: (transactions: IDBTransaction) => void;
  mehtod: IDBTransactionMode;
}

const coverLetterReq = ({
  handleSuccess,
  handleError,
  mehtod,
}: CoverLetterReqProps) => {
  const request = dbRequest();

  request.onsuccess = () => {
    const db = request.result;
    const transaction = db.transaction("coverLetter", mehtod);
    const store = transaction.objectStore("coverLetter");
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

export const getCoverLetter = (
  name: string
): Promise<CoverLetterDataType | null> =>
  new Promise((resolve) => {
    const handleSuccess = (store: IDBObjectStore) => {
      const cLRequest = store.get(name);

      cLRequest.onsuccess = () => {
        resolve(cLRequest.result);
      };

      cLRequest.onerror = () => {
        resolve(null);
      };
    };

    const handleError = () => {
      resolve(null);
    };

    coverLetterReq({ handleSuccess, handleError, mehtod: "readonly" });
  });

export const saveAsCoverLetter = (name: string, html: string, json: string) =>
  new Promise((resolve) => {
    const handleSuccess = (store: IDBObjectStore) => {
      const createdAt = new Date().toISOString();
      const cLRequest = store.add({ id: name, html, json, createdAt });

      cLRequest.onsuccess = () => {
        notifications.show({
          color: "green",
          title: "Färdig",
          message: "Personligt brev sparat",
          position: "bottom-center",
        });
        resolve(true);
      };

      cLRequest.onerror = () => {
        console.log("Error saving cover letter: ", cLRequest.error);
        resolve(false);
      };
    };

    const handleError = (transaction: IDBTransaction) => {
      console.log("Error saving cover letter: ", transaction.error);
      resolve(false);
    };

    coverLetterReq({ handleSuccess, handleError, mehtod: "readwrite" });
  });

export const saveCoverLetter = (name: string, html: string, json: string) =>
  new Promise((resolve) => {
    const handleSuccess = (store: IDBObjectStore) => {
      const createdAt = new Date().toISOString();
      const cLRequest = store.put({ id: name, html, json, createdAt });

      cLRequest.onsuccess = () => {
        notifications.show({
          color: "green",
          title: "Färdig",
          message: "Personligt brev sparat",
          position: "bottom-center",
        });
        resolve(true);
      };

      cLRequest.onerror = () => {
        resolve(false);
      };
    };

    const handleError = (transaction: IDBTransaction) => {
      console.error("Error saving cover letter: ", transaction.error);
      resolve(false);
    };

    coverLetterReq({ handleSuccess, handleError, mehtod: "readwrite" });
  });

export const deleteCoverLetter = (name: string) =>
  new Promise((resolve) => {
    const handleSuccess = (store: IDBObjectStore) => {
      const cLRequest = store.delete(name);

      cLRequest.onsuccess = () => {
        notifications.show({
          color: "green",
          title: "Färdig",
          message: "Personligt brev raderat",
          position: "bottom-center",
        });
        resolve(true);
      };

      cLRequest.onerror = () => {
        resolve(false);
      };
    };

    const handleError = (transaction: IDBTransaction) => {
      console.error("Error deleting cover letter: ", transaction.error);
      resolve(false);
    };

    coverLetterReq({ handleSuccess, handleError, mehtod: "readwrite" });
  });

export const getSavedCoverLetterData = (): Promise<SavedCoverLetterData[]> =>
  new Promise((resolve) => {
    const handleSucces = (store: IDBObjectStore) => {
      const coverLetterRequest = store.getAll();

      coverLetterRequest.onsuccess = () => {
        const coverLetterData = coverLetterRequest.result.map(
          (coverLetter) => ({
            name: coverLetter.id,
            createdAt: coverLetter.createdAt,
          })
        );

        coverLetterRequest.onerror = () => {
          notifications.show(commonError);
          resolve([]);
        };

        resolve(coverLetterData);
      };
    };

    const handleError = () => {
      notifications.show(commonError);
      resolve([]);
    };

    coverLetterReq({
      handleSuccess: handleSucces,
      handleError,
      mehtod: "readonly",
    });
  });
