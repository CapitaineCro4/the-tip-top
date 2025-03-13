import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import Hero from '../Hero';
import { heroContent } from '@/content/heroContent';

// Mock the AuthForm component
jest.mock('../Auth/AuthForm', () => ({
  AuthForm: jest.fn(({ isOpen, onClose }) =>
    isOpen ? (
      <div data-testid="mock-auth-form" onClick={onClose}>
        Mock Auth Form
      </div>
    ) : null
  ),
}));

describe('Hero Component', () => {
  const mockImageSrc = '/test-image.jpg';

  beforeEach(() => {
    render(<Hero imageSrc={mockImageSrc} />);
  });

  it('renders the hero content correctly', () => {
    // Test titre
    expect(screen.getByText(heroContent.title)).toBeInTheDocument();

    // Test sous-titre
    expect(screen.getByText(heroContent.subtitle)).toBeInTheDocument();

    // Test description
    expect(screen.getByText(heroContent.description)).toBeInTheDocument();

    // Test texte du bouton
    expect(screen.getByText(heroContent.buttonText)).toBeInTheDocument();

    // Test dates du concours
    expect(screen.getByText(heroContent.contestDates)).toBeInTheDocument();
  });

  it('renders the image with correct attributes', () => {
    const image = screen.getByAltText(heroContent.alt);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
  });

  it('opens auth form when participate button is clicked', () => {

    expect(screen.queryByTestId('mock-auth-form')).not.toBeInTheDocument();

    const participateButton = screen.getByText(heroContent.buttonText);
    fireEvent.click(participateButton);

    expect(screen.getByTestId('mock-auth-form')).toBeInTheDocument();
  });

  it('closes auth form when clicking on it', () => {
    const participateButton = screen.getByText(heroContent.buttonText);
    fireEvent.click(participateButton);

    const authForm = screen.getByTestId('mock-auth-form');
    expect(authForm).toBeInTheDocument();

    fireEvent.click(authForm);
    
    expect(screen.queryByTestId('mock-auth-form')).not.toBeInTheDocument();
  });
});
