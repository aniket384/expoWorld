# Step-by-Step Guide to Setup Firebase Phone Authentication

## 1. Enable Phone Authentication in Firebase Console
- Go to https://console.firebase.google.com
- Select your project
- Navigate to **Authentication** > **Sign-in method**
- Enable **Phone** provider and save

## 2. Add SHA-1 and SHA-256 Keys to Firebase Project
- Generate SHA keys:
  - Run in terminal:
    ```
    keytool -list -v -alias androiddebugkey -keystore %USERPROFILE%\.android\debug.keystore
    ```
    Password is usually `android`
- Copy SHA-1 and SHA-256 fingerprints
- In Firebase Console, go to **Project settings** (gear icon ⚙️ next to Project Overview)
- In the **General** tab, scroll to **Your apps**
- Select your Android app (package name like `com.expoworld`)
- Scroll to **SHA certificate fingerprints**
- Click **Add fingerprint**
- Add both SHA-1 and SHA-256 keys and save

## 3. Add Test Phone Numbers (Optional but Recommended)
- In Firebase Console, go to **Authentication** > **Sign-in method** > **Phone**
- Scroll to **Phone numbers for testing**
- Add test phone numbers and verification codes
- This allows testing OTP without sending real SMS

## 4. Place Configuration Files in Your Project
- Download `google-services.json` from Firebase Console (under Project settings > General > Your apps)
- Place it in `android/app/` directory

## 5. Update Android Build Files (Already done)
- Ensure `android/build.gradle` has Google services classpath
- Ensure `android/app/build.gradle` applies Google services plugin

## 6. Rebuild and Run Your App
- Run:
  ```
  npx react-native run-android
  ```
- Test phone authentication flow

## 7. Troubleshooting
- Make sure your device/emulator has internet access
- Use test phone numbers for quick testing
- Check Firebase Console logs for errors
- Ensure billing is enabled on Firebase project (required for real SMS)

---

Follow these steps carefully to enable OTP sending and verification in your app.
