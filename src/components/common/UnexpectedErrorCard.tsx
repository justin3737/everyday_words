import { Button, Card, CardBody, Text, VStack } from '@chakra-ui/react';

interface UnexpectedErrorCardProps {
  onBack: () => void;
}

function UnexpectedErrorCard({ onBack }: UnexpectedErrorCardProps) {
  return (
    <Card>
      <CardBody>
        <VStack spacing={4}>
          <Text>發生非預期錯誤，請稍後再試</Text>
          <Button onClick={onBack}>返回上一頁</Button>
        </VStack>
      </CardBody>
    </Card>
  );
}

export default UnexpectedErrorCard; 