import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import {
  BookingCard,
  Button,
  CalendarStrip,
  Card,
  Divider,
  EventCard,
  FilterBar,
  GuestSelector,
  ImageCarousel,
  InfoRow,
  MapCard,
  OrderSummary,
  RatingDisplay,
  ReviewCard,
  RoomCard,
  SearchBar,
  Separator,
} from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';

export function BookingDemo() {
  const t = useTheme();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [calDate, setCalDate] = useState(new Date());
  const [guests, setGuests] = useState([
    { label: 'Adults', sublabel: 'Ages 13+', count: 2, min: 1, max: 8 },
    { label: 'Children', sublabel: 'Ages 2-12', count: 1, min: 0, max: 6 },
    { label: 'Infants', sublabel: 'Under 2', count: 0, min: 0, max: 4 },
  ]);

  const handleGuestChange = (index: number, count: number) => {
    setGuests((prev) => prev.map((g, i) => (i === index ? { ...g, count } : g)));
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40, gap: 20 }}>
      <SearchBar value={search} onChangeText={setSearch} placeholder="Where are you going?" />

      <FilterBar
        options={[
          { label: 'All', value: 'all' },
          { label: 'Hotels', value: 'hotels' },
          { label: 'Apartments', value: 'apt' },
          { label: 'Villas', value: 'villas' },
        ]}
        value={filter}
        onValueChange={setFilter}
      />

      <Separator label="Select Dates" />
      <CalendarStrip
        selectedDate={calDate}
        onDateSelect={setCalDate}
        markedDates={['2026-03-12', '2026-03-15']}
      />

      <Separator label="Guests" />
      <Card>
        <GuestSelector guests={guests} onChange={handleGuestChange} />
      </Card>

      <Separator label="Featured Listings" />
      <RoomCard
        title="Luxury Ocean View Suite"
        host="Maria"
        price="$189"
        rating={4.9}
        reviewCount={128}
        guests={4}
        beds={2}
        baths={1}
        amenities={['WiFi', 'Pool', 'Kitchen', 'Parking']}
        superhost
      />
      <RoomCard
        title="Cozy Mountain Cabin"
        host="James"
        price="$125"
        rating={4.7}
        reviewCount={86}
        guests={6}
        beds={3}
        baths={2}
        amenities={['Fireplace', 'Hot Tub', 'WiFi']}
      />

      <Separator label="Listing Detail" />
      <ImageCarousel images={['room1', 'room2', 'room3']} />
      <Text style={{ fontSize: 20, fontWeight: '700', color: t.text, marginTop: 8 }}>
        Luxury Ocean View Suite
      </Text>
      <RatingDisplay rating={4.9} reviews={128} variant="badge" />
      <View style={{ gap: 4, marginTop: 8 }}>
        <InfoRow label="Check-in" value="Mar 14, 2026 — 3:00 PM" />
        <InfoRow label="Check-out" value="Mar 18, 2026 — 11:00 AM" />
        <InfoRow label="Guests" value="2 adults, 1 child" />
        <InfoRow label="Policy" value="Free cancellation" valueColor={t.success} />
      </View>

      <Divider />
      <OrderSummary
        items={[
          { label: '$189 x 4 nights', value: '$756.00' },
          { label: 'Cleaning fee', value: '$45.00' },
          { label: 'Service fee', value: '$38.50' },
        ]}
        total={{ label: 'Total', value: '$839.50' }}
      />
      <Button title="Reserve — $839.50" />

      <Separator label="Events Nearby" />
      <EventCard
        title="Wine Tasting Experience"
        date="Mar 15"
        time="6:00 PM"
        location="Vineyard Estate"
        attendees={24}
        color={t.purple}
        onRSVP={() => {}}
        rsvpStatus="going"
      />

      <Separator label="Location" />
      <MapCard title="Luxury Ocean View Suite" address="123 Beachfront Drive, Malibu, CA" rating={4.9} />

      <Separator label="Your Bookings" />
      <BookingCard
        title="Mountain Retreat"
        date="Mar 20"
        time="3:00 PM"
        location="Aspen, CO"
        status="confirmed"
        price="$500.00"
      />

      <Separator label="Reviews" />
      <ReviewCard author="Emma S." rating={5} comment="Absolutely stunning views! Maria was an incredible host." date="Last week" />
    </ScrollView>
  );
}
