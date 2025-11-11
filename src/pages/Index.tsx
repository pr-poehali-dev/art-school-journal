import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import StudentDashboard from '@/components/StudentDashboard';
import TeacherDashboard from '@/components/TeacherDashboard';
import AdminDashboard from '@/components/AdminDashboard';
import { UserRole, Grade, Schedule, BellSchedule, Announcement } from '@/types/journal';

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const mockGrades: Grade[] = [
    { id: '1', subject: 'Рисунок', value: 5, date: '2024-11-01', teacher: 'Иванова А.П.', editable: false },
    { id: '2', subject: 'Живопись', value: 4, date: '2024-11-05', teacher: 'Петров В.С.', editable: true },
    { id: '3', subject: 'Композиция', value: 5, date: '2024-11-08', teacher: 'Сидорова М.И.', editable: true },
    { id: '4', subject: 'История искусств', value: 4, date: '2024-11-10', teacher: 'Козлов Д.Н.', editable: true },
  ];

  const mockSchedule: Schedule[] = [
    { time: '09:00-09:45', monday: 'Рисунок', tuesday: 'Живопись', wednesday: 'Композиция', thursday: 'История', friday: 'Рисунок' },
    { time: '10:00-10:45', monday: 'Живопись', tuesday: 'Композиция', wednesday: 'Рисунок', thursday: 'Живопись', friday: 'История' },
    { time: '11:00-11:45', monday: 'Композиция', tuesday: 'История', wednesday: 'Живопись', thursday: 'Композиция', friday: 'Живопись' },
    { time: '12:00-12:45', monday: '', tuesday: 'Рисунок', wednesday: '', thursday: 'Рисунок', friday: 'Композиция' },
  ];

  const mockBellSchedule: BellSchedule[] = [
    { lesson: 1, start: '09:00', end: '09:45' },
    { lesson: 2, start: '10:00', end: '10:45' },
    { lesson: 3, start: '11:00', end: '11:45' },
    { lesson: 4, start: '12:00', end: '12:45' },
  ];

  const mockAnnouncements: Announcement[] = [
    { id: '1', title: 'Важное объявление о выставке', content: 'С 15 по 20 ноября в школе пройдёт выставка работ учащихся. Приглашаем всех!', date: '2024-11-10', author: 'Администрация' },
    { id: '2', title: 'Изменения в расписании', content: 'В связи с праздничным днём 12 ноября занятия переносятся на субботу.', date: '2024-11-08', author: 'Завуч' },
  ];

  const handleLogin = (role: UserRole) => {
    if (!email || !password) {
      toast({
        title: 'Ошибка входа',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }
    setUserRole(role);
    toast({
      title: 'Успешный вход',
      description: `Добро пожаловать в систему!`,
    });
  };

  const handleLogout = () => {
    setUserRole(null);
    setEmail('');
    setPassword('');
  };

  if (!userRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl animate-fade-in">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-2xl mb-4 shadow-lg">
              <Icon name="GraduationCap" size={40} className="text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Электронный журнал</h1>
            <p className="text-muted-foreground text-lg">Школа искусств Насонова МТ</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                  <Icon name="User" size={24} className="text-primary" />
                </div>
                <CardTitle>Вход для учеников</CardTitle>
                <CardDescription>Просмотр оценок, расписания и объявлений</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="student-email">Электронная почта</Label>
                  <Input 
                    id="student-email" 
                    type="email" 
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="student-password">Пароль</Label>
                  <Input 
                    id="student-password" 
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={() => handleLogin('student')}>
                  Войти как ученик
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-secondary/50">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-3">
                  <Icon name="BookOpen" size={24} className="text-secondary" />
                </div>
                <CardTitle>Вход для учителей</CardTitle>
                <CardDescription>Выставление оценок и домашних заданий</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="teacher-email">Электронная почта</Label>
                  <Input 
                    id="teacher-email" 
                    type="email" 
                    placeholder="teacher@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="teacher-password">Пароль</Label>
                  <Input 
                    id="teacher-password" 
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button className="w-full bg-secondary hover:bg-secondary/90" onClick={() => handleLogin('teacher')}>
                  Войти как учитель
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/50">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-3">
                  <Icon name="Shield" size={24} className="text-accent" />
                </div>
                <CardTitle>Вход для завуча</CardTitle>
                <CardDescription>Полный доступ к управлению системой</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="admin-email">Электронная почта</Label>
                  <Input 
                    id="admin-email" 
                    type="email" 
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="admin-password">Пароль</Label>
                  <Input 
                    id="admin-password" 
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={() => handleLogin('admin')}>
                  Войти как завуч
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Icon name="GraduationCap" size={24} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Электронный журнал</h1>
              <p className="text-xs text-muted-foreground">Школа искусств Насонова МТ</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="px-3 py-1">
              {userRole === 'student' && 'Ученик'}
              {userRole === 'teacher' && 'Учитель'}
              {userRole === 'admin' && 'Завуч'}
            </Badge>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <Icon name="LogOut" size={18} className="mr-2" />
              Выход
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {userRole === 'student' && <StudentDashboard grades={mockGrades} schedule={mockSchedule} bellSchedule={mockBellSchedule} announcements={mockAnnouncements} />}
        {userRole === 'teacher' && <TeacherDashboard grades={mockGrades} />}
        {userRole === 'admin' && <AdminDashboard schedule={mockSchedule} bellSchedule={mockBellSchedule} announcements={mockAnnouncements} grades={mockGrades} />}
      </main>
    </div>
  );
};

export default Index;
