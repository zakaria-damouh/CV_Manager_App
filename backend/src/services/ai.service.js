import prisma from '../config/db.js';
import groq from '../config/groq.js';

export const reformulateService = async (description) => {

  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: 'You are a professional CV writer. Rewrite the given experience description in a professional, impactful way. Respond with JSON only.'
      },
      {
        role: 'user',
        content: `Rewrite this experience description professionally:
        "${description}"
        
        Return this exact JSON structure:
        {
          "original": "",
          "reformulated": ""
        }`
      }
    ],
    max_tokens: 500,
  });

  const raw = response.choices[0].message.content;
  const cleaned = raw.replace(/```json|```/g, '').trim();
  return JSON.parse(cleaned);
};

export const adaptService = async (userId, documentId, offreId) => {

  // 1 - get document
  const document = await prisma.document.findUnique({
    where: { id: documentId }
  });
  if (!document) throw new Error('Document not found');
  if (document.userId !== userId) throw new Error('Unauthorized');

  // 2 - get job offer
  const offre = await prisma.offre.findUnique({
    where: { id: offreId }
  });
  if (!offre) throw new Error('Job offer not found');

  // 3 - call Groq
  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: 'You are a professional CV writer. Adapt the given CV content to match the job offer. Respond with JSON only.'
      },
      {
        role: 'user',
        content: `Adapt this CV content to the job offer below.
        
        CV Content: ${document.content}
        
        Job Offer:
        Title: ${offre.title}
        Company: ${offre.company}
        Description: ${offre.description}
        
        Return this exact JSON structure:
        {
          "adaptedContent": {},
          "keyChanges": [""]
        }`
      }
    ],
    max_tokens: 2000,
  });

  const raw = response.choices[0].message.content;
  const cleaned = raw.replace(/```json|```/g, '').trim();
  return JSON.parse(cleaned);
};

export const suggestService = async (userId) => {

  // 1 - collect user data
  const [profile, experiences, formations, competences, langues] = await Promise.all([
    prisma.profile.findUnique({ where: { userId } }),
    prisma.experience.findMany({ where: { userId } }),
    prisma.formation.findMany({ where: { userId } }),
    prisma.userCompetence.findMany({
      where: { userId },
      include: { competence: true }
    }),
    prisma.langue.findMany({ where: { userId } })
  ]);

  if (!profile) throw new Error('Please create your profile first');

  // 2 - call Groq
  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: 'You are a professional career coach. Analyze the profile and give specific improvement suggestions. Respond with JSON only.'
      },
      {
        role: 'user',
        content: `Analyze this profile and give improvement suggestions:
        
        Profile: ${profile.professionalTitle} - ${profile.summary}
        Experiences: ${experiences.map(e => `${e.position} at ${e.company}`).join(', ')}
        Formations: ${formations.map(f => `${f.degree} in ${f.specialty}`).join(', ')}
        Competences: ${competences.map(c => `${c.competence.name} (${c.level})`).join(', ')}
        Languages: ${langues.map(l => `${l.name} (${l.level})`).join(', ')}
        
        Return this exact JSON structure:
        {
          "overallScore": 0,
          "strengths": [""],
          "improvements": [
            {
              "area": "",
              "suggestion": ""
            }
          ],
          "missingElements": [""]
        }`
      }
    ],
    max_tokens: 1000,
  });

  const raw = response.choices[0].message.content;
  const cleaned = raw.replace(/```json|```/g, '').trim();
  return JSON.parse(cleaned);
};