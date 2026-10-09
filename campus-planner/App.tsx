import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import TaskCard from './src/components/TaskCard';
import TaskForm from './src/components/TaskForm';
import { Task, TaskPriority } from './src/types/task';

type Filter = 'all' | 'active' | 'done';

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'done', label: 'Выполненные' },
];

const initialTasks: Task[] = [
  { id: '1', title: 'Сделать лабу по React Native', subject: 'Мобильная разработка', priority: 'high', isCompleted: false },
  { id: '2', title: 'Решить задачи по матрицам', subject: 'Математика', priority: 'medium', isCompleted: true },
  { id: '3', title: 'Прочитать главу 4', subject: 'История', priority: 'low', isCompleted: false },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');

  const totalCount = tasks.length;
  const completedCount = tasks.filter((task) => task.isCompleted).length;

  const visibleTasks = tasks.filter((task) =>
    filter === 'all' ? true : filter === 'done' ? task.isCompleted : !task.isCompleted
  );

  const addTask = (title: string, subject: string, priority: TaskPriority) => {
    const newTask: Task = {
      id: String(Date.now()),
      title,
      subject,
      priority,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Campus Planner</Text>
        <Text style={styles.stats}>
          Всего задач: {totalCount} | Выполнено: {completedCount}
        </Text>

        <Pressable style={styles.toggleBtn} onPress={() => setShowForm(!showForm)}>
          <Text style={styles.toggleText}>
            {showForm ? 'Скрыть форму' : '+ Добавить задачу'}
          </Text>
        </Pressable>

        {showForm && <TaskForm onAdd={addTask} />}

        <View style={styles.filters}>
          {FILTERS.map((f) => (
            <Pressable
              key={f.value}
              style={[styles.filterBtn, filter === f.value && styles.filterActive]}
              onPress={() => setFilter(f.value)}
            >
              <Text style={filter === f.value ? styles.filterActiveText : undefined}>
                {f.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <FlatList
          data={visibleTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskCard task={item} onToggle={toggleTask} onDelete={deleteTask} />
          )}
          ListEmptyComponent={<Text style={styles.empty}>Список пока пуст</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  content: { flex: 1, padding: 16, paddingTop: 40 },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 4 },
  stats: { fontSize: 14, color: '#555', marginBottom: 12 },
  toggleBtn: {
    backgroundColor: '#1565c0',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  toggleText: { color: '#fff', fontWeight: 'bold' },
  filters: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 },
  filterBtn: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  filterActive: { backgroundColor: '#1565c0', borderColor: '#1565c0' },
  filterActiveText: { color: '#fff' },
  empty: { textAlign: 'center', color: '#888', marginTop: 24, fontSize: 16 },
});
