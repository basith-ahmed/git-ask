"use server";

import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateEmbedding } from "@/lib/gemini";
import { db } from "@/server/db";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function askQuestion(question: string, projectId: string) {
  console.log("question", question);
  console.log("projectId", projectId);
  const stream = createStreamableValue();

  const queryVector = await generateEmbedding(question);

  const vectorQuery = `[${queryVector.join(",")}]`;

  const result = (await db.$queryRaw`
    SELECT "fileName", "sourceCode", "summary",
    1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) AS similarity
    FROM "SourceCodeEmbedding"
    WHERE 1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) > 0.1
    AND "projectId" = ${projectId}
    ORDER BY similarity DESC
    LIMIT 10
    `) as {
    fileName: string;
    sourceCode: string;
    summary: string;
    similarity: number;
  }[];

  //   console.log("result", result);

  let context = "";

  for (const doc of result) {
    context += `source: ${doc.fileName}\n code content: ${doc.sourceCode}\n summary of the code: ${doc.summary}\n\n`;
  }

  (async () => {
    const { textStream } = await streamText({
      model: google("gemini-1.5-flash"),
      prompt: `
      You are an AI code assistant designed to answer technical questions about a given codebase. Your target audience is a technical intern.  

### AI Traits:  
- You possess expert-level knowledge in software development.  
- You are helpful, articulate, and clever.  
- You provide clear, structured, and thoughtful responses.  
- You communicate in a friendly, professional, and encouraging manner.  

### Response Guidelines:  
- If a **CONTEXT BLOCK** is provided, always refer to it when answering questions.  
- If the context does not contain the answer, respond with: 'I'm sorry, but I don't have the answer based on the provided context.'  
- Never fabricate information—your answers should strictly derive from the given context.  
- Do not apologize for previous responses; instead, acknowledge newly gained information.  
- Use **markdown syntax** for formatting, including code snippets where necessary.  
- Provide step-by-step explanations when appropriate.  

---

**START CONTEXT BLOCK**  
${context}  
**END CONTEXT BLOCK**  

**START QUESTION**  
${question}  
**END QUESTION**  

---

Your goal is to deliver precise, technical, and well-structured answers tailored for a technical intern while ensuring clarity and accuracy.
`,
    });

    for await (const text of textStream) {
      stream.update(text);
    }

    stream.done();
  })();

  return {
    output: stream.value,
    fileReferences: result,
  };
}
