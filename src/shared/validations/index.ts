export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export class Validator {
  public static validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  public static validatePassword(password: string): boolean {
    return password.length >= 8;
  }

  public static validateLoginForm(email: string, password: string): ValidationResult {
    const errors: Record<string, string> = {};
    if (!Validator.validateEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!Validator.validatePassword(password)) {
      errors.password = 'Password must be at least 8 characters';
    }
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
