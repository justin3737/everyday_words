import { useState } from 'react';
import { VStack, Image, Text, Input, Link, HStack, useToast } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Layout from '../components/common/Layout';
import MajorButton from '../components/common/MajorButton';
import LoginButton from '../components/button/LoginButton';
import { login } from '../api/authApi';
import { useAuth } from '../hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import { ApiResponse } from '../api/apiUtils';

function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const loginMutation = useMutation<
    ApiResponse<{ token: string }>,
    Error,
    { email: string; password: string }
  >({
    mutationFn: login,
    onSuccess: (response) => {
      if (response.success && response.data?.token) {
        setToken(response.data.token);
        setEmail('');
        setPassword('');
        
        toast({
          title: '登入成功',
          status: 'success',
          duration: 2000,
        });
        
        navigate('/word');
      } else {
        toast({
          title: response.message || '登入失敗',
          status: 'error',
          duration: 2000,
        });
      }
    },
    onError: (error) => {
      console.error('Login error:', error);
      toast({
        title: '登入失敗',
        description: '請檢查網路連線後再試',
        status: 'error',
        duration: 2000,
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <Layout showHeader={false}>
      <VStack spacing={8} justify="center">
        <Image src="/logo.png" alt="App Icon" boxSize="150px" my={20}/>
        <Text fontSize="2xl" fontWeight="bold">每日隨機單字</Text>
        <VStack as="form" spacing={4} width="300px" onSubmit={handleSubmit}>
          <Input
            placeholder="帳號"
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
          <MajorButton 
            width="100%" 
            type="submit"
            isLoading={loginMutation.isPending}
          >
            登入
          </MajorButton>
        </VStack>
        <HStack justifyContent="space-between" width="300px">
          <LoginButton />
          <Link
            as={RouterLink}
            to="/register"
            color="blue.500"
            fontSize="sm"
            textDecoration="underline"
          >
            註冊新帳號
          </Link>
        </HStack>
      </VStack>
    </Layout>
  );
}

export default Home;
