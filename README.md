[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/Sergio-D-Vico-Pineda/SpeedyCardv2)

# SpeedyCard

SpeedyCard is a modern digital business card application built with React Native and Expo. Create, customize, share, and manage your digital business cards with ease.

![6c6b0ad7-daa7-424c-845d-206a8a4436c2](https://github.com/user-attachments/assets/73e82b46-bc90-4d6e-b556-16504b1fef92)

## Features

| Feature | Description |
|---------|-------------|
| Create Custom Business Cards | Design personalized digital business cards with various styles, fonts, and colors |
| Card Templates | Choose from multiple pre-designed templates or create your own |
| QR Code Sharing | Share your business cards instantly via QR codes |
| Card Management | Create and manage multiple business cards for different purposes |
| Save Others' Cards | Scan and save business cards from other users |
| Marketplace | Browse and purchase premium card templates |

## Getting Started

### Prerequisites

| Prerequisite | Description |
|--------------|-------------|
| Node.js | LTS version recommended |
| npm or yarn | Package managers |
| Expo CLI | Command line interface for Expo |
| Android Studio | For Android development |
| Xcode | For iOS development, macOS only |
| Git | Version control system |

### Installation

1. Clone the repository

```bash
git clone https://github.com/Sergio-D-Vico-Pineda/SpeedyCardv2.git
cd SpeedyCardv2
```

2. Install dependencies

```bash
npm install
```

3. Set up Firebase configuration

- Create a Firebase project in the Firebase Console
- Enable Authentication, Firestore, and Storage services
- Create a `firebase.js` file in the project root with your Firebase configuration

4. Start the development server

```bash
npm start
```

## Development

### Available Scripts

| Script | Description |
|--------|-------------|
| npm start | Start the Expo development server |
| npm run android | Run on Android device/emulator |
| npm run ios | Run on iOS device/simulator (macOS only) |
| npm run web | Start web version |
| npm test | Run tests |
| npm run lint | Run linter |
| npm run reset-project | Reset the project to a clean state |

## Project Structure

```
SpeedyCardv2/
├── app/                  # Main application code
│   ├── (public)/         # Public routes
│   ├── (tabs)/           # Tab-based navigation
│   └── index.tsx         # Entry point
├── assets/               # Static assets
│   ├── fonts/            # Custom fonts
│   └── images/           # Images and icons
├── components/           # Reusable components
│   └── business-card/    # Business card components
├── contexts/             # React contexts
├── hooks/                # Custom React hooks
├── modals/               # Modal components
└── firebase.js          # Firebase configuration (not in repo)
```

## Technology Stack

| Category | Technology |
|----------|------------|
| Framework | React Native with Expo |
| Language | TypeScript |
| State Management | React Context API |
| Navigation | Expo Router |
| Backend | Firebase (Authentication, Firestore, Storage) |
| UI Components | React Native components with custom styling |
| Business Card Features | QR code generation, image picking, camera integration |

## Key Components

### Business Card Preview

The `BusinessCardPreview` component is the central element for displaying digital business cards. It supports:

- Multiple card styles (minimalist, modern, default)
- Custom fonts, colors, and layouts
- Card flipping animation to show front and back sides
- Profile images and logos

### Firebase Integration

SpeedyCard uses Firebase for:

- User authentication
- Storing and retrieving business card data
- Saving and sharing cards between users
- Marketplace transactions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Expo for the amazing React Native development platform
- Firebase for backend services
- All contributors who have helped shape this project
