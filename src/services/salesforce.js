import { smartstore, smartsync } from 'react-native-force';

// Sync setup using forcereact-based SmartSync
const storeName = "ContactStore";
const syncName = "ContactSync";

// Initialize SmartStore for forcereact
export const initForcereactSmartStore = () => {
  smartstore.registerSoup(
    storeName,
    [{ path: "Id", type: "string" }, { path: "Name", type: "string" }, { path: "Phone", type: "string" }],
    (soupName) => console.log("Soup Registered:", soupName),
    (error) => console.error("Soup Registration Failed:", error)
  );
};

// Sync down using forcereact-generated SOQL query
export const syncDownForcereactContacts = () => {
  return new Promise((resolve, reject) => {
    smartsync.syncDown(
      {
        syncName,
        target: { type: "soql", query: "SELECT Id, Name, Phone FROM Contact" },
        options: { mergeMode: smartsync.MERGE_MODE_OVERWRITE }
      },
      storeName,
      (syncStatus) => {
        if (syncStatus.status === "DONE") resolve(syncStatus);
      },
      (error) => reject(error)
    );
  });
};

// Sync up using forcereact
export const syncUpForcereactContacts = () => {
  return new Promise((resolve, reject) => {
    smartsync.syncUp(
      {
        target: { type: "rest" },
        options: { fieldlist: ["Id", "Name", "Phone"] }
      },
      storeName,
      (syncStatus) => {
        if (syncStatus.status === "DONE") resolve(syncStatus);
      },
      (error) => reject(error)
    );
  });
};

// Fetch Contacts from Local SmartStore (forcereact)
export const fetchForcereactLocalContacts = () => {
  return new Promise((resolve, reject) => {
    smartstore.querySoup(storeName, smartstore.buildAllQuerySpec("Id", "ascending", 1000), resolve, reject);
  });
};
