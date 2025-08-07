# Firebase Phone Authentication Setup Guide

## Required Steps for OTP to Work

### 1. Firebase Console Setup
1. Go to https://console.firebase.google.com
2. Create a new project or select existing one
3. Add your Android app:
   - Click "Add app" → Android
   - Enter package name: `com.expoworld`
   - Download `google-services.json`
   - Place it in `android/app/google-services.json`

4. Enable Phone Authentication:
   - Go to Authentication → Sign-in method
   - Enable "Phone" provider
   - Configure phone numbers for testing (optional)

### 2. Android Configuration

#### Add google-services.json
Place the downloaded `google-services.json` file in:
```
android/app/google-services.json
```

#### Update android/build.gradle
Add the Google services classpath:
```gradle
buildscript {
    dependencies {
        classpath 'com.google.gms:google-services:4.4.0'
    }
}
```

#### Update android/app/build.gradle
Add at the bottom:
```gradle
apply plugin: 'com.google.gms.google-services'
```

### 3. Test Phone Numbers (Optional)
In Firebase Console → Authentication → Sign-in method → Phone:
- Add test phone numbers and verification codes
- This allows testing without real SMS

### 4. Testing the Flow
After setup, test with:
- Real phone number (will receive actual SMS)
- Test phone number (if configured in Firebase Console)

### 5. Common Issues
- Ensure phone number format: `+91XXXXXXXXXX`
- Check Firebase project has billing enabled (required for SMS)
- Verify SHA certificates are added in Firebase Console
- Check network connectivity

## Quick Test
Once setup is complete, you can test with:
- Phone: `+919999999999`
- If using test mode: Use the test verification code from Firebase Console
