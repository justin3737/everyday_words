let maleVoice: SpeechSynthesisVoice | null = null;

// 初始化函數，用於獲取男聲
const initVoices = () => {
  const voices = speechSynthesis.getVoices();
  
  // 優先尋找 Google 的英語聲音
  maleVoice = voices.find(voice => 
    voice.name.includes('Google') && voice.lang.startsWith('en')
  ) || null;
  
  // 如果沒有 Google 聲音，尋找任何英語聲音
  if (!maleVoice) {
    maleVoice = voices.find(voice => voice.lang.startsWith('en')) || null;
  }
  
  // 如果還是沒有，使用任何可用的聲音
  if (!maleVoice && voices.length > 0) {
    maleVoice = voices[0];
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
  // 取消所有正在播放的語音
  speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  
  if (maleVoice) {
    utterance.voice = maleVoice;
  }
  
  // 調整為更自然的設定
  utterance.pitch = 1.0;  // 使用正常音調
  utterance.rate = 0.9;   // 稍微放慢速度
  utterance.volume = 1.0; // 最大音量
  
  // 確保語音初始化
  if (speechSynthesis.getVoices().length === 0) {
    initVoices();
  }
  
  speechSynthesis.speak(utterance);
};
