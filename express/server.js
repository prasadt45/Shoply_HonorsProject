let express = require("express")
let mongoose = require("mongoose")
let cors = require("cors")
let bodyParser = require("body-parser")
// let dbConfig = require('./database/db')

const userRoute = require("./routes/users")
const productRoute = require("./routes/products")
const orderRoute = require('./routes/orders')

const User = require("./models/User")

// mongoose.set("useNewUrlParser", true)
// mongoose.set("useFindAndModify", false);
// mongoose.set('useCreateIndex', true)
// mongoose.set('useUnifiedTopology', true)

mongoose.Promise = global.Promise;

mongoose.connect("mongodb+srv://nikunj:mongo123@cluster0.rf2xhnp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0") 
    .then(() => {
        console.log("datbase connected")
    }, error => {
        console.log("Could not connect: " + error) 
    })

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true 
}))
app.use(cors())

app.use('/users', userRoute)
app.use('/products', productRoute)
app.use('/orders', orderRoute)


app.post('/login', async (req, res) => {
    const {email, password} = req.body 

    try{
        const user = await User.findOne({email})

        if(!user) {
            return res.json({success: false, message: "User not found"})
        }

        if(password !== user.password) {
            return res.json({success: false, message: "Invalid Credentials"})
        }

        res.json({success: true, user, message: "Authentication Successful"})
    } catch(err) {
        res.status(500).json({success: false, message: err})
    }
})

app.post('/logout', (req, res) => {
    res.json({success: true, message: "Logout successful."})
})

const port = process.env.PORT || 8000

const server = app.listen(port, () => {
    console.log('Connected to port: ' + port)
})

app.use((req, res, next) => {
    res.status(404).send("Error 404!")
})

app.use(function (err, req, res, next)  {
    console.error(err.message)

    if(!err.statusCode) {
        err.statusCode = 500
    }

    res.status(err.statusCode).send(err.message);
})