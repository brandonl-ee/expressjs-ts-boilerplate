<!-- Template -->
<!-- reference: https://blog.stackademic.com/create-a-backend-application-using-express-typescript-and-handle-authentication-1f67be81da60 -->


<!-- Formatting -->
<!-- https://leandroaps.medium.com/setting-up-eslint-prettier-and-husky-in-a-typescript-based-react-18-project-a-comprehensive-8a87b91d5a28 -->


# ExpressJS TypeScript Boilerplate

Welcome to the ExpressJS TypeScript Boilerplate project! This boilerplate provides a solid foundation for building a scalable, maintainable, and well-structured web application using ExpressJS, TypeScript, and Mongoose. It includes a predefined project structure, essential configurations, and common functionalities to kickstart your development process.

## Table of Contents

- [ExpressJS TypeScript Boilerplate](#expressjs-typescript-boilerplate)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Project Structure](#project-structure)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [Scripts](#scripts)
  - [Contributing](#contributing)
    - [Branch Naming Conventions](#branch-naming-conventions)
  - [License](#license)

## Features

- **TypeScript**: Strongly typed JavaScript for enhanced code quality and developer productivity.
- **ExpressJS**: Fast, unopinionated, minimalist web framework for Node.js.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **Controllers & Services**: Organized file structure for better code management and separation of concerns.
- **Global Error Handling**: Consistent and centralized error handling.
- **Utility Functions**: Commonly used utilities and helper functions.
- **Environment Configuration**: Easy management of environment-specific settings.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (>= 18.x)
- npm or yarn
- MongoDB

## Installation

1. Clone the repository:
```bash 
git clone https://github.com/brandonl-ee/expressjs-ts-boilerplate.git
cd expressjs-ts-boilerplate
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

1. Set up environment variables:
    - Rename `.env.example` to `.env` and update the variables accordingly.

## Project Structure

```text
├── src
│   ├── constants
│   │   └── auth.ts
│   │   └── config.ts
│   │   └── httpStatusCode.ts
│   ├── exceptions
│   │   └── auth.exception.ts
│   │   └── custom.exception.ts
│   ├── controllers
│   │   └── user.controller.ts
│   ├── services
│   │   └── user.service.ts
│   ├── interfaces
│   │   └── user.interface.ts
│   ├── repositories
│   │   └── user.repository.ts
│   ├── models
│   │   └── user.model.ts
│   ├── routes
│   │   └── user.route.ts
│   ├── utils
│   │   └── auth.ts
│   ├── middlewares
│   │   └── error.middleware.ts
│   ├── index.ts
├── .env.example
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── Dockerfile
├── package.json
├── README.md
└── tsconfig.json

```

## Configuration
Update the .env file in the root directory with your configuration settings.


```text
PORT=3000
MONGO_URI=mongodb://localhost:27017/your-database
JWT_SECRET=your-secret-key
```

## Usage
Start the development server:
```bash
npm run dev
# or
yarn dev

```
The server will start on the port specified in the .env file. By default, it runs on http://localhost:3000.

## Scripts
- npm run dev / yarn dev: Start the development server with hot-reloading.
- npm run build / yarn build: Compile TypeScript to JavaScript.
- npm start / yarn start: Start the production server.
- npm run lint / yarn lint: Run ESLint to lint the codebase.


## Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: git checkout -b feature/your-feature-name.
3. Make your changes.
4. Commit your changes: git commit -m 'Add some feature'.
5. Push to the branch: git push origin feature/your-feature-name.
6. Open a pull request.

### Branch Naming Conventions
In managing your repository, adopting clear branch naming conventions can significantly enhance organization and communication among contributors. Here's a brief overview of common conventions:

- Feature Branches: feature/short-description for developing new functionalities.
- Bugfix Branches: bugfix/short-description for resolving identified issues.
- Hotfix Branches: hotfix/short-description for critical bugs within the production environment.
- Release Branches: release/x.x.x for preparing new production-ready versions.
- Experimental Branches: experiment/short-description for testing new features.
- Documentation Branches: docs/short-description for updates to documentation.
- Chore Branches: chore/short-description for routine tasks.
- Test Branches: test/short-description for testing purposes.
- Task Branches: task/short-description for non-feature tasks like setting up CI/CD  pipelines.
- Consistent adherence to these conventions promotes clarity and efficiency in collaborative development efforts.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

