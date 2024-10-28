import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { FaVolumeUp } from 'react-icons/fa';
import { speakText } from '../../utils/speechUtils';

interface SpeakButtonProps {
  text: string;
  size?: string;
}

const SpeakButton: React.FC<SpeakButtonProps> = ({ text, size = "sm" }) => {
  return (
    <IconButton
      aria-label={`Pronounce ${text}`}
      icon={<FaVolumeUp />}
      onClick={() => speakText(text)}
      size={size}
    />
  );
};

export default SpeakButton;
