import { render, screen } from '@testing-library/react';
import App from './App';

test('renders greeting message', () => {
  render(<App />);
  const greetingElement = screen.getByText(/👩‍🎓 นิสิต: 65315147 นายสิรภพ เล็กเลิศสุนทร/i);
  expect(greetingElement).toBeInTheDocument();
});