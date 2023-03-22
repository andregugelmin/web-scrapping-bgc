# <p align = "center"> web-scrapping-bgc </p>
<p align="center">
   <img src="https://blog.bgcbrasil.com.br/wp-content/uploads/2022/11/Logo-BGC-vetor-black.png" width="220"/>
</p>

##  :clipboard: Description

Serverless Project that uses Puppeteer as a web scraper to return the three bestseller products of any category from https://www.amazon.com.br/bestsellers



## :computer: Technologies

- Serverless Framework
- Node.js
- Puppeteer
- AWS Lambda
- AWS API Gateway
- AWS DynamoDB
- AWS Step Functions


## :warning: Requirements
 - AWS IAM Role
 - [Serverless Framework](https://www.serverless.com/framework/docs/getting-started) installed
 - [AWS Credentials](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/#:~:text=Login%20to%20your%20AWS%20account,access%20by%20clicking%20the%20checkbox.) configured
 - [Node.js](https://nodejs.org/en/download/)

## Setup

Clone this repository:

```
git clone https://github.com/andregugelmin/web-scrapping-bgc
```

Go to project directory:
```
cd web-scrapping-bgc
```
Install dependencies:

```
npm install
```

Deploy:

```
serverless deploy
```

When the process is done, you will receive all links to your Lambda functions 

## Routes

#### Route for webscraping:

```yml

GET /webscrap/{category}
  - This uses an http method to run Puppeteer and returns three products of the choosen category (ex: kitchen, home, beauty...)
  
```

#### AWS Step Functions and DynamoDB:

For this, you will need to run the `AmazonWebScraping` Step Function in your AWS Console, when starting execution, configure your input:

```yml

{
    "category": "{category}"
}

```
The {category} can be any category you find in [amazon bestsellers](https://www.amazon.com.br/bestsellers). Example:

```yml

{
    "category": "home"
}

```
With this your step function will run Puppeteer for web scrapping and storage the itens in your database.
Then, you can use the following routes to access your DynamoDB:

```yml

GET /products
  - This will return all itens of your database
  
GET /products/{category}
  - This will return all itens of the choosen category of your database
  
```

