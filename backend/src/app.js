import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import profileRoutes from './routes/profile.routes.js';
import experienceRoutes from './routes/experience.routes.js';
import formationRoutes from './routes/formation.routes.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({origin: process.env.CLIENT_ID}));
app.use(express.json());

app.use('/api/auth/' , authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/formation', formationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => {
     console.log(`Server running on port ${PORT}`);
})


export default app;