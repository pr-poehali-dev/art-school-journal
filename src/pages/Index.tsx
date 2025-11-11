import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

type UserRole = 'student' | 'teacher' | 'admin' | null;

interface Grade {
  id: string;
  subject: string;
  value: number;
  date: string;
  teacher: string;
  editable: boolean;
}

interface Schedule {
  time: string;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

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

  const mockBellSchedule = [
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

const StudentDashboard = ({ grades, schedule, bellSchedule, announcements }: { grades: Grade[], schedule: Schedule[], bellSchedule: any[], announcements: Announcement[] }) => {
  const calculateAverage = () => {
    const sum = grades.reduce((acc, grade) => acc + grade.value, 0);
    return (sum / grades.length).toFixed(2);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Средний балл</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{calculateAverage()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Всего оценок</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{grades.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Успеваемость</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">Отлично</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="grades" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="grades">
            <Icon name="Award" size={18} className="mr-2" />
            Оценки
          </TabsTrigger>
          <TabsTrigger value="schedule">
            <Icon name="Calendar" size={18} className="mr-2" />
            Расписание
          </TabsTrigger>
          <TabsTrigger value="bells">
            <Icon name="Clock" size={18} className="mr-2" />
            Звонки
          </TabsTrigger>
          <TabsTrigger value="announcements">
            <Icon name="MessageSquare" size={18} className="mr-2" />
            Объявления
          </TabsTrigger>
        </TabsList>

        <TabsContent value="grades" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Мои оценки</CardTitle>
              <CardDescription>История оценок по всем предметам</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Предмет</TableHead>
                    <TableHead>Оценка</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead>Преподаватель</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grades.map((grade) => (
                    <TableRow key={grade.id}>
                      <TableCell className="font-medium">{grade.subject}</TableCell>
                      <TableCell>
                        <Badge variant={grade.value >= 4 ? 'default' : 'secondary'}>
                          {grade.value}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(grade.date).toLocaleDateString('ru-RU')}</TableCell>
                      <TableCell className="text-muted-foreground">{grade.teacher}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Расписание уроков</CardTitle>
              <CardDescription>Недельное расписание занятий</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24">Время</TableHead>
                      <TableHead>Понедельник</TableHead>
                      <TableHead>Вторник</TableHead>
                      <TableHead>Среда</TableHead>
                      <TableHead>Четверг</TableHead>
                      <TableHead>Пятница</TableHead>
                      <TableHead>Суббота</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedule.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{row.time}</TableCell>
                        <TableCell>{row.monday || '—'}</TableCell>
                        <TableCell>{row.tuesday || '—'}</TableCell>
                        <TableCell>{row.wednesday || '—'}</TableCell>
                        <TableCell>{row.thursday || '—'}</TableCell>
                        <TableCell>{row.friday || '—'}</TableCell>
                        <TableCell>{row.saturday || '—'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bells" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Расписание звонков</CardTitle>
              <CardDescription>Время начала и окончания уроков</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bellSchedule.map((bell) => (
                  <div key={bell.lesson} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-bold text-primary">{bell.lesson}</span>
                      </div>
                      <span className="font-medium">{bell.lesson} урок</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Clock" size={16} />
                      <span>{bell.start} — {bell.end}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements" className="mt-6">
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{announcement.title}</CardTitle>
                      <CardDescription className="mt-2">{announcement.content}</CardDescription>
                    </div>
                    <Badge variant="outline">{new Date(announcement.date).toLocaleDateString('ru-RU')}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="User" size={16} />
                    <span>От: {announcement.author}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const TeacherDashboard = ({ grades }: { grades: Grade[] }) => {
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [gradeValue, setGradeValue] = useState('');
  const [homework, setHomework] = useState('');

  const handleAddGrade = () => {
    if (!selectedClass || !selectedStudent || !selectedSubject || !gradeValue) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Оценка выставлена',
      description: `Оценка ${gradeValue} успешно выставлена`,
    });
    setGradeValue('');
  };

  const handleSetHomework = () => {
    if (!selectedClass || !selectedSubject || !homework) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Задание задано',
      description: 'Домашнее задание успешно отправлено',
    });
    setHomework('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Tabs defaultValue="grades" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="grades">
            <Icon name="Award" size={18} className="mr-2" />
            Выставление оценок
          </TabsTrigger>
          <TabsTrigger value="homework">
            <Icon name="BookOpen" size={18} className="mr-2" />
            Домашнее задание
          </TabsTrigger>
          <TabsTrigger value="statistics">
            <Icon name="BarChart" size={18} className="mr-2" />
            Статистика
          </TabsTrigger>
        </TabsList>

        <TabsContent value="grades" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Выставить оценку</CardTitle>
                <CardDescription>Выберите класс, ученика и предмет</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Класс</Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите класс" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1a">1А класс</SelectItem>
                      <SelectItem value="1b">1Б класс</SelectItem>
                      <SelectItem value="2a">2А класс</SelectItem>
                      <SelectItem value="2b">2Б класс</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Ученик</Label>
                  <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите ученика" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Иванов Иван</SelectItem>
                      <SelectItem value="2">Петрова Мария</SelectItem>
                      <SelectItem value="3">Сидоров Алексей</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Предмет</Label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите предмет" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drawing">Рисунок</SelectItem>
                      <SelectItem value="painting">Живопись</SelectItem>
                      <SelectItem value="composition">Композиция</SelectItem>
                      <SelectItem value="history">История искусств</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Оценка</Label>
                  <Select value={gradeValue} onValueChange={setGradeValue}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите оценку" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 (Отлично)</SelectItem>
                      <SelectItem value="4">4 (Хорошо)</SelectItem>
                      <SelectItem value="3">3 (Удовлетворительно)</SelectItem>
                      <SelectItem value="2">2 (Неудовлетворительно)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full" onClick={handleAddGrade}>
                  <Icon name="Plus" size={18} className="mr-2" />
                  Выставить оценку
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Выставленные оценки</CardTitle>
                <CardDescription>Оценки, доступные для редактирования</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {grades.filter(g => g.editable).map((grade) => (
                    <div key={grade.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">{grade.subject}</p>
                        <p className="text-sm text-muted-foreground">{new Date(grade.date).toLocaleDateString('ru-RU')}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>{grade.value}</Badge>
                        <Button variant="ghost" size="sm">
                          <Icon name="Pencil" size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="homework" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Задать домашнее задание</CardTitle>
              <CardDescription>Выберите класс и предмет для задания</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Класс</Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите класс" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1a">1А класс</SelectItem>
                      <SelectItem value="1b">1Б класс</SelectItem>
                      <SelectItem value="2a">2А класс</SelectItem>
                      <SelectItem value="2b">2Б класс</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Предмет</Label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите предмет" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drawing">Рисунок</SelectItem>
                      <SelectItem value="painting">Живопись</SelectItem>
                      <SelectItem value="composition">Композиция</SelectItem>
                      <SelectItem value="history">История искусств</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Домашнее задание</Label>
                <Textarea 
                  placeholder="Опишите домашнее задание..."
                  value={homework}
                  onChange={(e) => setHomework(e.target.value)}
                  rows={6}
                />
              </div>

              <Button className="w-full" onClick={handleSetHomework}>
                <Icon name="Send" size={18} className="mr-2" />
                Отправить задание
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics" className="mt-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Средний балл класса</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">4.5</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Всего учеников</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Успеваемость</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">92%</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const AdminDashboard = ({ schedule, bellSchedule, announcements, grades }: { schedule: Schedule[], bellSchedule: any[], announcements: Announcement[], grades: Grade[] }) => {
  const { toast } = useToast();
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [gradeValue, setGradeValue] = useState('');

  const handleAddAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.content) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Объявление опубликовано',
      description: 'Объявление успешно добавлено',
    });
    setNewAnnouncement({ title: '', content: '' });
  };

  const handleEditGrade = () => {
    if (!selectedClass || !selectedStudent || !selectedSubject || !gradeValue) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Оценка изменена',
      description: `Оценка успешно изменена на ${gradeValue}`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Всего учеников</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">156</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Учителей</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">18</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Классов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Средний балл</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">4.3</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="announcements" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="announcements">
            <Icon name="MessageSquare" size={18} className="mr-2" />
            Объявления
          </TabsTrigger>
          <TabsTrigger value="schedule">
            <Icon name="Calendar" size={18} className="mr-2" />
            Расписание
          </TabsTrigger>
          <TabsTrigger value="grades">
            <Icon name="Award" size={18} className="mr-2" />
            Оценки
          </TabsTrigger>
          <TabsTrigger value="bells">
            <Icon name="Clock" size={18} className="mr-2" />
            Звонки
          </TabsTrigger>
        </TabsList>

        <TabsContent value="announcements" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Создать объявление</CardTitle>
                <CardDescription>Добавьте новое объявление для учеников и учителей</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Заголовок</Label>
                  <Input 
                    placeholder="Введите заголовок объявления"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Содержание</Label>
                  <Textarea 
                    placeholder="Введите текст объявления"
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                    rows={6}
                  />
                </div>
                <Button className="w-full" onClick={handleAddAnnouncement}>
                  <Icon name="Plus" size={18} className="mr-2" />
                  Опубликовать объявление
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Текущие объявления</h3>
              {announcements.map((announcement) => (
                <Card key={announcement.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{announcement.title}</CardTitle>
                      <Button variant="ghost" size="sm">
                        <Icon name="Trash2" size={16} className="text-destructive" />
                      </Button>
                    </div>
                    <CardDescription>{announcement.content}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Управление расписанием</CardTitle>
              <CardDescription>Редактирование расписания уроков для всех классов</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24">Время</TableHead>
                      <TableHead>Понедельник</TableHead>
                      <TableHead>Вторник</TableHead>
                      <TableHead>Среда</TableHead>
                      <TableHead>Четверг</TableHead>
                      <TableHead>Пятница</TableHead>
                      <TableHead>Суббота</TableHead>
                      <TableHead className="w-20"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedule.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{row.time}</TableCell>
                        <TableCell>{row.monday || '—'}</TableCell>
                        <TableCell>{row.tuesday || '—'}</TableCell>
                        <TableCell>{row.wednesday || '—'}</TableCell>
                        <TableCell>{row.thursday || '—'}</TableCell>
                        <TableCell>{row.friday || '—'}</TableCell>
                        <TableCell>{row.saturday || '—'}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Icon name="Pencil" size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grades" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Редактирование оценок</CardTitle>
              <CardDescription>Полный доступ к изменению любых оценок</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Класс</Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите класс" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1a">1А класс</SelectItem>
                      <SelectItem value="1b">1Б класс</SelectItem>
                      <SelectItem value="2a">2А класс</SelectItem>
                      <SelectItem value="2b">2Б класс</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Отделение</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите отделение" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="art">Художественное</SelectItem>
                      <SelectItem value="music">Музыкальное</SelectItem>
                      <SelectItem value="dance">Хореографическое</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Ученик</Label>
                  <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите ученика" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Иванов Иван</SelectItem>
                      <SelectItem value="2">Петрова Мария</SelectItem>
                      <SelectItem value="3">Сидоров Алексей</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Предмет</Label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите предмет" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drawing">Рисунок</SelectItem>
                      <SelectItem value="painting">Живопись</SelectItem>
                      <SelectItem value="composition">Композиция</SelectItem>
                      <SelectItem value="history">История искусств</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Новая оценка</Label>
                <Select value={gradeValue} onValueChange={setGradeValue}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите оценку" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 (Отлично)</SelectItem>
                    <SelectItem value="4">4 (Хорошо)</SelectItem>
                    <SelectItem value="3">3 (Удовлетворительно)</SelectItem>
                    <SelectItem value="2">2 (Неудовлетворительно)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full" onClick={handleEditGrade}>
                <Icon name="Check" size={18} className="mr-2" />
                Изменить оценку
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bells" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Управление расписанием звонков</CardTitle>
              <CardDescription>Настройка времени начала и окончания уроков</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bellSchedule.map((bell) => (
                  <div key={bell.lesson} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-bold text-primary">{bell.lesson}</span>
                      </div>
                      <span className="font-medium">{bell.lesson} урок</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Clock" size={16} />
                        <span>{bell.start} — {bell.end}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Icon name="Pencil" size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
