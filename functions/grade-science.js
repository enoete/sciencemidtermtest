const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { questions } = JSON.parse(event.body);
    
    if (!questions || !Array.isArray(questions)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid request format' })
      };
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    
    if (!OPENAI_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API key not configured' })
      };
    }

    // Grade all questions in parallel
    const gradingPromises = questions.map(async (q) => {
      const prompt = `You are grading a Grade 5 science exam answer. Grade this answer on a scale of 0-2 points.

Question: ${q.question}

Student's Answer: ${q.answer}

Grading Rubric: ${q.rubric}

Scoring:
- 2 points: Excellent answer that fully addresses the question with accurate details
- 1 point: Partial answer that shows some understanding but is incomplete or has minor errors
- 0 points: Incorrect, irrelevant, or shows major misunderstanding

Provide your response in this exact JSON format:
{
  "score": <0, 1, or 2>,
  "feedback": "<Encouraging feedback explaining the score. Be specific about what was good and what could be improved. Keep it friendly and encouraging for a 10-year-old student.>"
}`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': OPENAI_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 500,
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const text = data.content[0].text;
      
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Failed to extract JSON from response');
      }
      
      const result = JSON.parse(jsonMatch[0]);
      
      return {
        index: q.index,
        ...result
      };
    });

    const results = await Promise.all(gradingPromises);
    
    // Convert array to object with indices as keys
    const grades = {};
    results.forEach(r => {
      grades[r.index] = {
        score: r.score,
        feedback: r.feedback
      };
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ grades })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to grade questions',
        details: error.message 
      })
    };
  }
};
