import { render, screen } from '@testing-library/react';
import App from './App';

test('renders greeting message', () => {
  render(<App />);
  const greetingElement = screen.getByText(/สวัสดีครับ ผมชื่อสิรภพ/i);
  expect(greetingElement).toBeInTheDocument();
});