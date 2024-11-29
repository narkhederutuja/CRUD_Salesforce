
# Salesforce CRUD App with Forcereact & SmartSync

## Project Overview
This React Native application is built using **Forcereact** and **SmartSync** libraries to perform **CRUD (Create, Read, Update, Delete)** operations on Salesforce records (Contacts). The app supports **offline data storage**, **seamless synchronization** with Salesforce, and **OAuth-based authentication**.

---

## Table of Contents
1. [Local Setup](#local-setup)
2. [Project Setup](#project-setup)
3. [Salesforce Setup](#salesforce-setup)
4. [Running the App](#running-the-app)
5. [Testing Salesforce Integration](#testing-salesforce-integration)
6. [Error Handling](#error-handling)
7. [Project Structure](#project-structure)

---

## Local Setup

- **Node.js** (Latest version)
- **React Native CLI** 

  ```bash
  npm install -g react-native-cli
  ```
- **Forcereact CLI** (Salesforce React Native integration tool):
  ```bash
  npm install -g forcereact
  ```
- **Java Development Kit (JDK)** and **Android Studio**
- **VScode** (IDE) 
- **Salesforce Developer Account**.

---

## Project Setup

### 1. Initialized the Project

1. Created the project using `forcereact`:
   ```bash
   forcereact create
   ```

2. Followed the prompts:
   - **App Type:** `react_native`
   - **App Name:** `SLFC_CRUD`
   - **Enter Salesforce Connected App details** (Consumer Key, Callback URL).

3. Navigated to the project directory:
   ```bash
   cd SLFC_CRUD
   ```

4. Installed dependencies:
   ```bash
   npm install
   ```

---

## Salesforce Setup

### 1. Used Existing Salesforce Developer Account

### 2. Set Up a Connected App
1. Logged into your Salesforce Developer account.
2. Navigate to **Setup > App Manager** and click **New Connected App**.
3. Configure the following:
   - **App Name**: `SLFC_CRUD`
   - **API (Enable OAuth Settings)**: enabled
   - **Callback URL**: Use `sfdc://success`.
   - **OAuth Scopes**:
     - `Access and manage your data (api)`
     - `Perform requests on your behalf at any time (refresh_token, offline_access)`
     - `Full access`
4. Save and note down the **Consumer Key** and **Consumer Secret**.

---

## Running the App

### 1. Android Setup
1. Open **Android Studio** and go to Virtual Device Manager.
2. Connect an Android device or start an emulator (API 35 Small Phone).
3. Run the app:
   ```bash
   npx react-native run-android
   ```
---

## Testing Salesforce Integration

1. **Login:** 
   - Launch the app and tap "Login to Salesforce". 
   - Provide your Salesforce credentials.
2. **CRUD Operations:** ( *written in src/components/CRUDForm.js* )
   - **Create:** Use the "Add Contact" form.
   - **Read:** View the list of Contacts.
   - **Update:** Tap a Contact to edit.
   - **Delete:** Use the delete option on a Contact.
3. **Syncing:** 
   - Use the **Sync Up** button to push local changes to Salesforce.

---

## Error Handling

- **Network Issues:** The app handles offline scenarios using **SmartStore**. When offline, changes are stored locally and synced once online.
- **Authentication Errors:** Ensure the OAuth token is valid. If issues occur, try logging out and back in.
- **API Errors:** All Salesforce API errors are logged to the console and displayed as alerts for user feedback.

---

## Project Structure

```
SLFC_CRUD
├── src/
│   ├── components/
│   │   ├── Login.js            # Salesforce login screen
│   │   ├── Home.js             # Lists all contacts
│   │   ├── Detail.js           # Displays detailed information of a contact
│   │   └── CRUDForm.js         # Create, Update, and Delete contacts
│   ├── services/
│   │   └── salesforce.js       # SmartSync and SmartStore API logic
│   └── navigation/
│       └── AppNavigator.js     # Navigation logic using react-navigation
├── android/                    # Android project files                        
├── App.js                      # Main entry point of the app
└── README.md                   # Project 
```

---


