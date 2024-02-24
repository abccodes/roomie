<br/>
<p align="center">
  <h3 align="center">Roomie</h3>

  <p align="center">
    Roomie stands as the premier roommate discovery platform specifically tailored for college students. This software's entirety is housed within this open-source repository, ensuring comprehensive access to its underlying code.
    <br/>
    <br/>
    <a href="https://github.com/abccodes/roomie"><strong>Explore the docs »</strong></a>
    <br/>
    <br/>
    <a href="https://github.com/abccodes/roomie">View Demo</a>
    .
    <a href="https://github.com/abccodes/roomie/issues">Report Bug</a>
    .
    <a href="https://github.com/abccodes/roomie/issues">Request Feature</a>
  </p>
</p>

![Downloads](https://img.shields.io/github/downloads/abccodes/roomie/total) ![Contributors](https://img.shields.io/github/contributors/abccodes/roomie?color=dark-green) ![Stargazers](https://img.shields.io/github/stars/abccodes/roomie?style=social) ![Issues](https://img.shields.io/github/issues/abccodes/roomie) ![License](https://img.shields.io/github/license/abccodes/roomie) 

## Table Of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Authors](#authors)
* [Acknowledgements](#acknowledgements)

## About The Project

Roomie is a comprehensive mobile and web application, meticulously designed to streamline the roommate finding process for university students. It caters to those in search of a shared living arrangement, whether to occupy an empty room or to find a compatible roommate for an apartment. Roomie stands out by offering an intuitive platform where users can effortlessly establish profiles, detailing their living preferences, habits, and interests to ensure a match that aligns with their lifestyle.

Development Status:

Roomie is currently under active development and is considered a work in progress. The software's codebase is hosted in this open-source repository, welcoming contributions from developers who share our vision of simplifying the search for the perfect roommate. While we strive to provide a robust platform, we acknowledge that enhancements and refinements are ongoing processes. We encourage the community to contribute, whether by coding, providing feedback, or suggesting new features. Together, we aim to evolve Roomie into the ultimate solution for university students seeking harmonious living arrangements.

Development Status:

Roomie is currently under active development and is considered a work in progress. The software's codebase is hosted in this open-source repository, welcoming contributions from developers who share our vision of simplifying the search for the perfect roommate. While we strive to provide a robust platform, we acknowledge that enhancements and refinements are ongoing processes. We encourage the community to contribute, whether by coding, providing feedback, or suggesting new features. Together, we aim to evolve Roomie into the ultimate solution for university students seeking harmonious living arrangements.

Get Involved:

We invite collaborators to join us in this endeavor. Whether you're a developer, a designer, or someone with insights into the roommate-finding experience, your contributions are valuable. Check out our contribution guidelines and open issues to see how you can contribute to the development of Roomie.

Roomie is more than just an app; it's a community-driven project aimed at making the search for the perfect roommate an easier, more reliable process. Join us in shaping the future of shared living for university students.



## Built With

Roomie, the ultimate roommate finder app, is a sophisticated project that leverages a modern technology stack to provide a seamless user experience across both web and mobile platforms. This section delves into the core technologies employed in the development of Roomie, highlighting the synergy between various frameworks, libraries, and tools that power its functionality.

Web Application:

The web facet of Roomie is crafted using React, a powerful JavaScript library for building user interfaces, ensuring a dynamic and responsive experience for users. To complement React, we employ TypeScript for adding strong typing to our components, enhancing code quality and maintainability. NodeJS serves as the runtime environment, enabling a non-blocking, event-driven architecture suited for scalable network applications.

For styling, we integrate TailwindCSS along with ShadcnUI, a custom UI library that allows us to create a visually appealing and intuitive interface with ease. These technologies together facilitate a design system that is both flexible and efficient, promoting consistency across the web application.

Mobile Application:

The mobile counterpart of Roomie is developed with React Native, enabling us to maintain a single codebase for both iOS and Android platforms. This approach significantly reduces development time and ensures a uniform user experience across devices. TypeScript is again utilized to enforce typing standards, while ShadcnUI and TailwindCSS are employed to deliver a cohesive look and feel, mirroring the web application’s aesthetics and functionality.

Backend Server:

At the heart of Roomie lies a robust backend server, designed to handle requests efficiently and securely. We use MongoDB as our database of choice, coupled with Mongoose for object data modeling, which simplifies interactions with MongoDB. Express.js is chosen for its minimalistic, yet powerful set of features for web and mobile applications.

Authentication and security are paramount; thus, we implement JWT (JSON Web Tokens) for secure transmission of information between parties. TypeScript is once again a cornerstone, ensuring type safety across our backend services. NodeJS underpins our server environment, providing the scalability needed for a growing user base. To ensure our APIs are reliable and well-documented, we utilize Postman for testing and managing our endpoints.

This blend of technologies across the Roomie project reflects our commitment to leveraging the best tools available for building a high-quality, scalable, and secure platform for university students worldwide to find their ideal roommates.







## Getting Started

This guide provides a step-by-step approach to setting up and running the backend server for Roomie, the roommate finder app. The server is built using Express with TypeScript, MongoDB for data storage, NodeJS as the runtime environment, Postman for API testing, and JWT for authentication. Follow these instructions to get your backend server up and running.

### Prerequisites

Prerequisites:

Before you begin, ensure you have the following installed on your system:

NodeJS (LTS version recommended)
MongoDB (You can use a local MongoDB server or a MongoDB Atlas cloud database)
Postman (For testing the API endpoints)
A code editor of your choice (e.g., VSCode)

### Installation

Step 1: Clone the Repository:
Start by cloning the repository to your local machine. Use the Git command below:

~~
git clone https://github.com/abccodes/roomie.git
~~

Step 2: Install Dependencies
Navigate to the project directory and install the necessary NodeJS packages using npm:

~~
cd server
npm install
~~

Step 3: Set Up Environment Variables
Create a .env file in the root directory of your project. This file should contain environment-specific variables such as your MongoDB URI, JWT secret key, and any other sensitive information. Here's an example of what your .env file should look like:

~~
MONGODB_URI=mongodb://localhost:27017/roomiedb
JWT_SECRET=your_jwt_secret
~~

Step 5: Compile TypeScript to JavaScript
Since the backend is written in TypeScript, you'll need to compile the TypeScript code to JavaScript before running the server. You can typically do this by running:

~~
npm run build
~~

Step 6: Start the Server
With your environment variables set, you can now start the Express and MongoDB servers with:

~~
npm run start
~~

Step 7: Test Endpoints Using Postman
With your server running, you can now test your API endpoints using Postman. Import your API collection or manually set up requests to test the various endpoints. Ensure to include appropriate JWT tokens in your requests for protected routes.

Step 8: Development
As you develop, you may make changes to your TypeScript files. Remember to recompile your project (Step 5) and restart your server (Step 6) to reflect any changes. 

Congratulations! You've successfully set up and started the Roomie backend server. Continue developing and testing your endpoints as needed to build out the functionality of the Roomie app.

## Roadmap

See the [open issues](https://github.com/abccodes/roomie/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
* If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/abccodes/roomie/issues/new) to discuss it, or directly create a pull request after you edit the *README.md* file with necessary changes.
* Please make sure you check your spelling and grammar.
* Create individual PR for each suggestion.
* Please also read through the [Code Of Conduct](https://github.com/abccodes/roomie/blob/main/CODE_OF_CONDUCT.md) before posting your first idea as well.

### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request to dev branch

## License

Distributed under the MIT License. See [LICENSE](https://github.com/abccodes/roomie/blob/main/LICENSE.md) for more information.

## Authors

* **abccodes** - *Computer Science Student* - [abccodes](https://github.com/abccodes/) - *Founder of Roomie*
