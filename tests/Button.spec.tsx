// src/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import React from 'react'
import Button from '../src/components/elements/Button'

describe('Button Component', () => {
  test('renders the button with correct text', () => {
    render(<Button type="button">Click Me!</Button>);
    const buttonElement = screen.getByText(/click me!/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders with the correct type attribute', () => {
    render(<Button type="submit">Submit</Button>);
    const buttonElement = screen.getByRole('button', { name: /submit/i });
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });

  test('calls the onClick handler when clicked', () => {
    const handleClick = vi.fn(); // menggunakan vi.fn() dari Vitest untuk membuat fungsi mock
    render(<Button type="button" onClick={handleClick}>Click Me!</Button>);
    
    const buttonElement = screen.getByText(/click me!/i);
    fireEvent.click(buttonElement); // melakukan klik pada button

    expect(handleClick).toHaveBeenCalledTimes(1); // memverifikasi bahwa fungsi dipanggil sekali
  });
});
