# Next.js Firebase Prisma MongoDB Project

A modern web application built with Next.js, Firebase Authentication, Prisma ORM, and MongoDB.

## Features

- **Next.js**: React framework with SSR and API routes
- **Firebase Authentication**: Secure user authentication system
- **Prisma ORM**: Type-safe database client
- **MongoDB**: NoSQL database for flexible data storage

## Prerequisites

Before you begin, ensure you have the following installed:

### Node.js Installation

#### Windows (using fnm)
```bash
# Download and install fnm:
winget install Schniz.fnm

# Download and install Node.js:
fnm install 22

# Verify the Node.js version:
node -v # Should print "v22.14.0"

# Verify npm version:
npm -v # Should print "10.9.2"
```

#### macOS (using Homebrew and fnm)
```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install fnm
brew install fnm

# Add fnm to your path (add to your shell profile)
echo 'eval "$(fnm env --use-on-cd)"' >> ~/.zshrc
# or for bash
# echo 'eval "$(fnm env --use-on-cd)"' >> ~/.bashrc

# Source your profile
source ~/.zshrc # or ~/.bashrc

# Install Node.js
fnm install 22

# Verify installation
node -v
npm -v
```

#### Linux (Ubuntu/Debian)
```bash
# Install fnm dependencies
sudo apt-get update
sudo apt-get install -y curl unzip

# Install fnm
curl -fsSL https://fnm.vercel.app/install | bash

# Add fnm to your path (add to your shell profile)
echo 'export PATH="$HOME/.fnm:$PATH"' >> ~/.bashrc
echo 'eval "$(fnm env --use-on-cd)"' >> ~/.bashrc

# Source your profile
source ~/.bashrc

# Install Node.js
fnm install 22

# Verify installation
node -v
npm -v
```

### MongoDB Setup

#### Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Click "Register" and fill in your details to create an account
3. Verify your email address

#### Create a MongoDB Cluster
1. Log in to MongoDB Atlas
2. Click "Build a Cluster" (Free tier is sufficient for development)
3. Choose your preferred cloud provider and region (AWS, GCP, or Azure)
4. Select "M0 Free Tier" cluster
5. Name your cluster (e.g., "nextjs-project")
6. Click "Create Cluster" (creation may take a few minutes)

#### Set Up Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username and password (save these for your `.env.local` file)
4. Set privileges to "Read and Write to Any Database"
5. Click "Add User"

#### Set Up Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development, you can allow access from anywhere (0.0.0.0/0)
4. Click "Confirm"

#### Get Your Connection String
1. Go to "Clusters" and click "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<username>`, `<password>`, and `<dbname>` with your details when adding to your `.env.local` file

#### Install MongoDB Compass (Optional but recommended)

##### Windows
1. Go to [MongoDB Compass download page](https://www.mongodb.com/try/download/compass)
2. Download the Windows version (.exe)
3. Run the installer and follow the installation wizard
4. Launch MongoDB Compass

##### macOS
```bash
# Using Homebrew
brew install --cask mongodb-compass
```
Or download the .dmg file from the [MongoDB Compass download page](https://www.mongodb.com/try/download/compass)

##### Linux (Ubuntu/Debian)
```bash
# Download the .deb package
wget https://downloads.mongodb.com/compass/mongodb-compass_1.30.1_amd64.deb

# Install the package
sudo dpkg -i mongodb-compass_1.30.1_amd64.deb

# If there are dependency issues
sudo apt-get install -f
```

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or add to an existing project
3. Enter a project name (e.g., "nextjs-auth-project")
4. Enable/disable Google Analytics as desired
5. Click "Create project"

#### Set Up Authentication
1. In the Firebase console, go to "Authentication" from the left sidebar
2. Click "Get started"
3. Enable the "Email/Password" provider by clicking on it and toggling the "Enable" switch
4. To add Google authentication, click on the "Google" provider and enable it
5. For Google auth, add your project's support email
6. Click "Save"

#### Add a Web App to Your Firebase Project
1. In your Firebase project dashboard, click the web icon (</>) 
2. Register your app with a nickname (e.g., "nextjs-web")
3. Check "Also set up Firebase Hosting" if desired
4. Click "Register app"
5. Copy the Firebase configuration object (you'll need this for your `.env.local` file)
6. Click "Continue to console"

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:mohdomi/admin-user-dashboard-nextjs-proj.git
   # or
   git clone https://github.com/mohdomi/admin-user-dashboard-nextjs-proj.git

   cd admin-user-dashboard-nextjs-proj
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

   # MongoDB Configuration
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority"
   # or for local MongoDB
   # DATABASE_URL="mongodb://localhost:27017/dbname"
   ```

4. Set up Prisma:
   ```bash
   npx prisma generate
   ```

5. Migrate the database:
   ```bash
   npx prisma db push
   ```

6. (Optional) Seed the database:
   ```bash
   npx prisma db seed
   ```

## Running the Project

### Development Mode

```bash
npm run dev
# or
yarn dev
```

This will start the development server on [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Authentication Flow

1. Users can sign up/login using email/password or social providers (Google)
2. Upon successful authentication, user data is stored in both Firebase and MongoDB
3. JWT tokens are used for session management
4. Protected routes verify authentication status before allowing access


## Deployment

1. Configure your environment variables on your hosting platform
2. Build and deploy your application:

   ```bash
   npm run build
   # or
   yarn build
   ```

3. Deploy to your preferred hosting platform:
   - Vercel: `vercel --prod`
   - Netlify: `netlify deploy --prod`
   - Custom server: Transfer the `.next` build output to your server

   **OR**

   **Deploy to Vercel via GitHub:**
   1. Create a GitHub repository
   2. Push your project to the GitHub repository:
      ```bash
      git init
      git add .
      git commit -m "Initial commit"
      git branch -M main
      git remote add origin https://github.com/yourusername/your-repo-name.git
      git push -u origin main
      ```
   3. Go to [Vercel](https://vercel.com/) and sign in/sign up
   4. Click "Import Project" and select "Import Git Repository"
   5. Select your GitHub repository
   6. Configure your project settings and environment variables
   7. Click "Deploy"


## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.