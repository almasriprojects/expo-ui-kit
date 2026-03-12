import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { ArrowDownLeft, ArrowUpRight, Bell, Car, Film, Plus, ShoppingBag, UtensilsCrossed } from 'lucide-react-native';

import {
  Avatar,
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
  StatCard,
  TransactionItem,
} from '@/components/ui';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function FinanceDemo() {
  const t = useTheme();
  const [amount, setAmount] = useState(0);

  return (
    <ScrollView contentContainerStyle={{ padding: Spacing[5], paddingBottom: Spacing[10], gap: Spacing[5] }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ gap: Spacing[0.5] }}>
          <Text style={{ ...FontSize.sm, color: t.textSecondary }}>Good morning</Text>
          <Text style={{ ...FontSize['2xl'], fontWeight: '700', color: t.text }}>John</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3] }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: Radius.full,
              backgroundColor: t.surface,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Bell size={20} color={t.text} />
          </View>
          <Avatar initials="JD" size="md" />
        </View>
      </View>

      <BalanceCard
        balance="12,847.50"
        trend={{ value: '+$1,240.00 (10.7%)', positive: true }}
        actions={[
          { label: 'Send', icon: <ArrowUpRight size={18} color={t.primaryForeground} />, onPress: () => {} },
          { label: 'Request', icon: <ArrowDownLeft size={18} color={t.primaryForeground} />, onPress: () => {} },
          { label: 'Top Up', icon: <Plus size={18} color={t.primaryForeground} />, onPress: () => {} },
        ]}
      />

      <View style={{ flexDirection: 'row', gap: Spacing[3] }}>
        <StatCard title="Income" value="$8,420" subtitle="+12% vs last month" style={{ flex: 1 }} />
        <StatCard title="Expenses" value="$3,150" subtitle="-5% vs last month" style={{ flex: 1 }} />
      </View>

      <Text style={{ ...FontSize.lg, fontWeight: '700', color: t.text }}>My Cards</Text>
      <BankCardDisplay
        cardNumber="4532 •••• •••• 7891"
        holderName="John Doe"
        expiry="09/28"
        brand="visa"
      />

      <Text style={{ ...FontSize.lg, fontWeight: '700', color: t.text }}>Spending Overview</Text>
      <CircularProgress progress={68} size={100} label="Budget Used" />
      <BudgetProgress
        items={[
          { label: 'Food & Dining', spent: 450, budget: 600, color: t.orange, icon: <UtensilsCrossed size={16} color={t.text} /> },
          { label: 'Transport', spent: 220, budget: 200, color: t.statusLow, icon: <Car size={16} color={t.text} /> },
          { label: 'Shopping', spent: 380, budget: 500, color: t.purple, icon: <ShoppingBag size={16} color={t.text} /> },
          { label: 'Entertainment', spent: 90, budget: 150, color: t.statusDone, icon: <Film size={16} color={t.text} /> },
        ]}
      />

      <Text style={{ ...FontSize.lg, fontWeight: '700', color: t.text }}>Recent Transactions</Text>
      <View style={{ backgroundColor: t.card, borderRadius: Radius.xl, overflow: 'hidden' }}>
        <TransactionItem title="Apple Store" subtitle="Electronics" amount={-249} date="Today" type="debit" />
        <Divider />
        <TransactionItem title="Salary Deposit" subtitle="Income" amount={4200} date="Yesterday" type="credit" />
        <Divider />
        <TransactionItem title="Netflix" subtitle="Subscription" amount={-15.99} date="Mar 7" type="debit" />
        <Divider />
        <TransactionItem title="Uber" subtitle="Transport" amount={-24.5} date="Mar 6" type="debit" />
      </View>

      <Text style={{ ...FontSize.lg, fontWeight: '700', color: t.text }}>Send Money</Text>
      <CurrencyInput
        label="Amount"
        value={amount}
        onValueChange={setAmount}
        currency="USD"
      />
      <Button title="Send $100.00" style={{ marginTop: Spacing[2] }} />

      <Text style={{ ...FontSize.lg, fontWeight: '700', color: t.text }}>Account</Text>
      <View style={{ backgroundColor: t.card, borderRadius: Radius.xl, padding: Spacing[4], gap: Spacing[1] }}>
        <InfoRow label="Account Number" value="•••• 7891" />
        <InfoRow label="Routing" value="021000021" />
        <InfoRow label="Account Type" value="Checking" />
        <InfoRow label="Status" value="Active" valueColor={t.success} />
      </View>

      <Text style={{ ...FontSize.lg, fontWeight: '700', color: t.text }}>Security</Text>
      <View style={{ alignItems: 'center', gap: Spacing[4] }}>
        <PinInput length={4} onComplete={() => {}} secure />
        <BiometricButton label="Authenticate with Face ID" onAuthenticate={() => {}} />
      </View>
    </ScrollView>
  );
}
