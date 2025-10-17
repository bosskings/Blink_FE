import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');

const HomeScreen = () => {
  const [activeTab, setActiveTab] = React.useState('forYou');
  const [viewMode, setViewMode] = React.useState('list');
  const [filterVisible, setFilterVisible] = React.useState(false);
  const slideAnim = React.useRef(new Animated.Value(height)).current;

  const products = [
    {
      id: '1',
      title: 'Road Bicycle',
      price: '₦45,000',
      description: 'Great condition, perfect for city rides. Includes helmet and lock',
      distance: '0.3km away',
      timePosted: '2h ago',
      image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&h=600&fit=crop',
      tag: 'SALE',
      forYou: true
    },
    {
      id: '2',
      title: 'Laptop Stand',
      price: '₦12,500',
      description: 'Adjustable aluminum laptop stand, barely used',
      distance: '0.5km away',
      timePosted: '5h ago',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop',
      tag: 'RENT',
      forYou: false
    },
    {
      id: '3',
      title: 'Office Chair',
      price: '₦35,000',
      description: 'Ergonomic office chair with lumbar support',
      distance: '1.2km away',
      timePosted: '1d ago',
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&h=600&fit=crop',
      tag: 'SERVICE',
      forYou: true
    }
  ];

  const communities = [
    {
      id: '1',
      name: 'Downtown',
      members: '2.3k',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop'
    },
    {
      id: '2',
      name: 'Riverside',
      members: '1.0k',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
    },
    {
      id: '3',
      name: 'Uptown',
      members: '1.5k',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop'
    }
  ];

  const openFilter = () => {
    setFilterVisible(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 65,
      friction: 11
    }).start();
  };

  const closeFilter = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 250,
      useNativeDriver: true
    }).start(() => setFilterVisible(false));
  };

  const FilterBottomSheet = () => (
    <Modal
      visible={filterVisible}
      transparent
      animationType="none"
      onRequestClose={closeFilter}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <TouchableOpacity 
          style={{ flex: 1 }} 
          activeOpacity={1} 
          onPress={closeFilter}
        />
        <Animated.View 
          style={{
            transform: [{ translateY: slideAnim }],
            backgroundColor: 'white',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingTop: 8,
            maxHeight: height * 0.85
          }}
        >
          {/* Handle Bar */}
          <View style={{ alignItems: 'center', paddingVertical: 12 }}>
            <View style={{ width: 40, height: 4, backgroundColor: '#D1D5DB', borderRadius: 2 }} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ padding: 20 }}>
              {/* Header */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#111827' }}>Filters</Text>
                <TouchableOpacity onPress={closeFilter}>
                  <Ionicons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>

              {/* Category */}
              <View style={{ marginBottom: 24 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12, color: '#111827' }}>Category</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {['All', 'Electronics', 'Furniture', 'Clothing', 'Books', 'Sports'].map((cat) => (
                    <TouchableOpacity
                      key={cat}
                      style={{
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 20,
                        backgroundColor: cat === 'All' ? '#2563EB' : '#F3F4F6',
                        borderWidth: 1,
                        borderColor: cat === 'All' ? '#2563EB' : '#E5E7EB'
                      }}
                    >
                      <Text style={{ color: cat === 'All' ? '#FFFFFF' : '#374151', fontWeight: '500' }}>
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Price Range */}
              <View style={{ marginBottom: 24 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12, color: '#111827' }}>Price Range</Text>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <View style={{ flex: 1, backgroundColor: '#F9FAFB', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#E5E7EB' }}>
                    <Text style={{ fontSize: 12, color: '#6B7280', marginBottom: 4 }}>Min</Text>
                    <TextInput
                      placeholder="₦0"
                      placeholderTextColor="#9CA3AF"
                      style={{ fontSize: 16, color: '#111827' }}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={{ flex: 1, backgroundColor: '#F9FAFB', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#E5E7EB' }}>
                    <Text style={{ fontSize: 12, color: '#6B7280', marginBottom: 4 }}>Max</Text>
                    <TextInput
                      placeholder="₦100,000"
                      placeholderTextColor="#9CA3AF"
                      style={{ fontSize: 16, color: '#111827' }}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>

              {/* Distance */}
              <View style={{ marginBottom: 24 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12, color: '#111827' }}>Distance</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {['1km', '5km', '10km', '25km', '50km'].map((dist) => (
                    <TouchableOpacity
                      key={dist}
                      style={{
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 20,
                        backgroundColor: dist === '5km' ? '#2563EB' : '#F3F4F6',
                        borderWidth: 1,
                        borderColor: dist === '5km' ? '#2563EB' : '#E5E7EB'
                      }}
                    >
                      <Text style={{ color: dist === '5km' ? '#FFFFFF' : '#374151', fontWeight: '500' }}>
                        {dist}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Condition */}
              <View style={{ marginBottom: 24 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12, color: '#111827' }}>Condition</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {['New', 'Like New', 'Good', 'Fair'].map((cond) => (
                    <TouchableOpacity
                      key={cond}
                      style={{
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 20,
                        backgroundColor: '#F3F4F6',
                        borderWidth: 1,
                        borderColor: '#E5E7EB'
                      }}
                    >
                      <Text style={{ color: '#374151', fontWeight: '500' }}>{cond}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Buttons */}
              <View style={{ flexDirection: 'row', gap: 12, paddingTop: 8 }}>
                <TouchableOpacity
                  onPress={closeFilter}
                  style={{
                    flex: 1,
                    paddingVertical: 14,
                    borderRadius: 12,
                    backgroundColor: '#F3F4F6',
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ color: '#374151', fontWeight: '600', fontSize: 16 }}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={closeFilter}
                  style={{
                    flex: 1,
                    paddingVertical: 14,
                    borderRadius: 12,
                    backgroundColor: '#2563EB',
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 16 }}>Apply Filters</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );

  const renderHeader = () => (
    <View>
      <View className="flex-row border-b border-gray-200">
        <TouchableOpacity 
          className={`flex-1 py-3 ${activeTab === 'forYou' ? 'border-b-2 border-[#0066CC]' : ''}`}
          onPress={() => setActiveTab('forYou')}
        >
          <Text style={{fontFamily: 'HankenGrotesk_500Medium'}} className={`text-center text-sm ${activeTab === 'forYou' ? 'text-[#0066CC]' : 'text-gray-500'}`}>
            For You
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`flex-1 text-sm py-3 ${activeTab === 'requests' ? 'border-b-2 border-[#0066CC]' : ''}`}
          onPress={() => setActiveTab('requests')}
        >
          <Text style={{fontFamily: 'HankenGrotesk_500Medium'}} className={`text-center ${activeTab === 'requests' ? 'text-[#0066CC] font-semibold' : 'text-gray-500'}`}>
            Requests
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`flex-1 py-3 ${activeTab === 'discussions' ? 'border-b-2 border-[#0066CC]' : ''}`}
          onPress={() => setActiveTab('discussions')}
        >
          <Text style={{fontFamily: 'HankenGrotesk_500Medium'}} className={`text-center text-sm ${activeTab === 'discussions' ? 'text-[#0066CC] font-semibold' : 'text-gray-500'}`}>
            Discussions
          </Text>
        </TouchableOpacity>
      </View>

      {/* View Toggle and Explore */}
      <View className="px-4 py-3 pt-6 flex-row items-center justify-between">
        <TouchableOpacity className="flex-row items-center">
          <Ionicons name="people-outline" size={16} color="#9CA3AF" />
          <Text className="text-gray-400  text-sm ml-1" style={{fontFamily: 'HankenGrotesk_500Medium'}}>Following</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#0066CC] px-4 py-2 rounded flex-row items-center">
          <Ionicons name="eye-outline" size={18} color="#fff" />
          <Text className="text-white text-sm ml-2 font-semibold" style={{fontFamily: 'HankenGrotesk_500Medium'}}>Explore</Text>
        </TouchableOpacity>
      </View>

      {/* Urgent Priority Card */}
      <View className="mb-4 mx-2 mt-8 rounded-xl p-4 bg-gray-50 border border-gray-200">
        <View className="flex-row items-center mb-2">
          <View className="w-1 h-4 bg-red-600 rounded mr-2" />
          <Text className="text-red-600 text-xs font-bold uppercase" style={{fontFamily: 'HankenGrotesk_500Medium'}}>Urgent Priority</Text>
        </View>
        <Text className="font-bold text-lg mb-1" style={{fontFamily: 'HankenGrotesk_700Bold'}}>
          Looking for: An umbrella
        </Text>
        <Text className="text-gray-600 text-sm mb-3" style={{fontFamily: 'HankenGrotesk_400Regular'}}>I need an umbrella ASAP!</Text>
        <View className="flex-row items-center mb-3">
          <Ionicons name="time-outline" size={14} color="#6B7280" />
          <Text className="text-xs text-gray-500 ml-1 mr-4" style={{fontFamily: 'HankenGrotesk_400Regular'}}>Posted 3 mins ago</Text>
          <Ionicons name="chatbubble-outline" size={14} color="#6B7280" />
          <Text className="text-xs text-gray-500 ml-1" style={{fontFamily: 'HankenGrotesk_400Regular'}}>3 responses</Text>
        </View>
        <View className="bg-gray-50 rounded-lg p-2 flex-row items-center justify-between">
          <View className="flex-row items-center">
              <View className="w-10 h-10 bg-orange-400 rounded-full object-fit overflow-hidden items-center justify-center mr-2">
              <Image source={require('../../../assets/avatars/avatar3.png')} className='object-contain w-full h-full'/>
            </View>
            <View>
              <Text className="font-semibold text-sm" style={{fontFamily: 'HankenGrotesk_400Regular'}}>Anna Montana</Text>
              <Text className="text-xs text-gray-500" style={{fontFamily: 'HankenGrotesk_400Regular'}}>0.2km away</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Ionicons name="chatbubble-outline" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Suggested Communities */}
      <View className="px-4 mb-4 pt-6">
        <Text className="font-bold text-lg mb-3" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
          Suggested Communities
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {communities.map((community) => (
            <View key={community.id} className="mr-3 bg-white rounded shadow mb-5">
              <Image
                source={{ uri: community.image }}
                className="w-32 h-20 rounded-t mb-1"
              />

              <View className='flex-row items-center justify-between px-2 pb-2'>
                <Text style={{fontFamily: 'HankenGrotesk_500Medium'}} className="font-semibold text-xs">{community.name}</Text>
                <Text style={{fontFamily: 'HankenGrotesk_400Regular'}} className="text-xs text-gray-500">{community.members}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );

  const renderProduct = ({ item }: any) => (
    <View className="mb-4 bg-white rounded-xl border border-gray-200 overflow-hidden">
      <View className="relative">
        {item.tag === 'SALE' && (
          <View className="absolute top-3 left-3 bg-[#0066CC] px-3 py-2 rounded-full z-10">
            <Text className="text-white text-xs font-bold" >{item.tag}</Text>
          </View>
        )}

        {item.tag === 'SERVICE' && (
          <View className="absolute top-3 left-3 bg-[#800080] px-3 py-2 rounded-full z-10">
            <Text className="text-white text-xs font-bold" >{item.tag}</Text>
          </View>
        )}

        {item.tag === 'FREE' && (
          <View className="absolute top-3 left-3 bg-[#00AA44] px-3 py-2 rounded-full z-10">
            <Text className="text-white text-xs font-bold" >{item.tag}</Text>
          </View>
        )}

        {item.tag === 'RENT' && (
          <View className="absolute top-3 left-3 bg-[#F9B917] px-3 py-2 rounded-full z-10">
            <Text className="text-white text-xs font-bold" >{item.tag}</Text>
          </View>
        )}
        
        <Image
          source={{ uri: item.image }}
          className="w-full h-48"
          resizeMode="cover"
        />
      </View>
      <View className="p-4">
        <View className="flex-row justify-between items-start mb-2">
          <Text className="font-bold text-lg flex-1">
            {item.title}
          </Text>
          <Text className="text-[#0066CC] font-bold text-lg">{item.price}</Text>
        </View>
        <Text className="text-gray-600 text-sm mb-3">{item.description}</Text>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={14} color="#6B7280" />
            <Text className="text-xs text-gray-500 ml-1 mr-3">{item.distance}</Text>
            <Ionicons name="time-outline" size={14} color="#6B7280" />
            <Text className="text-xs text-gray-500 ml-1">{item.timePosted}</Text>
          </View>
          <TouchableOpacity className="bg-[#0066CC] px-4 py-2 rounded-lg">
            <Text className="text-white text-sm font-semibold">View Item</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white px-6 pt-4">
      <StatusBar style='dark'/>
      
      {/* Fixed Header */}
      <View className="bg-white border-b border-gray-100">
        <View className="flex-row items-center justify-between py-3">
          <View className="flex-row items-center">
            <View className="w-14 h-14 bg-orange-400 rounded-full object-fit overflow-hidden items-center justify-center mr-3">
              <Image source={require('../../../assets/avatars/avatar1.png')} className='object-contain w-full h-full'/>
            </View>
            <View>
              <Text className="font-bold text-gray-900 text-base" style={{fontFamily: 'HankenGrotesk_600SemiBold'}}>
                Lasman Ade
              </Text>
              <Text className="text-sm text-orange-700" style={{fontFamily: 'HankenGrotesk_500Medium'}}>Bronze</Text>
            </View>
          </View>
          <View className="relative rounded-full bg-gray-100 p-2 flex items-center justify-center">
            <Ionicons name="notifications" size={24} color="#374151" />
            <View className="absolute top-1 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </View>
        </View>

        {/* Search and Filter */}
        <View className="py-2 flex-row">
          <View className="flex-1 bg-gray-100 rounded-lg px-4 py-2 mr-2">
            <TextInput
              placeholder="Search items and communities..."
              placeholderTextColor="#9CA3AF"
              className="text-sm"
            />
          </View>
          <TouchableOpacity 
            className="bg-gray-100 rounded-lg px-4 py-2 flex-row items-center"
            onPress={openFilter}
          >
            <Ionicons name="filter" size={15} color="#374151" />
            <Text className="ml-2 text-sm font-medium" style={{fontFamily: 'HankenGrotesk_500Medium'}}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Content */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
      />
      
      {/* Filter Modal */}
      <FilterBottomSheet />
      
      {/* Floating Action Button */}
      <TouchableOpacity className="absolute bottom-32 right-6 border-4 border-white bg-[#0066CC] w-16 h-16 rounded-full items-center justify-center shadow-lg">
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default HomeScreen;