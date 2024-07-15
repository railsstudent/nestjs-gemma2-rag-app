export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  groq: {
    apiKey: process.env.GROQ_API_KEY || '',
    model: process.env.GROQ_MODEL || 'gemma2-9b-it',
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || '',
    model: process.env.GEMINI_TEXT_EMBEDDING_MODEL || 'text-embedding-004',
  },
});
