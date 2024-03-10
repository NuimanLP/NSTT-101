import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Tour from './Tour';

describe('Tour component', () => {
  test('should render filtered tour items when searching by name', async () => {
    render(<Tour />);
    const searchInput = screen.getByPlaceholderText('ค้นหาทัวร์...');
    fireEvent.change(searchInput, { target: { value: 'ชื่อทัวร์ที่ต้องการค้นหา' } });

    await waitFor(() => {
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    await waitFor(() => {
      const filteredItems = screen.getAllByTestId('tour-item');
      expect(filteredItems.length).toBeGreaterThan(0);
      filteredItems.forEach(item => {
        expect(item).toHaveTextContent('ชื่อทัวร์ที่ต้องการค้นหา');
      });
    });
  });
});
