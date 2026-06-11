export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { topic, count } = req.body;

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 4000,
        messages: [
          {
            role: 'system',
            content: 'You are an expert educator. Always respond with valid JSON only — no markdown, no backticks, no explanation.'
          },
          {
            role: 'user',
            content: `Generate comprehensive study material for the topic: "${topic}".

Return ONLY this JSON structure:
{
  "flashcards": [{"question": "...", "answer": "..."}],
  "keyConcepts": [{"term": "...", "definition": "..."}],
  "revisionCards": [{"heading": "...", "points": ["...", "...", "..."]}]
}

Rules:
- Generate exactly ${count || 15} flashcards as Q&A pairs
- Generate at least 8 key concepts with clear definitions
- Generate at least 5 revision cards with 3-5 bullet points each
- Make questions specific and educational
- Keep answers concise (1-3 sentences)
- Do not repeat questions`
          }
        ]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const rawText = data.choices[0].message.content;
    const clean = rawText.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    return res.status(200).json(parsed);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
