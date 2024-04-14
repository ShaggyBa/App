import authReducer, { setCredentials, login, logout, setOpenSidebar } from '../state/features/authSlice';

// Mock localStorage
const localStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	removeItem: jest.fn(),
};
//@ts-ignore
global.localStorage = localStorageMock;


describe('Auth Reducer', () => {
	it('should handle setting credentials', () => {
		const user = {
			_id: '123',
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'password123',
			projects: [],
			profileImage: '',
			country: 'USA',
			company: 'Example Inc.'
		};
		const action = { type: 'auth/setCredentials', payload: user };

		const newState = authReducer(undefined, action);

		expect(newState.user).toEqual(user);
		expect(localStorage.setItem).toHaveBeenCalledWith('userInfo', JSON.stringify(user));
	});

	it('should handle user login', () => {
		const user = {
			_id: '123',
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'password123',
			projects: [],
			profileImage: '',
			country: 'USA',
			company: 'Example Inc.'
		};
		const action = { type: 'auth/login', payload: user };

		const newState = authReducer(undefined, action);

		expect(newState.user).toEqual(user);
	});

	it('should handle user logout', () => {
		const action = { type: 'auth/logout' };

		const newState = authReducer(undefined, action);

		expect(newState.user).toBeNull();
		expect(localStorage.removeItem).toHaveBeenCalledWith('userInfo');
	});

	it('should handle opening the sidebar', () => {
		const action = { type: 'auth/setOpenSidebar', payload: true };

		const newState = authReducer(undefined, action);

		expect(newState.isSidebarOpen).toBe(true);
	});
});