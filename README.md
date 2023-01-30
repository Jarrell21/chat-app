# chat-app

### Real-time chat app built with :
- ReactJS
- Chakra UI
- NodeJS
- ExpressJS
- MongoDB
- Mongoose
- Socket.io

## How to run

Clone the project

```bash
  git clone https://github.com/Jarrell21/chat-app.git
```

Go to the project directory

```bash
  cd chat-app
```

Create a .env file inside the root directory and paste this inside

```javascript
PORT = 5000
MONGO_URI = <your mongo URI>
JWT_SECRET = jarrell
```


To get your Mongo URI; 
- Log in to your [MongoDB](https://account.mongodb.com/account/login) account 
- Under deployment tab, select 'Database'
- Click 'Connect' on an empty cluster
- Click 'Connect your application'

Your URI will look something like this:

```javascript
mongodb+srv://example:<your password here>@cluster0.example.mongodb.net/?retryWrites=true&w=majority
```
Install dependencies

```bash
  npm install
```

```bash
  cd client/
  npm install --legacy-peer-deps
```

Start the server

```bash
  npm run start
```
Start the Client

```bash
  //open new terminal
  cd frontend
  npm start
```

