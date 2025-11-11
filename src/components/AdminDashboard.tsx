import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Schedule, BellSchedule, Announcement, Grade } from '@/types/journal';

interface AdminDashboardProps {
  schedule: Schedule[];
  bellSchedule: BellSchedule[];
  announcements: Announcement[];
  grades: Grade[];
}

const AdminDashboard = ({ schedule, bellSchedule, announcements, grades }: AdminDashboardProps) => {
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

export default AdminDashboard;
