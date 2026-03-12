import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Bell, Home, ShoppingCart, Shirt, Smartphone } from 'lucide-react-native';

import {
  Avatar,
  BottomBar,
  Button,
  CartItem,
  CategoryCard,
  Chip,
  Divider,
  FilterBar,
  IconButton,
  ImageCarousel,
  OrderSummary,
  PriceTag,
  ProductCard,
  PromoCodeInput,
  RangeSlider,
  RatingDisplay,
  ReviewCard,
  SearchBar,
  ShippingTracker,
  StarRating,
  WishlistButton,
} from '@/components/ui';
import { FontSize, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function MarketplaceDemo() {
  const t = useTheme();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [wishlist, setWishlist] = useState(false);
  const [rating, setRating] = useState(4);
  const [qty, setQty] = useState(2);
  const [promo, setPromo] = useState('');

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: Spacing[5], paddingBottom: 100, gap: Spacing[5] }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3] }}>
            <Avatar initials="J" size="md" />
            <View>
              <Text style={{ ...FontSize.sm, color: t.textSecondary }}>Welcome back</Text>
              <Text style={{ ...FontSize.lg, fontWeight: '700', color: t.text }}>Hi, John</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[2] }}>
            <IconButton icon={<Bell size={22} color={t.text} />} onPress={() => {}} />
            <IconButton icon={<ShoppingCart size={22} color={t.text} />} onPress={() => {}} />
          </View>
        </View>

        <SearchBar value={search} onChangeText={setSearch} placeholder="Search products..." />

        <FilterBar
          options={[
            { label: 'All', value: 'all' },
            { label: 'Electronics', value: 'elec' },
            { label: 'Fashion', value: 'fashion' },
            { label: 'Home', value: 'home' },
          ]}
          value={filter}
          onValueChange={setFilter}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: Spacing[3] }}>
          <CategoryCard title="Electronics" subtitle="2.4K items" color={t.primary} icon={<Smartphone size={36} color={t.textOnColor} />} />
          <CategoryCard title="Fashion" subtitle="1.8K items" color={t.purple} icon={<Shirt size={36} color={t.textOnColor} />} />
          <CategoryCard title="Home" subtitle="960 items" color={t.warning} icon={<Home size={36} color={t.textOnColor} />} />
        </ScrollView>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ ...FontSize.lg, fontWeight: '700', color: t.text }}>Featured</Text>
          <Text style={{ ...FontSize.sm, color: t.primary }}>See all</Text>
        </View>
        <ProductCard
          title="Wireless Headphones Pro"
          price={129.99}
          originalPrice={199.99}
          rating={4.8}
          reviewCount={342}
          badge="Sale"
        />
        <ProductCard
          title="Smart Watch Series 5"
          price={249}
          rating={4.6}
          reviewCount={128}
        />

        <RangeSlider
          min={0}
          max={1000}
          low={priceRange[0]}
          high={priceRange[1]}
          onValueChange={(low, high) => setPriceRange([low, high])}
          prefix="$"
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ ...FontSize.lg, fontWeight: '700', color: t.text }}>Deals for You</Text>
          <Text style={{ ...FontSize.sm, color: t.primary }}>See all</Text>
        </View>
        <View style={{ gap: Spacing[3] }}>
          <ImageCarousel images={['placeholder1', 'placeholder2', 'placeholder3']} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <PriceTag amount={129.99} originalAmount={199.99} />
            <WishlistButton active={wishlist} onToggle={setWishlist} variant="pill" count={47} />
          </View>
          <Text style={{ ...FontSize.lg, fontWeight: '700', color: t.text }}>Wireless Headphones Pro</Text>
          <RatingDisplay rating={4.8} reviews={342} variant="badge" />
          <View style={{ flexDirection: 'row', gap: Spacing[1.5] }}>
            <Chip label="Bluetooth 5.3" />
            <Chip label="40h Battery" />
            <Chip label="ANC" />
          </View>
          <StarRating value={rating} onValueChange={setRating} label="Rate this product" />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ ...FontSize.lg, fontWeight: '700', color: t.text }}>Your Cart</Text>
          <Text style={{ ...FontSize.sm, color: t.textSecondary }}>2 items</Text>
        </View>
        <CartItem
          title="Wireless Headphones Pro"
          price={129.99}
          quantity={qty}
          onQuantityChange={setQty}
        />
        <CartItem
          title="Phone Case - Clear"
          price={19.99}
          quantity={1}
          onQuantityChange={() => {}}
        />
        <PromoCodeInput
          onApply={(code) => setPromo(code)}
          appliedCode={promo || undefined}
          discount={promo ? '15% off' : undefined}
        />
        <Divider />
        <OrderSummary
          items={[
            { label: 'Subtotal', value: '$149.98' },
            { label: 'Shipping', value: 'Free' },
            { label: 'Discount', value: '-$22.50' },
          ]}
          total={{ label: 'Total', value: '$127.48' }}
        />

        <Text style={{ ...FontSize.lg, fontWeight: '700', color: t.text }}>Track Order</Text>
        <ShippingTracker
          trackingNumber="1Z999AA10123456784"
          estimatedDelivery="Mar 15, 2026"
          steps={[
            { title: 'Order Placed', time: 'Mar 9', completed: true },
            { title: 'Shipped', time: 'Mar 10', completed: true },
            { title: 'In Transit', time: 'Mar 12', completed: false, current: true },
            { title: 'Delivered', completed: false },
          ]}
        />

        <Text style={{ ...FontSize.lg, fontWeight: '700', color: t.text }}>Reviews</Text>
        <ReviewCard author="Alex M." rating={5} comment="Best headphones I've ever owned. The noise cancellation is incredible!" date="2 days ago" />
        <ReviewCard author="Sarah K." rating={4} comment="Great sound quality. Battery life is amazing." date="1 week ago" />
      </ScrollView>
      <BottomBar>
        <View style={{ flex: 1 }}>
          <Text style={{ ...FontSize.xs, color: t.textSecondary }}>Total</Text>
          <Text style={{ ...FontSize.xl, fontWeight: '800', color: t.text }}>$127.48</Text>
        </View>
        <Button title="Add to Cart" style={{ flex: 1 }} />
      </BottomBar>
    </View>
  );
}
