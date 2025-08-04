import { getPokemonBattleStream } from "@/pages/Home/services/chatbotApi";
import { useState } from "react";

export const usePokemonBattleStream = (query: string) => {
  const [streamedResponse, setStreamedResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const handlePromptSubmit = async () => {
    setIsLoading(true);
    setStreamedResponse("");

    const { reader, decoder } = await getPokemonBattleStream(query);

    if (!reader || !decoder) {
      setStreamedResponse("Error fetching response.");

      return;
    }

    setIsStreaming(true);

    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value);

        setStreamedResponse((prev) => prev + chunk);
      }

      setIsStreaming(false);
    } catch (error) {
      console.error("Streaming failed:", error);
      setStreamedResponse("Error fetching response.");
    } finally {
      setIsLoading(false);
    }
  };
  return {
    streamedResponse,
    isLoading,
    isStreaming,
    setStreamedResponse,
    handlePromptSubmit,
  };
};
