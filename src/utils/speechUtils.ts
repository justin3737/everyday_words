let maleVoice: SpeechSynthesisVoice | null = null;

// 初始化函數，用於獲取男聲
const initVoices = () => {
  // 獲取所有可用的聲音
  const voices = speechSynthesis.getVoices();
  
  // 尋找第一個男聲
  maleVoice = voices.find(voice => voice.name.includes('Male') || voice.name.includes('男')) || null;
  
  // 如果沒有找到明確的男聲，嘗試找英語聲音（通常默認是男聲）
  if (!maleVoice) {
    maleVoice = voices.find(voice => voice.lang.startsWith('en')) || null;
  }
};

// 在頁面加載時初始化聲音
if (typeof window !== 'undefined') {
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = initVoices;
  }
  initVoices(); // 立即調用一次，以防 onvoiceschanged 事件不觸發
}

export const speakText = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  
  // 如果找到了男聲，就使用它
  if (maleVoice) {
    utterance.voice = maleVoice;
  }
  
  // 可以調整音調和速度來使聲音更像男聲
  utterance.pitch = 0.8; // 降低音調（範圍 0 到 2）
  utterance.rate = 0.9; // 稍微降低速度（範圍 0.1 到 10）
  
  speechSynthesis.speak(utterance);
};
