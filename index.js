const app = require('./src/app');
const dotenv = require('dotenv');

dotenv.config();

console.log(process.env.PORT);
console.log(process.env.DATABASE_URL)
const PORT = process.env.PORT || 5001;

app.get('/',(req,res)=>{
    res.send("Welcome to zuvees")
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
