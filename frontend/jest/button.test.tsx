import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/app/components/misc/Button';
import { ButtonType, ButtonStyle } from '@/enums/ButtonEnum';
import { expect, describe, it } from '@jest/globals';
import * as matchers from '@testing-library/jest-dom/matchers'

describe('Button Component', () => {
    it('renders correctly with required props', () => {
      render(
        <Button
          type={ButtonType.Button}
          id="test-button"
          value="Click Me"
        />
      );
  
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).not.toBeNull();
      expect(button.getAttribute('id')).toBe('test-button');
      expect(button.getAttribute("class")).toContain(
        'md:focus:ring-2 md:focus:outline-none md:focus:ring-blue-300 font-medium rounded-full text-sm w-fit px-5 py-2 text-center border-2 border-primary'
      );
    });
  
    it('applies primary style classes when ButtonStyle.Primary is used', () => {
      render(
        <Button
          type={ButtonType.Button}
          id="primary-button"
          value="Primary Button"
          style={ButtonStyle.Primary}
          customClass="custom-class"
        />
      );
  
      const button = screen.getByRole('button', { name: /primary button/i });
      expect(button.getAttribute("class")).toContain("text-white button-submit custom-class");
    });
  
    it('applies secondary style classes when ButtonStyle.Secondary is used', () => {
      render(
        <Button
          type={ButtonType.Button}
          id="secondary-button"
          value="Secondary Button"
          style={ButtonStyle.Secondary}
        />
      );
  
      const button = screen.getByRole('button', { name: /secondary button/i });
      expect(button.getAttribute("class")).toContain('text-primary background-white button-secondary');
    });
  
    it('handles click events', () => {
      const onClickMock = jest.fn();
      render(
        <Button
          type={ButtonType.Button}
          id="click-button"
          value="Clickable"
          onClick={onClickMock}
        />
      );
  
      const button = screen.getByRole('button', { name: /clickable/i });
      fireEvent.click(button);
  
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });
  
    it('handles submitAction event', () => {
      const submitActionMock = jest.fn();
      render(
        <Button
          type={ButtonType.Submit}
          id="submit-button"
          value="Submit"
          submitAction={submitActionMock}
        />
      );
  
      const button = screen.getByRole('button', { name: /submit/i });
      fireEvent.click(button);
  
      expect(submitActionMock).toHaveBeenCalledTimes(1);
    });
  
    it('renders with custom class', () => {
      render(
        <Button
          type={ButtonType.Button}
          id="custom-class-button"
          value="Custom Class"
          customClass="my-custom-class"
          style={ButtonStyle.Primary}
        />
      );
  
      const button = screen.getByRole('button', { name: /custom class/i });
      expect(button.getAttribute("class")).toContain('my-custom-class');
    });
  });
  