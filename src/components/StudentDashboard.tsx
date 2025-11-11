import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { Grade, Schedule, BellSchedule, Announcement } from '@/types/journal';

interface StudentDashboardProps {
  grades: Grade[];
  schedule: Schedule[];
  bellSchedule: BellSchedule[];
  announcements: Announcement[];
}

const StudentDashboard = ({ grades, schedule, bellSchedule, announcements }: StudentDashboardProps) => {
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

export default StudentDashboard;
