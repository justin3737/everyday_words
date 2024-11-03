import { Button, Card, CardBody, Text, VStack, Icon } from '@chakra-ui/react';
import { MdError } from 'react-icons/md';

interface UnexpectedErrorCardProps {
  onBack: () => void;
}

function UnexpectedErrorCard({ onBack }: UnexpectedErrorCardProps) {
  return (
    <Card>
      <CardBody>
        <VStack spacing={4}>
          <Icon as={MdError} boxSize={8} color="red.500" />
          <Text>發生非預期錯誤，請稍後再試</Text>
          <Button onClick={onBack}>返回上一頁</Button>
        </VStack>
      </CardBody>
    </Card>
  );
}

export default UnexpectedErrorCard; 