import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { MapPin } from 'lucide-react-native';

import {
  Avatar,
  BottomBar,
  Button,
  Card,
  Chip,
  ContactCard,
  FilterBar,
  ImageCarousel,
  InfoRow,
  MapCard,
  MortgageSlider,
  PropertyCard,
  RangeSlider,
  SearchBar,
  StatCard,
  WishlistButton,
} from '@/components/ui';
import { FontSize, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function RealEstateDemo() {
  const t = useTheme();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('buy');
  const [priceRange, setPriceRange] = useState<[number, number]>([200000, 800000]);
  const [loanAmount, setLoanAmount] = useState(400000);
  const [loanTerm, setLoanTerm] = useState(30);
  const [wishlist, setWishlist] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: Spacing[5], paddingBottom: 100, gap: Spacing[5] }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[2] }}>
            <MapPin size={20} color={t.primary} />
            <View>
              <Text style={{ ...FontSize['2xl'], fontWeight: '700', color: t.text }}>San Francisco, CA</Text>
              <Text style={{ ...FontSize.sm, color: t.textSecondary }}>Explore properties near you</Text>
            </View>
          </View>
          <Avatar initials="JS" size="sm" />
        </View>

        <SearchBar value={search} onChangeText={setSearch} placeholder="Search by city, zip, address..." />

        <FilterBar
          options={[
            { label: 'Buy', value: 'buy' },
            { label: 'Rent', value: 'rent' },
            { label: 'Sold', value: 'sold' },
          ]}
          value={filter}
          onValueChange={setFilter}
        />

        <View style={{ flexDirection: 'row', gap: Spacing[2.5] }}>
          <StatCard title="Avg Price" value="$485K" subtitle="+5.2% YoY" style={{ flex: 1 }} />
          <StatCard title="Listings" value="1,247" subtitle="New this week" style={{ flex: 1 }} />
        </View>

        <Card>
          <RangeSlider
            min={100000}
            max={2000000}
            low={priceRange[0]}
            high={priceRange[1]}
            onValueChange={(low, high) => setPriceRange([low, high])}
            prefix="$"
          />
        </Card>

        <Text style={{ ...FontSize.xl, fontWeight: '700', color: t.text }}>Featured Listings</Text>
        <PropertyCard
          title="Modern Downtown Condo"
          address="456 Main St, San Francisco, CA"
          price="$725,000"
          beds={2}
          baths={2}
          sqft="1,200"
          type="Condo"
          featured
          onFavorite={() => setWishlist(!wishlist)}
          favorited={wishlist}
        />
        <PropertyCard
          title="Charming Victorian Home"
          address="789 Oak Ave, Oakland, CA"
          price="$980,000"
          beds={4}
          baths={3}
          sqft="2,400"
          type="House"
          onFavorite={() => {}}
        />
        <PropertyCard
          title="Luxury Penthouse"
          address="100 Skyline Blvd, SF, CA"
          price="$2,500"
          priceUnit="mo"
          beds={1}
          baths={1}
          sqft="850"
          type="Rental"
          onFavorite={() => {}}
        />

        <ImageCarousel images={['exterior', 'interior', 'kitchen', 'bedroom']} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Spacing[2] }}>
          <Text style={{ ...FontSize['2xl'], fontWeight: '800', color: t.text }}>$725,000</Text>
          <WishlistButton active={wishlist} onToggle={setWishlist} />
        </View>
        <Text style={{ ...FontSize.lg, fontWeight: '600', color: t.text }}>Modern Downtown Condo</Text>
        <Text style={{ ...FontSize.sm, color: t.textSecondary }}>456 Main St, San Francisco, CA 94102</Text>

        <View style={{ flexDirection: 'row', gap: Spacing[2], flexWrap: 'wrap', marginTop: Spacing[2] }}>
          <Chip label="2 Beds" />
          <Chip label="2 Baths" />
          <Chip label="1,200 sqft" />
          <Chip label="Built 2020" />
          <Chip label="Parking" />
          <Chip label="Gym" />
        </View>

        <View style={{ gap: Spacing[1], marginTop: Spacing[2] }}>
          <InfoRow label="Year Built" value="2020" />
          <InfoRow label="HOA Fee" value="$450/mo" />
          <InfoRow label="Property Tax" value="$8,700/yr" />
          <InfoRow label="Days on Market" value="12 days" />
          <InfoRow label="Status" value="Active" valueColor={t.success} />
        </View>

        <Text style={{ ...FontSize.xl, fontWeight: '700', color: t.text }}>Mortgage Calculator</Text>
        <MortgageSlider
          loanAmount={loanAmount}
          onLoanAmountChange={setLoanAmount}
          loanTerm={loanTerm}
          onLoanTermChange={setLoanTerm}
          interestRate={6.5}
        />

        <MapCard title="456 Main St" address="San Francisco, CA 94102" rating={4.5} />

        <Text style={{ ...FontSize.xl, fontWeight: '700', color: t.text }}>Listing Agent</Text>
        <ContactCard
          name="Jennifer Smith"
          role="Senior Real Estate Agent"
          phone="+1 (555) 987-6543"
          email="jennifer@realty.com"
          onCall={() => {}}
          onMessage={() => {}}
          onEmail={() => {}}
        />
      </ScrollView>
      <BottomBar>
        <Button title="Schedule Tour" variant="outline" style={{ flex: 1 }} />
        <Button title="Make Offer" style={{ flex: 1 }} />
      </BottomBar>
    </View>
  );
}
