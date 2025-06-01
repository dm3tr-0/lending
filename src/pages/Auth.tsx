import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { auth } from '@/lib/firebase'; // Импорт клиентского Firebase
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
//import { query } from '@/lib/db'; // Импорт PostgreSQL клиента
import { registerUser } from '@/lib/api';
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode && (mode === 'login' || mode === 'register' || mode === 'recover')) {
      setAuthMode(mode as AuthMode);
    }
  }, [searchParams]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (authMode === 'register') {
        // Валидация пароля
        if (password !== confirmPassword) {
          toast({
            title: "Passwords don't match",
            description: "Please make sure your passwords match.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        // Регистрация в Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Сохранение пользователя в PostgreSQL
        //await query(
        //  'INSERT INTO users (firebase_uid, email) VALUES ($1, $2)',
        //  [userCredential.user.uid, email]
        //);
	//await createUser(userCredential.user.uid, email);
        
	const response = await registerUser({
        firebase_uid: userCredential.user.uid,
        email: userCredential.user.email || email
      });
	
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', email);
	localStorage.setItem('userId', response.id);
        toast({
          title: "Account created!",
          description: "Your account has been created successfully.",
        });
        navigate('/dashboard');
      } 
      else if (authMode === 'login') {
         const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUid = userCredential.user.uid;

    // 2. Получение внутреннего ID из вашей БД
    const userResponse = await fetch(`http://localhost:5000/api/user-by-firebase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firebase_uid: firebaseUid }),
    });

    if (!userResponse.ok) {
      const errorData = await userResponse.json();
      throw new Error(errorData.error || 'Failed to fetch user data');
    }

    const { id: userId } = await userResponse.json();

    // 3. Сохранение данных в localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userId', userId);
    localStorage.setItem('firebaseUid', firebaseUid); // Дополнительно сохраняем для отладки

        toast({
          title: "Welcome back!",
          description: "You've been logged in successfully.",
        });
        navigate('/dashboard');
      } 
      else if (authMode === 'recover') {
        // Восстановление пароля
        await sendPasswordResetEmail(auth, email);
        toast({
          title: "Recovery email sent",
          description: "Check your inbox for password reset instructions.",
        });
        setAuthMode('login');
      }
    } catch (error: any) {
      // Обработка ошибок Firebase
      let errorMessage = "An error occurred. Please try again.";
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "Email already in use.";
          break;
        case 'auth/invalid-email':
          errorMessage = "Invalid email address.";
          break;
        case 'auth/weak-password':
          errorMessage = "Password should be at least 6 characters.";
          break;
        case 'auth/user-not-found':
          errorMessage = "User not found.";
          break;
        case 'auth/wrong-password':
          errorMessage = "Invalid password.";
          break;
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

 
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container flex items-center justify-center min-h-screen py-20">
        <div className="w-full max-w-md animate-fade-in">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground mb-6 hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as AuthMode)} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Sign In</CardTitle>
                  <CardDescription>
                    Enter your email and password to access your account
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleAuth}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="you@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <button 
                          type="button" 
                          className="text-xs text-primary hover:underline"
                          onClick={() => setAuthMode('recover')}
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <Input 
                          id="password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button 
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                          onClick={toggleShowPassword}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>
                    Enter your details to create a new account
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleAuth}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input 
                        id="register-email" 
                        type="email" 
                        placeholder="you@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <div className="relative">
                        <Input 
                          id="register-password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button 
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                          onClick={toggleShowPassword}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input 
                        id="confirm-password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="recover">
              <Card>
                <CardHeader>
                  <CardTitle>Reset password</CardTitle>
                  <CardDescription>
                    Enter your email to receive a password reset link
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleAuth}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="recover-email">Email</Label>
                      <Input 
                        id="recover-email" 
                        type="email" 
                        placeholder="you@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Send Reset Link"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      className="w-full"
                      onClick={() => setAuthMode('login')}
                    >
                      Back to sign in
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;