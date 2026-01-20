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

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful and encouraging teacher grading a 10-year-old student\'s science exam. Provide constructive feedback in JSON format.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.3,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`OpenAI API request failed: ${response.status} ${errorData}`);
      }

      const data = await response.json();
      const text = data.choices[0].message.content;
      
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Failed to extract JSON from response');
      }
      
      const result = JSON.parse(jsonMatch[0]);
      
      return {
        index: q.index,
        score: result.score,
        feedback: result.feedback
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
