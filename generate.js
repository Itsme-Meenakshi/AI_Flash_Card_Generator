export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { topic, count } = req.body;

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: `You are an expert educator. Generate comprehensive study material for the topic: "${topic}".

Return ONLY a valid JSON object with NO markdown, no backticks, no explanation. Just raw JSON:

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
- Cover different aspects of the topic
- Do not repeat questions`
        }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const rawText = data.content.map(b => b.text || '').join('');
    const clean = rawText.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    return res.status(200).json(parsed);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
