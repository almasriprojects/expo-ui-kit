import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import {
  BalanceCard,
  BankCardDisplay,
  BiometricButton,
  BudgetProgress,
  Button,
  CircularProgress,
  CurrencyInput,
  Divider,
  InfoRow,
  PinInput,
  Separator,
  StatCard,
  TransactionItem,
} from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';

export function FinanceDemo() {
  const t = useTheme();
  const [amount, setAmount] = useState(0);

  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40, gap: 20 }}>
      <BalanceCard
        balance="12,847.50"
        trend={{ value: '+$1,240.00 (10.7%)', positive: true }}
        actions={[
          { label: 'Send', icon: '↗️', onPress: () => {} },
          { label: 'Request', icon: '↙️', onPress: () => {} },
          { label: 'Top Up', icon: '➕', onPress: () => {} },
        ]}
      />

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <StatCard title="Income" value="$8,420" subtitle="+12% vs last month" style={{ flex: 1 }} />
        <StatCard title="Expenses" value="$3,150" subtitle="-5% vs last month" style={{ flex: 1 }} />
      </View>

      <Separator label="Your Cards" />
      <BankCardDisplay
        cardNumber="4532 •••• •••• 7891"
        holderName="John Doe"
        expiry="09/28"
        brand="visa"
      />

      <Separator label="Spending" />
      <CircularProgress progress={68} size={100} label="Budget Used" />
      <BudgetProgress
        items={[
          { label: 'Food & Dining', spent: 450, budget: 600, color: t.orange, icon: '🍕' },
          { label: 'Transport', spent: 220, budget: 200, color: t.statusLow, icon: '🚗' },
          { label: 'Shopping', spent: 380, budget: 500, color: t.purple, icon: '🛍️' },
          { label: 'Entertainment', spent: 90, budget: 150, color: t.statusDone, icon: '🎬' },
        ]}
      />

      <Separator label="Recent Transactions" />
      <TransactionItem title="Apple Store" subtitle="Electronics" amount={-249} date="Today" type="debit" />
      <Divider />
      <TransactionItem title="Salary Deposit" subtitle="Income" amount={4200} date="Yesterday" type="credit" />
      <Divider />
      <TransactionItem title="Netflix" subtitle="Subscription" amount={-15.99} date="Mar 7" type="debit" />
      <Divider />
      <TransactionItem title="Uber" subtitle="Transport" amount={-24.5} date="Mar 6" type="debit" />

      <Separator label="Send Money" />
      <CurrencyInput
        label="Amount"
        value={amount}
        onValueChange={setAmount}
        currency="USD"
      />
      <Button title="Send $100.00" style={{ marginTop: 8 }} />

      <Separator label="Account Summary" />
      <View style={{ gap: 4 }}>
        <InfoRow label="Account Number" value="•••• 7891" />
        <InfoRow label="Routing" value="021000021" />
        <InfoRow label="Account Type" value="Checking" />
        <InfoRow label="Status" value="Active" valueColor={t.success} />
      </View>

      <Separator label="Security" />
      <View style={{ alignItems: 'center', gap: 16 }}>
        <PinInput length={4} onComplete={() => {}} secure />
        <BiometricButton label="Authenticate with Face ID" onAuthenticate={() => {}} />
      </View>
    </ScrollView>
  );
}
