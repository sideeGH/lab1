import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Task } from '../types/task';

const PRIORITY_LABELS = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
};

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onToggle, onDelete }: Props) {
  return (
    <View style={[styles.card, task.isCompleted && styles.cardDone]}>
      <Text style={[styles.title, task.isCompleted && styles.titleDone]}>
        {task.title}
      </Text>
      <Text style={styles.text}>Предмет: {task.subject}</Text>
      <Text style={styles.text}>Приоритет: {PRIORITY_LABELS[task.priority]}</Text>
      <Text style={styles.text}>
        Статус: {task.isCompleted ? 'Выполнена' : 'Не выполнена'}
      </Text>

      <View style={styles.buttons}>
        <Pressable style={styles.btn} onPress={() => onToggle(task.id)}>
          <Text style={styles.btnText}>
            {task.isCompleted ? 'Вернуть' : 'Выполнить'}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.btn, styles.btnDelete]}
          onPress={() => onDelete(task.id)}
        >
          <Text style={styles.btnText}>Удалить</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  cardDone: { opacity: 0.5 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  titleDone: { textDecorationLine: 'line-through' },
  text: { fontSize: 14, color: '#444' },
  buttons: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  btn: {
    backgroundColor: '#2e7d32',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
    marginTop: 4,
  },
  btnDelete: { backgroundColor: '#c62828' },
  btnText: { color: '#fff', fontWeight: '600' },
});
