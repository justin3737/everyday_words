function AuthInitializer({ children }: { children: React.ReactNode }) {
  // 只作為身份驗證的容器，不處理 token 邏輯
  return <>{children}</>;
}

export default AuthInitializer; 