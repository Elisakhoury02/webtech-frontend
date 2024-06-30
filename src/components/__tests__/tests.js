// tests/unit/ToDoList.spec.js
import { shallowMount } from '@vue/test-utils';
import ToDoList from '@/components/ToDoList.vue';

describe('ToDoList.vue', () => {
    it('renders to-do list', () => {
        const todos = [
            { id: 1, name: 'Task 1', completed: false },
            { id: 2, name: 'Task 2', completed: true }
        ];
        const wrapper = shallowMount(ToDoList, {
            propsData: { todos }
        });
        expect(wrapper.findAll('.todo-item').length).toBe(todos.length);
    });
});