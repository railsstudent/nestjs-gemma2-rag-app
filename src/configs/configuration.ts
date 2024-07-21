export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  groq: {
    apiKey: process.env.GROQ_API_KEY || '',
    model: process.env.GROQ_MODEL || 'gemma2-9b-it',
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || '',
    embeddingModel: process.env.GEMINI_TEXT_EMBEDDING_MODEL || 'text-embedding-004',
  },
  huggingface: {
    apiKey: process.env.HUGGINGFACE_API_KEY || '',
    embeddingModel: process.env.HUGGINGFACE_EMBEDDING_MODEL || 'BAAI/bge-small-en-v1.5',
  },
  qdrant: {
    url: process.env.QDRANT_URL || 'http://localhost:6333',
    apiKey: process.env.QDRANT_APK_KEY || '',
  },
});
