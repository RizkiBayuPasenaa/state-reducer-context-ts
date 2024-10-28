// src/components/Input.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../src/components/elements/Input'
import { describe, it, expect, vi } from 'vitest';

describe('Input component', () => {
  it('renders input with correct type and placeholder', () => {
    render(
      <Input 
        type="text" 
        placeholder="Enter text" 
        name="username" 
        value="" 
        onChange={() => {}} 
      />
    );

    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveAttribute('name', 'username');
  });

  it('calls onChange handler when input value changes', () => {
    const handleChange = vi.fn(); // Mock fungsi onChange
    render(
      <Input 
        type="text" 
        placeholder="Enter text" 
        name="username" 
        value="" 
        onChange={handleChange} 
      />
    );

    const inputElement = screen.getByPlaceholderText('Enter text');

    // Simulasikan perubahan nilai input
    fireEvent.change(inputElement, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
