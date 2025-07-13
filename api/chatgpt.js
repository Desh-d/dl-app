export default async function handler(req, res) {
  const { message } = req.body;
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    if (!data.choices || !data.choices[0]) {
      // Return the whole error from OpenAI to the frontend!
      return res.status(500).json({ reply: "OpenAI API error: " + JSON.stringify(data) });
    }
    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ reply: "Server error: " + err.message });
  }
}
