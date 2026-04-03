import express from 'express';

const app = express();

const PORT = process.env.PROT || 5000;

app.listen(PORT , () => {
     console.log(`Server running on port ${PORT}`);
})


export default app;