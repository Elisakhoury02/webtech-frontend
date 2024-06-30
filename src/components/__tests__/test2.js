// tests/unit/store/actions.spec.js
import axios from 'axios';
import { actions } from '@/store/actions';
import { mutations } from '@/store/mutations'; // Ensure the path is correct

jest.mock('axios');

describe('actions', () => {
    it('fetches todos', async () => {
        const commit = jest.fn();
        const todos = [{ id: 1, name: 'Task 1', completed: false }];
        axios.get.mockResolvedValue({ data: todos });

        await actions.fetchToDos({ commit });

        expect(commit).toHaveBeenCalledWith('SET_TODOS', todos);
    });
});
