# 🔧 Setup Instructions - New Year's Timer with Wishes Wall

This guide will help you configure Firebase Realtime Database and PayPal payment integration for your New Year's Timer application.

---

## 📦 Part 1: Firebase Configuration

Firebase is used to store and sync wishes in real-time across all visitors.

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter a project name (e.g., "new-year-timer-2026")
4. **Disable** Google Analytics (not needed) or keep it enabled if you want analytics
5. Click **"Create project"**

### Step 2: Enable Realtime Database

1. In your Firebase project, click on **"Realtime Database"** in the left menu
2. Click **"Create Database"**
3. Select a location (choose closest to your target audience)
4. Start in **"Test mode"** (we'll set proper rules later)
5. Click **"Enable"**

### Step 3: Configure Database Rules

1. In Realtime Database, go to the **"Rules"** tab
2. Replace the existing rules with:

```json
{
  "rules": {
    "wishes": {
      ".read": true,
      ".write": true,
      "$slotId": {
        ".validate": "newData.hasChildren(['text', 'author', 'price', 'timestamp'])"
      }
    },
    "config": {
      ".read": true,
      ".write": true
    }
  }
}
```

3. Click **"Publish"**

⚠️ **Note:** These rules allow anyone to read and write. For production, consider adding authentication.

### Step 4: Get Firebase Configuration

1. Go to **Project Settings** (gear icon ⚙️ next to "Project Overview")
2. Scroll down to **"Your apps"**
3. Click the **Web icon** `</>`
4. Register your app with a nickname (e.g., "New Year Timer Web")
5. **Copy the `firebaseConfig` object**

It will look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxxxxxxxxxx"
};
```

### Step 5: Update script.js

1. Open `script.js`
2. Find the section **"FIREBASE CONFIGURATION"** (around line 413)
3. **Replace the placeholder config** with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "YOUR_ACTUAL_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_ACTUAL_PROJECT-default-rtdb.firebaseio.com",
    projectId: "YOUR_ACTUAL_PROJECT_ID",
    storageBucket: "YOUR_ACTUAL_PROJECT.appspot.com",
    messagingSenderId: "YOUR_ACTUAL_SENDER_ID",
    appId: "YOUR_ACTUAL_APP_ID"
};
```

4. Save the file

✅ **Firebase is now configured!**

---

## 💳 Part 2: PayPal Integration

PayPal handles the payments for wishes ($49.99, $19.99, or $1.99 USD depending on the slot tier).

**Pricing Tiers:**
- **Premium Slots (1-15)**: $49.99 USD - 3 rows with ultra golden glow effects
- **VIP Slots (16-25)**: $19.99 USD - 2 rows with silver shine effects
- **Regular Slots (26+)**: $1.99 USD - Unlimited, auto-generated as purchased

### Step 1: Create PayPal Business Account

1. Go to [PayPal Developer](https://developer.paypal.com/)
2. Log in with your PayPal account (or create one)
3. If you don't have a Business account, upgrade to Business in your PayPal settings

### Step 2: Create a PayPal App

1. In PayPal Developer Dashboard, go to **"My Apps & Credentials"**
2. Make sure you're on the **"Sandbox"** tab (for testing)
3. Click **"Create App"**
4. Enter an app name (e.g., "New Year Wishes")
5. Click **"Create App"**
6. **Copy your "Client ID"** (it starts with "A")

### Step 3: Update index.html

1. Open `index.html`
2. Find the PayPal SDK script tag (near the bottom, before `</body>`):

```html
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=USD"></script>
```

3. **Replace `YOUR_PAYPAL_CLIENT_ID`** with your actual Client ID:

```html
<script src="https://www.paypal.com/sdk/js?client-id=AYourActualClientIDHere&currency=USD"></script>
```

4. Save the file

### Step 4: Test with Sandbox

For testing, PayPal provides sandbox accounts:

1. In PayPal Developer, go to **"Sandbox" > "Accounts"**
2. You'll see **test buyer** and **test seller** accounts
3. Use the **buyer account** credentials to test payments
4. Click **"View/Edit Account"** to see login details

**Test the payment:**
- Open your website
- Click an empty wish tile
- Fill in wish and name
- Click the PayPal button
- Log in with **sandbox buyer** credentials
- Complete the payment

### Step 5: Go Live (Production)

When ready to accept real payments:

1. In PayPal Developer, switch to **"Live"** tab
2. Create a new app or use existing
3. Copy the **Live Client ID**
4. Update `index.html` with the **Live Client ID**:

```html
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_LIVE_CLIENT_ID&currency=USD"></script>
```

5. Make sure your PayPal Business account is fully verified

✅ **PayPal is now integrated!**

---

## 🧪 Testing Everything

### Test Checklist:

1. ✅ Open `index.html` in a browser
2. ✅ Check browser console for "Firebase initialized successfully"
3. ✅ Click an empty wish tile
4. ✅ Modal should open
5. ✅ Enter wish and name
6. ✅ PayPal button should appear
7. ✅ Complete payment (use sandbox for testing)
8. ✅ Wish should appear on the tile immediately
9. ✅ Open in another browser/device - wish should still be there
10. ✅ Try in different languages (change browser language)

---

## 🔒 Security Recommendations (Production)

### Firebase Security:

Currently, the database rules allow anyone to write. For production:

```json
{
  "rules": {
    "wishes": {
      ".read": true,
      "$slotId": {
        ".write": "!data.exists()",  // Only allow writing if slot is empty
        ".validate": "newData.hasChildren(['text', 'author', 'price', 'timestamp']) &&
                      newData.child('text').val().length <= 100 &&
                      newData.child('author').val().length <= 15 &&
                      (newData.child('price').val() == 1.99 ||
                       newData.child('price').val() == 19.99 ||
                       newData.child('price').val() == 49.99)"
      }
    },
    "config": {
      ".read": true,
      "totalSlots": {
        ".write": true,
        ".validate": "newData.isNumber() && newData.val() >= 10"
      }
    }
  }
}
```

This prevents:
- Overwriting existing wishes
- Text longer than limits (100 chars for wish, 15 for author)
- Missing required fields
- Invalid prices (only $1.99, $19.99, or $49.99 allowed)
- Invalid totalSlots count (minimum 10)

### PayPal Security:

- **Never expose** your Secret Key (only Client ID is public)
- Use HTTPS in production
- Consider adding server-side verification

---

## 💡 Optional Enhancements

### 1. Verify Payment Server-Side

For maximum security, verify payments on a backend server:
- Use PayPal IPN (Instant Payment Notification)
- Or implement PayPal Orders API v2 with server validation

### 2. Add Authentication

Require users to log in before making a wish:
- Firebase Authentication (Google, Facebook, Email)
- Prevents abuse and spam

### 3. Moderate Wishes

Add admin panel to review/approve wishes before they appear:
- Create admin Firebase rules
- Add "approved: true/false" field
- Only show approved wishes

---

## 🆘 Troubleshooting

### Firebase not connecting:

- Check browser console for errors
- Verify `firebaseConfig` is correct
- Make sure Database URL includes your project ID
- Check internet connection

### PayPal button not showing:

- Check browser console for PayPal SDK errors
- Verify Client ID is correct
- Make sure script tag is before `script.js`
- Try clearing browser cache

### Wishes not saving:

- Check Firebase Database rules
- Verify JavaScript console for errors
- Check Firebase Database "Data" tab to see if wishes are being written
- Make sure `databaseURL` in config is correct

### Payment completes but wish doesn't save:

- Check `handleSuccessfulPayment()` function
- Verify Firebase is initialized
- Check browser console for errors

---

## 📧 Support

If you need help:
1. Check browser console for errors (F12)
2. Verify all steps in this guide
3. Check Firebase and PayPal dashboards
4. Review code comments in `script.js`

---

## 🎉 You're All Set!

Your New Year's Timer with Wishes Wall is now ready to go live!

Remember to:
- Switch to **Live** PayPal Client ID before launch
- Update Firebase rules for production security
- Test on multiple devices and browsers
- Consider adding a privacy policy and terms of service

**Happy coding and Happy New Year! 🎊**
