interface BattleStreamResponse {
  reader: ReadableStreamDefaultReader<Uint8Array> | null;
  decoder: TextDecoder | null;
}

export const getPokemonBattleStream = async (
  query: string
): Promise<BattleStreamResponse> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CHAT_BOT_URL}query?query=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_CHAT_BOT_TOKEN}`,
        },
      }
    );

    if (!response.ok)
      throw new Error(`Erreur HTTP! statut: ${response.status}`);

    if (!response.body) {
      throw new Error(
        "ReadableStream n'est pas encore supporté dans ce navigateur."
      );
    }

    return {
      reader: response.body.getReader(),
      decoder: new TextDecoder(),
    };
  } catch (error) {
    console.error("Erreur lors de la récupération du flux de bataille:", error);
    return { reader: null, decoder: null };
  }
};
