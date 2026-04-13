const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export const translateDNA = async (sequence) => {
  try {
    const response = await fetch(`${API_BASE_URL}/dna/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sequence }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(`HTTP ${response.status}: ${errorData.message || 'Failed to translate DNA sequence'}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error translating DNA:', error);
    throw error;
  }
};