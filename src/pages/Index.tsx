import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';

const mockUsers = [
  { id: 1, name: 'Александр Иванов', email: 'alex@example.com', role: 'Админ', status: 'active', lastLogin: '2 часа назад' },
  { id: 2, name: 'Мария Петрова', email: 'maria@example.com', role: 'Модератор', status: 'active', lastLogin: '1 день назад' },
  { id: 3, name: 'Дмитрий Сидоров', email: 'dmitry@example.com', role: 'Пользователь', status: 'blocked', lastLogin: '3 дня назад' },
  { id: 4, name: 'Елена Козлова', email: 'elena@example.com', role: 'Пользователь', status: 'active', lastLogin: '5 часов назад' },
];

const StatCard = ({ title, value, change, icon }: { title: string; value: string; change: string; icon: string }) => (
  <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-300">{title}</CardTitle>
      <Icon name={icon as any} size={20} className="text-blue-400" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-white">{value}</div>
      <p className="text-xs text-green-400">{change} от прошлого месяца</p>
    </CardContent>
  </Card>
);

const AnalyticsChart = () => (
  <div className="h-64 bg-gray-800 border border-gray-700 rounded-lg p-6 flex items-end justify-between space-x-2">
    {[65, 45, 78, 52, 90, 67, 43, 88, 91, 76, 54, 82].map((height, index) => (
      <div
        key={index}
        className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm transition-all duration-300 hover:from-blue-500 hover:to-blue-300 cursor-pointer"
        style={{ height: `${height}%`, minWidth: '20px' }}
        title={`День ${index + 1}: ${height}%`}
      />
    ))}
  </div>
);

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="flex">
        <div className="w-64 bg-gray-800 border-r border-gray-700 min-h-screen p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Icon name="Layout" size={16} className="text-white" />
            </div>
            <h1 className="text-xl font-bold">Админ Панель</h1>
          </div>
          
          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: 'Главная', icon: 'Home' },
              { id: 'users', label: 'Пользователи', icon: 'Users' },
              { id: 'analytics', label: 'Аналитика', icon: 'BarChart3' },
              { id: 'settings', label: 'Настройки', icon: 'Settings' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === item.id 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon name={item.icon as any} size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="dashboard" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Дашборд</h2>
                <Badge variant="outline" className="text-green-400 border-green-400">
                  Онлайн
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Всего пользователей" value="2,847" change="+12%" icon="Users" />
                <StatCard title="Активные сессии" value="1,234" change="+8%" icon="Activity" />
                <StatCard title="Доходы" value="₽156,789" change="+23%" icon="DollarSign" />
                <StatCard title="Конверсия" value="12.5%" change="+2.1%" icon="TrendingUp" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Аналитика за месяц</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AnalyticsChart />
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Последняя активность</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { user: 'Мария П.', action: 'Создала новый проект', time: '2 мин назад' },
                      { user: 'Алексей И.', action: 'Обновил профиль', time: '15 мин назад' },
                      { user: 'Елена К.', action: 'Загрузила файлы', time: '1 час назад' },
                      { user: 'Дмитрий С.', action: 'Изменил настройки', time: '3 часа назад' },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-750 rounded-lg">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm text-white">
                            <span className="font-medium">{activity.user}</span> {activity.action}
                          </p>
                          <p className="text-xs text-gray-400">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Управление пользователями</h2>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить пользователя
                </Button>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-sm">
                  <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Поиск пользователей..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700">
                        <TableHead className="text-gray-300">Имя</TableHead>
                        <TableHead className="text-gray-300">Email</TableHead>
                        <TableHead className="text-gray-300">Роль</TableHead>
                        <TableHead className="text-gray-300">Статус</TableHead>
                        <TableHead className="text-gray-300">Последний вход</TableHead>
                        <TableHead className="text-gray-300">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id} className="border-gray-700 hover:bg-gray-750">
                          <TableCell className="text-white font-medium">{user.name}</TableCell>
                          <TableCell className="text-gray-300">{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === 'Админ' ? 'default' : 'secondary'}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={user.status === 'active' ? 'default' : 'destructive'}
                              className={user.status === 'active' ? 'bg-green-600' : 'bg-red-600'}
                            >
                              {user.status === 'active' ? 'Активен' : 'Заблокирован'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-300">{user.lastLogin}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                                <Icon name="Edit" size={14} />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                                <Icon name="Trash2" size={14} />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300">
                                <Icon name="Lock" size={14} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <h2 className="text-3xl font-bold">Аналитика</h2>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Подробная аналитика</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalyticsChart />
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-750 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400">87%</div>
                      <div className="text-sm text-gray-300">Удержание пользователей</div>
                    </div>
                    <div className="text-center p-4 bg-gray-750 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">2.4x</div>
                      <div className="text-sm text-gray-300">Рост трафика</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <h2 className="text-3xl font-bold">Настройки</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Общие настройки</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">Название сайта</label>
                      <Input defaultValue="Моя админ панель" className="bg-gray-700 border-gray-600 text-white" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">Email администратора</label>
                      <Input defaultValue="admin@example.com" className="bg-gray-700 border-gray-600 text-white" />
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Сохранить изменения
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Безопасность</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Двухфакторная аутентификация</span>
                      <Badge className="bg-green-600">Включена</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Автоматический выход</span>
                      <Badge variant="outline">30 мин</Badge>
                    </div>
                    <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                      <Icon name="Shield" size={16} className="mr-2" />
                      Настроить безопасность
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
};

export default Index;