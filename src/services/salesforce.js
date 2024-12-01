import { smartstore, smartsync } from 'react-native-force';

//Initialization: initForcereactSmartStore --creates a soup to store contact data locally.
//Sync Down: syncDownForcereactContacts --fetches contact records from Salesforce into the soup.
//Sync Up: syncUpForcereactContacts-- pushes local changes back to Salesforce.
//Query: fetchForcereactLocalContacts --retrieves data from the local soup for offline display.
//Crud methods with respecive smartstore queries

// Sync setup using forcereact-based SmartSync
const storeName = "ContactStore"; // Local soup name
const syncName = "ContactSync";   // Sync Configuration name

/* Soup:
   - Data container in SmartStore
   - JSON format, similar to a table
   - Supports indexing and querying
   - Stores multiple records and syncs with Salesforce using SmartSync.
*/

// Initialize SmartStore for forcereact
export const initForcereactSmartStore = () => {
  smartstore.registerSoup(
    storeName,
    [
      { path: "Id", type: "string" },
      { path: "Name", type: "string" },
      { path: "Phone", type: "string" }
    ],
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
        options: { mergeMode: smartsync.MERGE_MODE_OVERWRITE } // Overwrite local records with server data in case of conflict
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
        target: { type: "rest" }, // Use REST API endpoint as sync target
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
    smartstore.querySoup(
      storeName,
      smartstore.buildAllQuerySpec("Id", "ascending", 1000),
      resolve,
      reject
    );
  });
};

// ==== Added CRUD Methods==== //

// Create a new contact in the local SmartStore
export const createContact = async (contactData) => {
  return new Promise((resolve, reject) => {
    smartstore.upsertSoupEntries(
      storeName,
      [contactData],
      resolve,
      (error) => reject(`Create Contact Failed: ${error}`)
    );
  });
};

// Update an existing contact in the local SmartStore
export const updateContact = async (id, updatedData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingContacts = await fetchForcereactLocalContacts();
      const contact = existingContacts.find((c) => c.Id === id);
      if (contact) {
        const updatedContact = { ...contact, ...updatedData };
        smartstore.upsertSoupEntries(
          storeName,
          [updatedContact],
          resolve,
          (error) => reject(`Update Contact Failed: ${error}`)
        );
      } else {
        reject("Contact not found");
      }
    } catch (error) {
      reject(`Update Contact Error: ${error}`);
    }
  });
};

// Delete a contact from the local SmartStore by Id
export const deleteContact = (id) => {
  return new Promise((resolve, reject) => {
    smartstore.removeFromSoup(
      storeName,
      [id],
      resolve,
      (error) => reject(`Delete Contact Failed: ${error}`)
    );
  });
};

// Sync up all changes (create, update, delete) to Salesforce
export const syncUpContacts = async () => {
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
      (error) => reject(`Sync Up Contacts Failed: ${error}`)
    );
  });
};
