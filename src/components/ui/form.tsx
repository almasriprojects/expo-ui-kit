import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Text, View, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

type ValidationRule = {
  required?: boolean | string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  custom?: (value: string) => string | undefined;
};

type FormErrors = Record<string, string | undefined>;
type FormValues = Record<string, string>;

type FormContextType = {
  values: FormValues;
  errors: FormErrors;
  setValue: (field: string, value: string) => void;
  getError: (field: string) => string | undefined;
  validate: () => boolean;
  register: (field: string, rules: ValidationRule) => void;
};

const FormContext = createContext<FormContextType | null>(null);

export function useForm() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useForm must be used within a Form');
  return ctx;
}

type FormProps = {
  children: ReactNode;
  onSubmit: (values: FormValues) => void;
  style?: ViewStyle;
};

export function Form({ children, onSubmit, style }: FormProps) {
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [rules, setRules] = useState<Record<string, ValidationRule>>({});

  const register = useCallback((field: string, fieldRules: ValidationRule) => {
    setRules((prev) => ({ ...prev, [field]: fieldRules }));
  }, []);

  const setValue = useCallback((field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const getError = useCallback((field: string) => errors[field], [errors]);

  const validateField = useCallback(
    (field: string, value: string): string | undefined => {
      const r = rules[field];
      if (!r) return undefined;
      if (r.required && !value?.trim()) {
        return typeof r.required === 'string' ? r.required : 'This field is required';
      }
      if (r.minLength && value.length < r.minLength.value) return r.minLength.message;
      if (r.maxLength && value.length > r.maxLength.value) return r.maxLength.message;
      if (r.pattern && !r.pattern.value.test(value)) return r.pattern.message;
      if (r.custom) return r.custom(value);
      return undefined;
    },
    [rules],
  );

  const validate = useCallback(() => {
    const newErrors: FormErrors = {};
    let valid = true;
    for (const field of Object.keys(rules)) {
      const error = validateField(field, values[field] ?? '');
      if (error) {
        newErrors[field] = error;
        valid = false;
      }
    }
    setErrors(newErrors);
    return valid;
  }, [rules, values, validateField]);

  return (
    <FormContext.Provider value={{ values, errors, setValue, getError, validate, register }}>
      <View style={style}>{children}</View>
    </FormContext.Provider>
  );
}

type FormFieldProps = {
  name: string;
  label?: string;
  rules?: ValidationRule;
  children: (props: {
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
  }) => ReactNode;
};

export function FormField({ name, label, rules: fieldRules, children }: FormFieldProps) {
  const t = useTheme();
  const form = useForm();
  const fieldRulesRef = useRef(fieldRules);
  fieldRulesRef.current = fieldRules;

  useEffect(() => {
    if (fieldRulesRef.current) form.register(name, fieldRulesRef.current);
  }, [name, form]);

  return (
    <View style={{ gap: 6 }}>
      {label && (
        <Text style={{ fontSize: 14, fontWeight: '600', color: t.text }}>{label}</Text>
      )}
      {children({
        value: form.values[name] ?? '',
        onChangeText: (text) => form.setValue(name, text),
        error: form.getError(name),
      })}
      {form.getError(name) && (
        <Text style={{ fontSize: 12, color: t.error, fontWeight: '500' }}>
          {form.getError(name)}
        </Text>
      )}
    </View>
  );
}
