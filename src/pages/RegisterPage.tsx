import { useState } from 'react';
import { VStack, Input, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/common/Layout';
import MajorButton from '../components/common/MajorButton';
import { register } from '../api/authApi';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await register({ email, password, username });
      if (response.success) {
        toast({
          title: response.message,
          status: 'success',
          duration: 2000,
        });
        // TODO: 可以選擇是否要自動登入
        navigate('/word'); // 導回登入頁
      } else {
        toast({
          title: response.message,
          status: 'error',
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        title: '註冊失敗',
        description: '請稍後再試',
        status: 'error',
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout showHeader={false}>
      <VStack spacing={8} justify="center">
        <Text fontSize="2xl" fontWeight="bold">註冊帳號</Text>
        <VStack as="form" spacing={4} width="300px" onSubmit={handleSubmit}>
          <Input
            placeholder="帳號：example@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            placeholder="密碼"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            placeholder="使用者名稱"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <MajorButton 
            width="100%" 
            type="submit"
            isLoading={isLoading}
          >
            註冊
          </MajorButton>
        </VStack>
      </VStack>
    </Layout>
  );
}

export default Register; 