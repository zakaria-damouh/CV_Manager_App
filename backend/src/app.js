import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import profileRoutes from './routes/profile.routes.js';
import experienceRoutes from './routes/experience.routes.js';
import formationRoutes from './routes/formation.routes.js';
import competenceRoutes from './routes/competence.routes.js';
import langueRoutes from './routes/langue.routes.js';
import offreRoutes from './routes/offer.routes.js';
import documentRoutes from './routes/document.routes.js';
import aiRoutes from './routes/ai.routes.js';
import userCompetenceRoutes from './routes/userCompetence.routes.js';
import experienceCompetenceRouter from './routes/experienceCompetence.routes.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({origin: process.env.CLIENT_URL}));
app.use(express.json());

app.use('/api/auth/' , authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/formations', formationRoutes);
app.use('/api/competences', competenceRoutes);
app.use('/api/langues', langueRoutes);
app.use('/api/offres', offreRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/ai', aiRoutes);

app.use('/api/user-competences', userCompetenceRoutes);
app.use('/api/experiences/:experienceId/competences', experienceCompetenceRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => {
     console.log(`Server running on port ${PORT}`);
})


export default app;