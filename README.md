# TribeLink-frontend



This is a **React Native** mobile application for booking services, where users can select categories, view service providers, book time slots, and manage their bookings through a cart system. The app features an intuitive navigation flow and provides a user-friendly experience with clean UI components.

## Features

- Browse categories and subcategories of services.
- View a list of service providers and their available time slots.
- Add services to the cart, manage the cart, and view pricing with GST and additional charges.
- Modern UI with back button navigation and interactive components.

## Screens

1. **Login Screen** - Allows user login.
2. **Home Screen** - Displays available categories.
3. **SubCategory Screen** - Shows subcategories based on selected categories.
4. **ServiceList Screen** - Lists services based on selected subcategory.
5. **ProviderList Screen** - Displays service providers for a specific service.
6. **ServiceDetail Screen** - Shows the details of a selected service and provider with time slot booking.
7. **Cart Screen** - Displays added services, total amount with GST, and option to remove items.

## Installation

Follow these steps to install and run the project locally.

### Prerequisites

- **Node.js** (v14 or higher)
- **React Native CLI** or **Expo CLI** (if using Expo)
- **Android Studio** (for Android development) or **Xcode** (for iOS development)
- **Git** (for version control)

### Clone the Repository


git clone https://github.com/pandasuvm/TribeLink-frontend.git
cd TribeLink-frontend
Install Dependencies


npm install
or if using yarn:

yarn install
Link Native Dependencies (for React Native CLI only)
If you're using the React Native CLI, link native modules by running:


npx react-native link
Set up Android/iOS Environment
For Android:
Ensure that Android Studio is installed, and Android SDK paths are set in your environment variables.

Run an emulator or connect an Android device.

Start the Metro bundler:


npx react-native start
In another terminal window, run:


npx react-native run-android
For iOS:
Make sure Xcode is installed on your Mac.

Install required iOS dependencies:


cd ios
pod install
cd ..
Start the Metro bundler:


npx react-native start
Build and run the app:


npx react-native run-ios
For physical iOS device testing, you'll need to have the proper signing certificates and provisioning profiles set up in Xcode.

Using Expo (Optional)
If you prefer using Expo for easier development:

Install Expo CLI globally:


npm install -g expo-cli
Initialize the project with Expo:


expo init service-booking-app
Start the development server:


expo start
You can scan the QR code with the Expo Go app on your device to run the app instantly.

Building the App
Build for Android
In your terminal, run:


npx react-native run-android
For generating a signed APK for production, follow these steps:

Generate a signing key using keytool.
Configure android/app/build.gradle with the release key information.
Build the APK using the following command:

cd android
./gradlew assembleRelease
The signed APK will be located in android/app/build/outputs/apk/release/.

Build for iOS
Ensure your environment is set up with Xcode and CocoaPods.

To run on a real device or emulator:


npx react-native run-ios
To build the app for production:

Open the Xcode project by navigating to ios/ and double-clicking the .xcworkspace file.
Set up signing and capabilities.
Archive the app using Xcode for distribution to the App Store or TestFlight.
Folder Structure

src/
├── components/
│   ├── BackButton.tsx        # Back button component
│   ├── TimeSlotPicker.tsx    # Time slot selection component
├── context/
│   ├── CartContext.tsx       # Cart context for managing cart state
├── screens/
│   ├── LoginScreen.tsx
│   ├── HomeScreen.tsx
│   ├── SubCategoryScreen.tsx
│   ├── ServiceListScreen.tsx
│   ├── ProviderListScreen.tsx
│   ├── ServiceDetailScreen.tsx
│   ├── CartScreen.tsx        # Cart management screen
└── navigation/
    ├── AppNavigator.tsx      # Main navigation structure
Cart Management
The app includes a cart system to allow users to add services with specific providers and time slots. The cart context manages the following:

Add to Cart: Adds selected services, providers, and time slots to the cart.
Remove from Cart: Allows users to remove individual items from the cart.
Total Calculation: Shows subtotal, additional charges, and GST in the cart.
Contributing
Feel free to submit pull requests or open issues to suggest new features, improve code quality, or report bugs.

Fork the repository.
Create your feature branch: git checkout -b feature/YourFeature.
Commit your changes: git commit -m 'Add some feature'.
Push to the branch: git push origin feature/YourFeature.
Open a pull request.
License
This project is licensed under the MIT License.

yaml


---







