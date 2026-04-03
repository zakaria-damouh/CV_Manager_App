import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({origin: process.env.CLIENT_ID}));
app.use(express.json());

const PORT = process.env.PROT || 5000;

app.listen(PORT , () => {
     console.log(`Server running on port ${PORT}`);
})


export default app;