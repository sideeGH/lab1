import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { TaskPriority } from '../types/task';

const PRIORITIES: { value: TaskPriority; label: string }[] = [
  { value: 'low', label: 'Низкий' },
  { value: 'medium', label: 'Средний' },
  { value: 'high', label: 'Высокий' },
];

interface Props {
  onAdd: (title: string, subject: string, priority: TaskPriority) => void;
}

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (title.trim() === '' || subject.trim() === '') {
      setError('Заполните название и предмет');
      return;
    }
    onAdd(title.trim(), subject.trim(), priority);
    // очищаем форму
    setTitle('');
    setSubject('');
    setPriority('medium');
    setError('');
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Название задачи"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Предмет"
        value={subject}
        onChangeText={setSubject}
      />

      <View style={styles.priorities}>
        {PRIORITIES.map((p) => (
          <Pressable
            key={p.value}
            style={[styles.priorityBtn, priority === p.value && styles.priorityActive]}
            onPress={() => setPriority(p.value)}
          >
            <Text style={priority === p.value ? styles.activeText : undefined}>
              {p.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <Pressable style={styles.addBtn} onPress={handleAdd}>
        <Text style={styles.addText}>Добавить</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  priorities: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 },
  priorityBtn: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  priorityActive: { backgroundColor: '#1565c0', borderColor: '#1565c0' },
  activeText: { color: '#fff' },
  error: { color: '#c62828', marginBottom: 8 },
  addBtn: {
    backgroundColor: '#1565c0',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  addText: { color: '#fff', fontWeight: 'bold' },
});
