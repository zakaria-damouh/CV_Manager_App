import prisma from '../config/db.js';
import groq from '../config/groq.js';
import openai from '../config/openai.js';

// helper function to collect all user data from DB
const collectUserData = async (userId) => {
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

  return { profile, experiences, formations, competences, langues };
};

// helper function to build the prompt based on document type
// const buildPrompt = (type, userData, jobOffer = null) => {
//   const { profile, experiences, formations, competences, langues } = userData;

//   const baseInfo = `
//     Profile: ${profile?.professionalTitle} - ${profile?.summary}
//     Contact: ${profile?.contact}
//     External Links: ${profile?.externalLinks}

//     Experiences:
//     ${experiences.map(e => `- ${e.position} at ${e.company} (${e.startDate} - ${e.endDate}): ${e.description}`).join('\n')}

//     Formations:
//     ${formations.map(f => `- ${f.degree} in ${f.specialty} at ${f.institution} (${f.startDate} - ${f.endDate})`).join('\n')}

//     Competences:
//     ${competences.map(c => `- ${c.competence.name} (${c.level})`).join('\n')}

//     Languages:
//     ${langues.map(l => `- ${l.name} (${l.level})`).join('\n')}
//   `;

//   const prompts = {
//     // CV: `Generate a professional CV in markdown format based on this profile:\n${baseInfo}`,
//     CV: `Generate a professional CV in markdown format based on this profile. Do not add any notes, disclaimers, or comments at the end:\n${baseInfo}`,
    
//     cover_letter: `Generate a professional cover letter in markdown format based on this profile:\n${baseInfo}
//     ${jobOffer ? `\nJob Offer:\nTitle: ${jobOffer.title}\nCompany: ${jobOffer.company}\nDescription: ${jobOffer.description}` : ''}`,
    
//     profile_summary: `Generate a short professional profile summary (max 150 words) based on this profile:\n${baseInfo}`,
    
//     application_email: `Generate a professional job application email based on this profile:\n${baseInfo}
//     ${jobOffer ? `\nJob Offer:\nTitle: ${jobOffer.title}\nCompany: ${jobOffer.company}\nDescription: ${jobOffer.description}` : ''}`
//   };

//   return prompts[type];
// };


const buildPrompt = (type, userData, jobOffer = null) => {
  const { profile, experiences, formations, competences, langues } = userData;

  const baseInfo = `
    Profile: ${profile?.professionalTitle} - ${profile?.summary}
    Contact: ${profile?.contact}
    External Links: ${profile?.externalLinks}

    Experiences:
    ${experiences.map(e => `- ${e.position} at ${e.company} (${e.startDate} - ${e.endDate}): ${e.description}`).join('\n')}

    Formations:
    ${formations.map(f => `- ${f.degree} in ${f.specialty} at ${f.institution} (${f.startDate} - ${f.endDate})`).join('\n')}

    Competences:
    ${competences.map(c => `- ${c.competence.name} (${c.level})`).join('\n')}

    Languages:
    ${langues.map(l => `- ${l.name} (${l.level})`).join('\n')}
  `;

  const jsonInstruction = `
    Respond ONLY with a valid JSON object. No markdown, no explanation, no backticks.
  `;

  const prompts = {
    CV: `${jsonInstruction}
    Generate a CV as JSON from this profile:${baseInfo}
    Return this exact structure:
    {
      "name": "",
      "title": "",
      "summary": "",
      "contact": {
        "phone": "",
        "email": "",
        "github": "",
        "linkedin": "",
        "location": ""
      },
      "experiences": [
        {
          "role": "",
          "company": "",
          "startDate": "",
          "endDate": "",
          "description": ""
        }
      ],
      "formations": [
        {
          "degree": "",
          "specialty": "",
          "institution": "",
          "startDate": "",
          "endDate": ""
        }
      ],
      "competences": [""],
      "languages": [
        { "name": "", "level": "" }
      ]
    }`,

    cover_letter: `${jsonInstruction}
    Generate a cover letter as JSON from this profile:${baseInfo}
    ${jobOffer ? `Job Offer: ${jobOffer.title} at ${jobOffer.company} - ${jobOffer.description}` : ''}
    Return this exact structure:
    {
      "recipient": "",
      "company": "",
      "subject": "",
      "opening": "",
      "body": "",
      "closing": ""
    }`,

    profile_summary: `${jsonInstruction}
    Generate a profile summary as JSON from this profile:${baseInfo}
    Return this exact structure:
    {
      "headline": "",
      "summary": "",
      "keyStrengths": [""]
    }`,

    application_email: `${jsonInstruction}
    Generate a job application email as JSON from this profile:${baseInfo}
    ${jobOffer ? `Job Offer: ${jobOffer.title} at ${jobOffer.company} - ${jobOffer.description}` : ''}
    Return this exact structure:
    {
      "subject": "",
      "greeting": "",
      "body": "",
      "closing": "",
      "signature": ""
    }`
  };

  return prompts[type];
};

export const generateDocumentService = async (userId, type, offreId = null) => {

  // 1 - collect all user data
  const userData = await collectUserData(userId);

  if (!userData.profile) {
    throw new Error('Please create your profile before generating documents');
  }

  // 2 - get job offer if provided
  let jobOffer = null;
  if (offreId) {
    const parsedOffreId = parseInt(offreId)
    jobOffer = await prisma.offre.findUnique({
      where: { id: parsedOffreId }
    });
    if (!jobOffer) {
      throw new Error('Job offer not found');
    }
  }

  // 3 - build prompt
  const prompt = buildPrompt(type, userData, jobOffer);

  // 4 - call OpenAI
//   const response = await openai.chat.completions.create({
//     model: 'gpt-4o-mini',
//     messages: [
//       {
//         role: 'system',
//         content: 'You are a professional career coach and CV writer. Generate high quality professional documents.'
//       },
//       {
//         role: 'user',
//         content: prompt
//       }
//     ],
//     max_tokens: 2000,
//   });

      const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: 'You are a professional CV writer. Always respond with valid JSON only. No markdown, no backticks, no explanation.'
      },
      { role: 'user', content: prompt }
    ],
    max_tokens: 2000,
  });

  // 5 - parse and validate JSON
  let content;
  try {
    const raw = response.choices[0].message.content;
    const cleaned = raw.replace(/```json|```/g, '').trim(); // strip backticks if model misbehaves
    content = JSON.stringify(JSON.parse(cleaned));          // validate + normalize
  } catch (err) {
    throw new Error('AI returned invalid JSON. Please try again.');
  }

  // 6 - save to DB
  const document = await prisma.document.create({
    data: { userId, type, content, aiModelUsed: 'llama-3.3-70b-versatile' }
  });

//   const content = response.choices[0].message.content;

  // 5 - save document to DB
//   const document = await prisma.document.create({
//     data: {
//       userId,
//       type,
//       content,
    //   aiModelUsed: 'gpt-4o-mini'
    //   aiModelUsed: 'llama-3.3-70b-versatile'
    // }
//   });

 
  return document;
};

export const getDocumentsService = async (userId) => {
  const documents = await prisma.document.findMany({
    where: { userId }
  });
  return documents;
};

export const getDocumentByIdService = async (userId, documentId) => {
  const document = await prisma.document.findUnique({
    where: { id: documentId }
  });
  if (!document) {
    throw new Error('Document not found');
  }
  if (document.userId !== userId) {
    throw new Error('Unauthorized');
  }
  return document;
};

export const updateDocumentService = async (userId, documentId, content) => {
  const existingDocument = await prisma.document.findUnique({
    where: { id: documentId }
  });
  if (!existingDocument) {
    throw new Error('Document not found');
  }
  if (existingDocument.userId !== userId) {
    throw new Error('Unauthorized');
  }
  const document = await prisma.document.update({
    where: { id: documentId },
    data: { content }
  });
  return document;
};

export const deleteDocumentService = async (userId, documentId) => {
  const existingDocument = await prisma.document.findUnique({
    where: { id: documentId }
  });
  if (!existingDocument) {
    throw new Error('Document not found');
  }
  if (existingDocument.userId !== userId) {
    throw new Error('Unauthorized');
  }
  await prisma.document.delete({
    where: { id: documentId }
  });
};