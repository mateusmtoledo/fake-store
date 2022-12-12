import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from '../Modal';
import ReactDOM from 'react-dom';

describe('Modal', () => {
  beforeEach(() => {
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element;
    });
  });

  it('renders children', () => {
    render(
      <Modal>
        <div>this is a child div</div>
      </Modal>,
    );
    expect(screen.getByText('this is a child div')).toBeInTheDocument();
  });

  it('sets body overflow property to hidden when mounted', () => {
    document.body.style.setProperty = jest.fn();
    render(<Modal />);
    expect(document.body.style.setProperty).toBeCalledWith(
      'overflow',
      'hidden',
    );
  });

  it('removes body overflow property when unmounted', () => {
    document.body.style.removeProperty = jest.fn();
    const { unmount } = render(<Modal />);
    unmount();
    expect(document.body.style.removeProperty).toBeCalledWith('overflow');
  });
});
