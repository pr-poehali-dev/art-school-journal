import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Grade } from '@/types/journal';

interface TeacherDashboardProps {
  grades: Grade[];
}

const TeacherDashboard = ({ grades }: TeacherDashboardProps) => {
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

export default TeacherDashboard;
