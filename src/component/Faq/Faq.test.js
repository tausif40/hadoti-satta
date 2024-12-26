import React from 'react';
import { render, screen } from '@testing-library/react';
import Faq from './Faq';

describe('Faq Component', () => {
    it('renders without crashing', () => {
        render(<Faq />);
        expect(screen.getByText(/faq/i)).toBeInTheDocument();
    });
    
    it('displays the correct number of questions', () => {
        render(<Faq />);
        const questions = screen.getAllByRole('heading');
        expect(questions.length).toBeGreaterThan(0);
    });
});