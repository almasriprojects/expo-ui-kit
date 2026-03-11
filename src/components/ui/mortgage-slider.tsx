import React from 'react';
import { Text, View, type ViewStyle } from 'react-native';

import { FontSize, Radius, Shadows } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Slider } from './slider';

export type MortgageSliderProps = {
  /** Current loan amount in dollars */
  loanAmount: number;
  /** Callback invoked when the loan amount slider changes */
  onLoanAmountChange: (value: number) => void;
  /** Current loan term in years */
  loanTerm: number;
  /** Callback invoked when the loan term slider changes */
  onLoanTermChange: (value: number) => void;
  /** Annual interest rate as a percentage */
  interestRate: number;
  /** Maximum allowable loan amount */
  maxLoan?: number;
  /** Custom styles applied to the calculator container */
  style?: ViewStyle;
};

export function MortgageSlider({
  loanAmount,
  onLoanAmountChange,
  loanTerm,
  onLoanTermChange,
  interestRate,
  maxLoan = 1000000,
  style,
}: MortgageSliderProps) {
  const t = useTheme();

  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;
  const monthly =
    monthlyRate > 0
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : loanAmount / numPayments;
  const totalPaid = monthly * numPayments;
  const totalInterest = totalPaid - loanAmount;

  return (
    <View
      style={[
        {
          backgroundColor: t.card,
          borderRadius: Radius.xl,
          padding: 20,
          borderWidth: 1,
          borderColor: t.border,
          ...Shadows.sm,
        },
        style,
      ]}>
      <Text style={{ fontSize: FontSize.lg.fontSize, fontWeight: '700', color: t.text, marginBottom: 20 }}>
        Mortgage Calculator
      </Text>

      <View style={{ marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>Loan Amount</Text>
          <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '700', color: t.text }}>
            ${loanAmount.toLocaleString()}
          </Text>
        </View>
        <Slider
          value={loanAmount}
          onValueChange={onLoanAmountChange}
          min={10000}
          max={maxLoan}
          step={5000}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>Loan Term</Text>
          <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '700', color: t.text }}>{loanTerm} years</Text>
        </View>
        <Slider
          value={loanTerm}
          onValueChange={onLoanTermChange}
          min={5}
          max={30}
          step={5}
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
        <Text style={{ fontSize: FontSize.sm.fontSize, color: t.textSecondary }}>Interest Rate</Text>
        <Text style={{ fontSize: FontSize.md.fontSize, fontWeight: '600', color: t.text }}>{interestRate}%</Text>
      </View>

      <View
        style={{
          backgroundColor: t.primarySoft,
          borderRadius: Radius.xl,
          padding: 16,
          marginTop: 16,
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: FontSize.sm.fontSize, color: t.primary, fontWeight: '500' }}>Monthly Payment</Text>
        <Text style={{ fontSize: FontSize['3xl'].fontSize, fontWeight: '800', color: t.primary, marginTop: 4 }}>
          ${Math.round(monthly).toLocaleString()}
        </Text>
        <View style={{ flexDirection: 'row', gap: 20, marginTop: 10 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: FontSize.xs.fontSize, color: t.textSecondary }}>Total Paid</Text>
            <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '600', color: t.text }}>
              ${Math.round(totalPaid).toLocaleString()}
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: FontSize.xs.fontSize, color: t.textSecondary }}>Total Interest</Text>
            <Text style={{ fontSize: FontSize.sm.fontSize, fontWeight: '600', color: t.error }}>
              ${Math.round(totalInterest).toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
