const axios = require('axios');

async function testChat() {
  try {
    const res = await axios.post('http://127.0.0.1:5000/chat', {
      message: 'What is autism?'
    });

    console.log('🧠 Bot reply:', res.data.reply);
  } catch (err) {
    if (err.response) {
      console.error('❌ Error from backend (response):', err.response.data);
    } else if (err.request) {
      console.error('❌ No response received:', err.request);
    } else {
      console.error('❌ Request setup error:', err.message);
    }
  }
}

testChat();
