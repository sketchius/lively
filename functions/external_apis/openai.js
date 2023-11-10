exports.executeOpenAICall = async function (
    conversationHistory,
    newSystemMessage,
    newUserMessage
  ) {
    const messages = [
      ...conversationHistory,
      {
        role: "system",
        content: newSystemMessage,
      },
      {
        role: "user",
        content: newUserMessage,
      },
    ];
  
    try {
      const openAIResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
      });
      return openAIResponse.choices[0].message.content;
    } catch (error) {
      console.log("Error in API Call: ", error);
      return null;
    }
  };