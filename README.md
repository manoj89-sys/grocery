# Grocery API
Accompanying repository for grocery auth with JWTs and node

STEPS

1) Download zip folder in your computer then run commnad
  npm install

2) Install mongoDB in your computer


API Routes

1) Url : http://localhost:3000/api/v1/users/register  - POST

   Request body
   
   name,password,email,gender,phonenumber,role
   
   Register one user as admin
  
2) Url : http://localhost:3000/api/v1/login  -  POST

   Request body
   
   name,password
   
   
3) Url : http://localhost:3000/api/v1/products - POST

   This route access only admin
   
   Login with admin and get token
   
   Request body
   
   Header : Authorization : Bearer [ADMIN TOKEN HERE]
   
   Enter product data in csv file. csv file located in csv folder
   
   
4) Url : http://localhost:3000/api/v1/products/review   -  POST

   This route access only client
   
   Login with client and get token
   
   Request body
   
   Header : Authorization : Bearer [CLIENT TOKEN HERE]
   
   userId,barcode,review_content
   

5) Url : http://localhost:3000/api/v1/products/search - POST

   Request body
   
   searchText : Product name
   
