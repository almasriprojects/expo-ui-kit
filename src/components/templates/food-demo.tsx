import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import {
  BottomBar,
  Button,
  CartItem,
  CategoryCard,
  Divider,
  FilterBar,
  MapCard,
  MenuItemCard,
  OrderSummary,
  PromoCodeInput,
  RestaurantCard,
  ReviewCard,
  SearchBar,
  Separator,
  ShippingTracker,
} from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';

export function FoodDemo() {
  const t = useTheme();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [promo, setPromo] = useState('');

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100, gap: 20 }}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search food, restaurants..." />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
          <CategoryCard title="Pizza" subtitle="28 places" color={t.error} icon="🍕" />
          <CategoryCard title="Sushi" subtitle="15 places" color={t.primary} icon="🍣" />
          <CategoryCard title="Burger" subtitle="32 places" color={t.warning} icon="🍔" />
          <CategoryCard title="Coffee" subtitle="45 places" color={t.purple} icon="☕" />
        </ScrollView>

        <FilterBar
          options={[
            { label: 'All', value: 'all' },
            { label: 'Fastest', value: 'fast' },
            { label: 'Top Rated', value: 'rated' },
            { label: 'Free Delivery', value: 'free' },
          ]}
          value={filter}
          onValueChange={setFilter}
        />

        <Separator label="Near You" />
        <RestaurantCard
          name="Sakura Japanese Kitchen"
          cuisine="Japanese · Sushi · Asian"
          rating={4.8}
          reviewCount={342}
          deliveryTime="25-35 min"
          deliveryFee="$2.99"
          promo="20% OFF"
        />
        <RestaurantCard
          name="Bella Italia"
          cuisine="Italian · Pizza · Pasta"
          rating={4.6}
          reviewCount={218}
          deliveryTime="30-45 min"
          deliveryFee="Free"
        />

        <Separator label="Menu — Sakura Kitchen" />
        <MenuItemCard
          name="Dragon Roll"
          description="Shrimp tempura, avocado, eel, spicy mayo, tobiko"
          price="$16.99"
          popular
          onAdd={() => {}}
        />
        <MenuItemCard
          name="Vegetable Tempura"
          description="Assorted seasonal vegetables, tentsuyu dipping sauce"
          price="$12.99"
          originalPrice="$15.99"
          calories="380"
          vegetarian
          onAdd={() => {}}
        />
        <MenuItemCard
          name="Spicy Tuna Bowl"
          description="Fresh tuna, sriracha, sesame, pickled ginger over sushi rice"
          price="$18.99"
          calories="520"
          spicy
          onAdd={() => {}}
        />

        <Separator label="Your Cart" />
        <CartItem title="Dragon Roll x2" price={33.98} quantity={2} onQuantityChange={() => {}} />
        <CartItem title="Miso Soup" price={4.99} quantity={1} onQuantityChange={() => {}} />
        <PromoCodeInput onApply={(c) => setPromo(c)} appliedCode={promo || undefined} discount={promo ? 'Free delivery' : undefined} />
        <Divider />
        <OrderSummary
          items={[
            { label: 'Subtotal', value: '$38.97' },
            { label: 'Delivery Fee', value: '$2.99' },
            { label: 'Service Fee', value: '$1.50' },
          ]}
          total={{ label: 'Total', value: '$43.46' }}
        />

        <Separator label="Delivery" />
        <MapCard title="Sakura Japanese Kitchen" address="456 Oak Avenue" rating={4.8} />

        <Separator label="Delivery Status" />
        <ShippingTracker
          estimatedDelivery="25-35 min"
          steps={[
            { title: 'Order Confirmed', time: '3:15 PM', completed: true },
            { title: 'Preparing', description: 'Restaurant is making your food', time: '3:18 PM', completed: true },
            { title: 'Picked Up', description: 'Driver has your order', completed: false, current: true },
            { title: 'Delivered', completed: false },
          ]}
        />

        <Separator label="Reviews" />
        <ReviewCard author="John D." rating={5} comment="Best sushi in town! Always fresh and on time." date="Yesterday" />
      </ScrollView>
      <BottomBar>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 11, color: t.textSecondary }}>2 items · $43.46</Text>
          <Text style={{ fontSize: 17, fontWeight: '800', color: t.text }}>Place Order</Text>
        </View>
        <Button title="Checkout →" style={{ flex: 1 }} />
      </BottomBar>
    </View>
  );
}
