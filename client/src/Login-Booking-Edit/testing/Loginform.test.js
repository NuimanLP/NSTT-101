import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '../component/LoginForm';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useNavigate: () => jest.fn(),
}));

describe('LoginForm', () => {
  test('renders LoginForm component', () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );

    expect(screen.getByPlaceholderText(/ชื่อผู้ใช้/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/รหัสผ่าน/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /เข้าสู่ระบบ/i })).toBeInTheDocument();
  });

  
  test('allows entering username and password', () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/ชื่อผู้ใช้/i), {
      target: { value: 'Authen0' },
    });
    fireEvent.change(screen.getByPlaceholderText(/รหัสผ่าน/i), {
      target: { value: '123456' },
    });

    expect(screen.getByPlaceholderText(/ชื่อผู้ใช้/i).value).toBe('Authen0');
    expect(screen.getByPlaceholderText(/รหัสผ่าน/i).value).toBe('123456');
  });

  test('toggles password visibility', () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );

    const passwordInput = screen.getByPlaceholderText(/รหัสผ่าน/i);
    expect(passwordInput).toHaveAttribute('type', 'password');

    const toggleButton = screen.getByRole('button', { name: '' });
    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  test('submits form and handles server response', async () => {
    const mockResponse = { data: { jwt: 'fakeToken', user: { username: 'Authen0', role: { name: 'Login-User' } } } };
    axios.post.mockResolvedValue(mockResponse);

    render(
      <Router>
        <LoginForm />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/ชื่อผู้ใช้/i), {
      target: { value: 'Authen0' },
    });
    fireEvent.change(screen.getByPlaceholderText(/รหัสผ่าน/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /เข้าสู่ระบบ/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  });
});
