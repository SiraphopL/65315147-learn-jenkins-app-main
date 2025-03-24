import { render, screen } from '@testing-library/react';
import App from './App';

test('renders greeting message', () => {
  render(<App />);
  const greetingElement = screen.getByText(/👩‍🎓 นิสิต: Siraphop L./i);
  expect(greetingElement).toBeInTheDocument();
});