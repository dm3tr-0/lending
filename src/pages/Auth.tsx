import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase';

type AuthMode = 'login' | 'register' | 'recover';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const redirect = searchParams.get("redirect") || "/dashboard";

  const handleAuth = async () => {
    try {
      if (!email || !password || (authMode === "register" && !confirmPassword)) {
        toast({ title: "Пожалуйста, заполните все поля", variant: "destructive" });
        return;
      }

      if (authMode === "register") {
        if (password !== confirmPassword) {
          toast({ title: "Пароли не совпадают", variant: "destructive" });
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
        toast({ title: "Успешная регистрация" });
      } else if (authMode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: "Успешный вход" });
	localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', email);
	navigate('/dashboard');
      } else if (authMode === "recover") {
        await sendPasswordResetEmail(auth, email);
        toast({ title: "Письмо для восстановления отправлено" });
        return;
      }

      navigate(redirect);
    } catch (err: any) {
      toast({ title: err.message || "Произошла ошибка", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1 px-4">
        <Tabs defaultValue={authMode} className="w-full max-w-md" onValueChange={(v) => setAuthMode(v as AuthMode)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
            <TabsTrigger value="recover">Восстановление</TabsTrigger>
          </TabsList>

          <TabsContent value={authMode}>
            <Card>
              <CardHeader>
                <CardTitle>
                  {authMode === "login" ? "Вход" : authMode === "register" ? "Регистрация" : "Восстановление пароля"}
                </CardTitle>
                <CardDescription>
                  {authMode === "login" ? "Введите свои данные для входа." :
                    authMode === "register" ? "Создайте новый аккаунт." :
                      "Введите свою почту для восстановления пароля."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                {authMode !== "recover" && (
                  <div className="space-y-1">
                    <Label htmlFor="password">Пароль</Label>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                )}
                {authMode === "register" && (
                  <div className="space-y-1">
                    <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleAuth}>
                  {authMode === "login" ? "Войти" : authMode === "register" ? "Зарегистрироваться" : "Восстановить"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;