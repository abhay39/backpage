import express from 'express';
import cors from 'cors';
import multer from 'multer';
import axios from 'axios';
import dotenv from 'dotenv';


const app = express();
const port = 5000;
dotenv.config();

app.use(express.json());
app.use(cors());

// Multer configuration to handle form data
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.get("/",(req,res)=>{
    res.send("Backpage running!!")
})

// Define a route to handle the form data
app.post('/checkResult', upload.single('symbol_number'), async(req, res) => {
    try {
        // Access the form data from the request
        const symbolNumber = req.body.symbol_number;
        const newdata=new FormData()
        newdata.append('symbol_number',symbolNumber)
        
        let result=await axios.post("https://onlinenameregistration.nepalpharmacycouncil.org.np/result,newdata")
        // console.log(result.data);
        res.status(200).json(result.data);

    } catch (error) {
        console.error(error);

        // Respond with an error status
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
