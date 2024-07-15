import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 100,
});

export async function loadPdf(path: string) {
  const loader = new PDFLoader(path);

  const docs = await loader.load();
  const splitDocs = await splitter.splitDocuments(docs);
  return splitDocs;
}
