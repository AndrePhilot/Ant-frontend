# Nutjobs

## Overview

[Nutjobs](http://nutjobs-frontend.s3-website.us-east-2.amazonaws.com/) is a web application that allows users to view and interact with company and job listings. This is its frontend repo. Please, visit [the backend repo](https://github.com/AndrePhilot/Ant-backend) for a full experience.

## Technologies Used

- **Frontend**: React.js
- **State Management**: React Context API
- **Routing**: React Router
- **Backend**: Node.js with Express
- **Database**: AWS RDS (PostgreSQL)
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Bootswatch, Google Fonts, FontAwesome
- **3D Elements**: Spline API
- **Testing**: Jest

## Component Hierarchy

The React component hierarchy is structured as follows:

- **BrowserRouter**: Wraps the entire application to handle routing.
  - **AuthProvider**: Provides the authentication context to manage user state.
    - **App**: The root component that includes all other components and handles the main routing logic.
      - **NavBar**: A navigation bar component, usually visible on all pages.
      - **Home**: The home page of the application.
      - **CompanyList**: Displays a list of companies.
      - **CompanyDetail**: Shows detailed information about a specific company.
      - **JobsList**: Displays a list of job postings.
      - **LoginForm**: A form component for user login.
      - **Signup**: A form component for user registration.
      - **Profile**: Displays the user’s profile information.
        - **Searchbar**: A search bar component used in both CompanyList and JobsList for filtering.
        - **JobCard**: A card component displaying job details.
        - **LoadingOnSubmission**: A loading spinner or message displayed while data is being submitted or fetched.

### Global State Management

The current user state is managed by the `AuthProvider` component, which uses the `AuthContext` to share authentication data throughout the application. The `AuthProvider` initializes the authentication state from localStorage or with default values and uses `useState` to manage state changes, persisting them to localStorage with `useEffect`.

## Getting Started

To get a copy of the project up and running on your local machine, follow these steps:

### Prerequisites

- Node.js and npm installed
- An AWS RDS instance with MySQL database

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>

2. Install dependencies:
   npm install

### Running the Application
To start the application, run:
    npm start
This will start the development server, and you can access the application at `http://localhost:3000`.

### Running Tests
To run the tests, use:
    npm test
This will execute the test suite using Jest and output the results to the console.

### Contributing
Feel free to fork the repository and submit pull requests.

### About the Developer
Hi, I'm [Andre Philot](https://andrephilot.github.io/portfolio/), an international teacher and developer.