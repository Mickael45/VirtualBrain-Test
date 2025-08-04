import { CHAT_BOT_TOKEN, CHAT_BOT_URL } from "@/constants";

interface BattleStreamResponse {
  reader: ReadableStreamDefaultReader<Uint8Array> | null;
  decoder: TextDecoder | null;
}

export const getPokemonBattleStream = async (
  query: string
): Promise<BattleStreamResponse> => {
  try {
    const response = await fetch(`${CHAT_BOT_URL}query?query=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CHAT_BOT_TOKEN}`,
      },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    if (!response.body) {
      throw new Error("ReadableStream not yet supported in this browser.");
    }

    return {
      reader: response.body.getReader(),
      decoder: new TextDecoder(),
    };
  } catch (error) {
    console.error("Error fetching battle stream:", error);
    return { reader: null, decoder: null };
  }
};
