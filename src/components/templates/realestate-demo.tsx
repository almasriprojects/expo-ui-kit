import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import {
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
  Separator,
  StatCard,
  WishlistButton,
} from '@/components/ui';
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
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100, gap: 20 }}>
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

        <Separator label="Market Overview" />
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <StatCard title="Avg Price" value="$485K" subtitle="+5.2% YoY" style={{ flex: 1 }} />
          <StatCard title="Listings" value="1,247" subtitle="New this week" style={{ flex: 1 }} />
        </View>

        <Separator label="Price Range" />
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

        <Separator label="Featured Listings" />
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

        <Separator label="Property Detail" />
        <ImageCarousel images={['exterior', 'interior', 'kitchen', 'bedroom']} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
          <Text style={{ fontSize: 24, fontWeight: '800', color: t.text }}>$725,000</Text>
          <WishlistButton active={wishlist} onToggle={setWishlist} />
        </View>
        <Text style={{ fontSize: 18, fontWeight: '600', color: t.text }}>Modern Downtown Condo</Text>
        <Text style={{ fontSize: 14, color: t.textSecondary }}>456 Main St, San Francisco, CA 94102</Text>

        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
          <Chip label="2 Beds" />
          <Chip label="2 Baths" />
          <Chip label="1,200 sqft" />
          <Chip label="Built 2020" />
          <Chip label="Parking" />
          <Chip label="Gym" />
        </View>

        <View style={{ gap: 4, marginTop: 8 }}>
          <InfoRow label="Year Built" value="2020" />
          <InfoRow label="HOA Fee" value="$450/mo" />
          <InfoRow label="Property Tax" value="$8,700/yr" />
          <InfoRow label="Days on Market" value="12 days" />
          <InfoRow label="Status" value="Active" valueColor={t.success} />
        </View>

        <Separator label="Mortgage Calculator" />
        <MortgageSlider
          loanAmount={loanAmount}
          onLoanAmountChange={setLoanAmount}
          loanTerm={loanTerm}
          onLoanTermChange={setLoanTerm}
          interestRate={6.5}
        />

        <Separator label="Location" />
        <MapCard title="456 Main St" address="San Francisco, CA 94102" rating={4.5} />

        <Separator label="Listing Agent" />
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
