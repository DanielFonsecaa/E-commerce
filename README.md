<br/>
<div align="center">
<img src="https://github.com/user-attachments/assets/9b53da4b-cd74-4a0f-8df5-55e2f4960f8a" alt="Logo" width=300>

<h3 align="center">E-Commerce By Daniel</h3>
<p align="center">
Enhancing Your Mobile Experience, One Accessory at a Time.


  


</p>
</div>

# About The Project
![Screenshot from 2024-11-20 12-28-12](https://github.com/user-attachments/assets/7d2cfbd7-8600-4583-8661-8455318ac4fd)
![Screenshot from 2024-11-20 12-28-00](https://github.com/user-attachments/assets/7e1797f2-f60a-4c7f-85a2-82ba56dab272)
![Screenshot from 2024-11-20 12-27-55](https://github.com/user-attachments/assets/0a016aab-f3ba-40e2-8ae6-796462ecfc59)
![Screenshot from 2024-11-20 12-26-34](https://github.com/user-attachments/assets/2f8125c3-67a5-41b4-8e52-54abf112cd40)
![Screenshot from 2024-11-20 12-26-27](https://github.com/user-attachments/assets/726ef217-61e6-4429-a7b0-de29351aa804)
![Screenshot from 2024-11-19 23-30-22](https://github.com/user-attachments/assets/a6666eb5-502f-405a-9cc9-45aa2ace8b23)


This project is a full-stack web application designed to provide a seamless browsing and shopping experience for mobile accessories. It features a dynamic front-end for users to explore products and a robust back-end for managing inventory. 
The application allows customers to browse, and add products to their cart while administrators can manage the product catalog effectively.

-- *Features*

If you need to see the endpoints of my backend using Swagger you can the documentation for it

[http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)

Product Catalog Management:
Administrators can add, edit, and delete products, ensuring an accurate and up-to-date inventory of mobile accessories.

Search and Filtering:
Users can quickly search for specific accessories and filter products by categories such as brand, type, or price.

Responsive Design:
The application is fully responsive, providing a smooth and consistent user experience across all devices and screen sizes.

Dynamic Cart Management:
Customers can add products to their cart and view updates in real-time as they shop.

RESTful API Integration:
The front-end communicates with the back-end via a RESTful API for smooth data synchronization and scalability.

## 🛠️ Built With

#### Back-End

Node.js: Core runtime environment for server-side JavaScript execution.

Express: Framework for building the RESTful API that powers the application.

Swagger: Used for API documentation and testing, ensuring clarity and maintainability.

MongoDB: NoSQL database for efficient and scalable data storage.

Mongoose: ODM (Object Data Modeling) library for MongoDB, simplifying schema definition and data validation.

Crypto.js: Implements cryptographic functions for hashing and securing sensitive data.

JWT: Used for user authentication and secure session management.




#### Front-End

   Vite: Fast development build tool to bundle and serve the application.
   
   React.js: Front-end library for building dynamic and reusable UI components.
   
   JWT Decode: Decodes JSON Web Tokens to manage user sessions on the client-side.
   
   Tailwind CSS: Utility-first CSS framework for responsive and modern designs.
   
   HTML: Defines the structure of web pages.
   
   CSS: Styles and layouts web pages


## ✔️ Prerequisites

To run this project locally, ensure you have the following tools installed and properly configured:

-- *Back-End Prerequisites*

Node.js (version 14 or higher):
Check the installation by running:
```
node -v  
```
npm (Node Package Manager, included with Node.js):
Verify installation with:
```
npm -v  
```
MongoDB:
Ensure MongoDB is installed and running. You can check the service status with:
```
sudo systemctl status mongod  
```
Or verify the version with:
```
mongod --version
``` 


-- *Front-End Prerequisites*

Vite (for local development):
Installed as a dependency in the project. To ensure it's working, you'll need Node.js and npm.

Modern Browser:
Any modern browser (e.g., Chrome, Firefox, Edge) to test the application on the client side.

-- *Optional Tools*

Postman or Swagger UI:

Useful for testing API endpoints during development.

After ensuring these prerequisites, you can proceed to set up the project by following the installation and setup instructions.


## 🗺️ Roadmap

### Done
 - [x] Setup Environment Backend

 - [x] Install Node.js, Express, MongoDB

 - [x] Create Database Schema with Mongoose

 - [x] Implement Authentication (JWT, Crypto.js)

 - [x] Develop REST APIs for Products, Cart, Orders and Users

 - [x] Implement API Security (JWT Authentication)

 - [x] Swagger Documentation for APIs

 - [x] Setup Environment Frontend

 - [x] Install Vite, React, Tailwind CSS

 - [x] Develop Home Page and Product Listings

 - [x] Develop Product Detail Page

 - [x] Implement JWT Authentication on Frontend

 - [x] Implement User Profile

 - [x] Responsive Design for Mobile and Desktop

### To do
 - [ ] Bug Fixes and Refinements

 - [ ] Implement Cart and Checkout System
   
 - [ ] Integrate Payment Gateway (future feature)
 
 - [ ] Implement Search Functionality (Filter by Category, Price, etc.)
 
 - [ ] Setup Deployment Environment (Docker, Nginx, etc.)

 - [ ] Parameterized Routes (Product and Category Pages)

 - [ ] Production Launch

 - [ ] Feature Enhancements (Recommendations, Reviews, etc.)

 - [ ] Payment Integration (Stripe, PayPal, etc.)

 - [ ] SEO Optimization and Analytics Setup
