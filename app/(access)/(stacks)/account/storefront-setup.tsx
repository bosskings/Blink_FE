import { SolidMainButton, SolidGrayButton } from "@/components/Btns";
import { Headers } from "@/components/Headers";
import { useCreateStorefront, useStorefront, useUpdateStorefront } from "@/services";
import { db } from "@/services/staged/db";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown, LinearTransition } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const DRAFT_KEY = "storefront_draft";
const TOTAL_STEPS = 7;

const CATEGORIES = ["Fashion", "Electronics", "Books", "Home & Garden", "Sports", "Health & Beauty", "Food", "Other"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const PAYMENT_METHODS = ["Cash", "Bank Transfer", "Card", "USSD"];

export default function StorefrontSetup() {
  const { data: existingStore } = useStorefront();
  const createStorefront = useCreateStorefront();
  const updateStorefront = useUpdateStorefront();

  const [step, setStep] = useState(1);
  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [logoUri, setLogoUri] = useState<string | null>(null);
  const [bannerUri, setBannerUri] = useState<string | null>(null);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [operatingDays, setOperatingDays] = useState<string[]>(["Mon", "Tue", "Wed", "Thu", "Fri"]);
  const [openTime, setOpenTime] = useState("09:00");
  const [closeTime, setCloseTime] = useState("18:00");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [shippingInfo, setShippingInfo] = useState("");
  const [paymentMethods, setPaymentMethods] = useState<string[]>(["Cash", "Bank Transfer"]);
  const [storePhotos, setStorePhotos] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);

  // Load draft on mount
  useEffect(() => {
    (async () => {
      const draft = await db.get<any>(DRAFT_KEY);
      if (draft) {
        setStep(draft.step || 1);
        setStoreName(draft.storeName || "");
        setStoreDescription(draft.storeDescription || "");
        setLogoUri(draft.logoUri || null);
        setBannerUri(draft.bannerUri || null);
        setCategory(draft.category || "");
        setTags(draft.tags || "");
        setContactEmail(draft.contactEmail || "");
        setContactPhone(draft.contactPhone || "");
        setInstagram(draft.instagram || "");
        setTwitter(draft.twitter || "");
        setWhatsapp(draft.whatsapp || "");
        setAddress(draft.address || "");
        setOperatingDays(draft.operatingDays || ["Mon", "Tue", "Wed", "Thu", "Fri"]);
        setOpenTime(draft.openTime || "09:00");
        setCloseTime(draft.closeTime || "18:00");
        setReturnPolicy(draft.returnPolicy || "");
        setShippingInfo(draft.shippingInfo || "");
        setPaymentMethods(draft.paymentMethods || ["Cash", "Bank Transfer"]);
        setStorePhotos(draft.storePhotos || []);
      }
    })();
  }, []);

  const persistDraft = useCallback(async () => {
    await db.set(DRAFT_KEY, {
      step, storeName, storeDescription, logoUri, bannerUri, category, tags,
      contactEmail, contactPhone, instagram, twitter, whatsapp, address,
      operatingDays, openTime, closeTime, returnPolicy, shippingInfo,
      paymentMethods, storePhotos,
    });
  }, [step, storeName, storeDescription, logoUri, bannerUri, category, tags,
      contactEmail, contactPhone, instagram, twitter, whatsapp, address,
      operatingDays, openTime, closeTime, returnPolicy, shippingInfo,
      paymentMethods, storePhotos]);

  const handleNext = useCallback(async () => {
    await persistDraft();
    if (step < TOTAL_STEPS) setStep(step + 1);
  }, [step, persistDraft]);

  const handlePrev = useCallback(() => {
    if (step > 1) setStep(step - 1);
    else router.back();
  }, [step]);

  const handlePublish = useCallback(async () => {
    const data = {
      storeName, storeDescription, logoUri, bannerUri, category,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      contactEmail, contactPhone, instagram, twitter, whatsapp, address,
      operatingDays, openTime, closeTime, returnPolicy, shippingInfo,
      paymentMethods, storePhotos,
    };
    if (existingStore) {
      await updateStorefront.mutateAsync(data);
    } else {
      await createStorefront.mutateAsync(data);
    }
    await db.remove(DRAFT_KEY);
    router.back();
  }, [storeName, storeDescription, logoUri, bannerUri, category, tags,
      contactEmail, contactPhone, instagram, twitter, whatsapp, address,
      operatingDays, openTime, closeTime, returnPolicy, shippingInfo,
      paymentMethods, storePhotos, existingStore]);

  const pickImage = async (setter: (uri: string) => void) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 0.8 });
      if (!result.canceled && result.assets?.[0]?.uri) setter(result.assets[0].uri);
    }
  };

  const toggleDay = (day: string) => {
    setOperatingDays((prev) => prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]);
  };

  const togglePayment = (method: string) => {
    setPaymentMethods((prev) => prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]);
  };

  const renderStepIndicator = () => (
    <View>
      <Text className="text-[13px] text-gray-400 mb-2" style={{ fontFamily: "HankenGrotesk_700Bold" }}>
        Step {step} of {TOTAL_STEPS}
      </Text>
      <View className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden mb-6">
        <View className="h-full bg-black rounded-full" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
      </View>
      <Text className="text-[17px] font-bold text-gray-900 mb-1" style={{ fontFamily: "HankenGrotesk_700Bold" }}>
        {["Let's personalize your Storefront", "Pick your category", "How customers reach you", "Set your hours & location", "Set your policies", "Show off your space", "Review & Publish"][step - 1]}
      </Text>
      <Text className="text-[13px] text-gray-500 mb-6" style={{ fontFamily: "HankenGrotesk_500Medium" }}>
        {["Your store name, logo, and description.",
          "Choose a category and add tags so buyers can find you.",
          "Email, phone, and social links so customers can reach you.",
          "Let customers know when you're open and where you're located.",
          "Returns, shipping, and payment methods.",
          "Add a banner and photos of your store or products.",
          "Review everything before publishing."][step - 1]}
      </Text>
      <View className="w-full h-[1px] bg-gray-100 mb-8" />
    </View>
  );

  const renderStep1 = () => (
    <View>
      <View className="mb-8">
        <Text className="text-[13px] font-bold text-gray-900 mb-1" style={{ fontFamily: "HankenGrotesk_700Bold" }}>Store Name *</Text>
        <TextInput value={storeName} onChangeText={setStoreName} placeholder="ex: La-Cruz" placeholderTextColor="#9CA3AF"
          className="w-full h-12 px-4 bg-[#F8F9FA] rounded-xl text-[15px] text-gray-900" style={{ fontFamily: "HankenGrotesk_500Medium" }} />
      </View>
      <View className="mb-8">
        <Text className="text-[13px] font-bold text-gray-900 mb-1" style={{ fontFamily: "HankenGrotesk_700Bold" }}>Store Logo</Text>
        <TouchableOpacity onPress={() => pickImage(setLogoUri)}
          className="w-full h-40 bg-[#F8F9FA] rounded-2xl border border-dashed border-gray-300 items-center justify-center" style={{ gap: 8 }}>
          {logoUri ? <Image source={{ uri: logoUri }} className="w-32 h-32 rounded-2xl" resizeMode="cover" />
            : <><View className="w-10 h-10 rounded-full bg-[#0066CC] items-center justify-center mb-2"><Feather name="plus" size={20} color="white" /></View>
              <Text className="text-[13px] font-bold text-gray-900" style={{ fontFamily: "HankenGrotesk_700Bold" }}>Upload your logo</Text>
              <Text className="text-[11px] text-gray-500" style={{ fontFamily: "HankenGrotesk_500Medium" }}>Tap to take a photo or choose from gallery</Text></>}
        </TouchableOpacity>
      </View>
      <View className="mb-8">
        <Text className="text-[13px] font-bold text-gray-900 mb-1" style={{ fontFamily: "HankenGrotesk_700Bold" }}>Store Description</Text>
        <TextInput value={storeDescription} onChangeText={setStoreDescription} multiline numberOfLines={6} maxLength={500}
          className="w-full p-4 bg-[#F8F9FA] rounded-2xl text-[15px] text-gray-900" style={{ minHeight: 120, textAlignVertical: "top", fontFamily: "HankenGrotesk_500Medium" }} />
        <Text className="text-[11px] text-gray-400 text-right mt-2" style={{ fontFamily: "HankenGrotesk_500Medium" }}>{storeDescription.length}/500</Text>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View>
      <Text className="text-[13px] font-bold text-gray-900 mb-3" style={{ fontFamily: "HankenGrotesk_700Bold" }}>Category *</Text>
      <View className="flex-row flex-wrap gap-3 mb-8">
        {CATEGORIES.map((cat) => (
          <TouchableOpacity key={cat} onPress={() => setCategory(cat)}
            className={`px-5 py-3 rounded-xl border ${category === cat ? "border-[#0066CC] bg-blue-50" : "border-gray-200 bg-white"}`}>
            <Text className={`text-[13px] ${category === cat ? "text-[#0066CC]" : "text-gray-700"}`} style={{ fontFamily: "HankenGrotesk_500Medium" }}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text className="text-[13px] font-bold text-gray-900 mb-2" style={{ fontFamily: "HankenGrotesk_700Bold" }}>Tags</Text>
      <Text className="text-[12px] text-gray-500 mb-2" style={{ fontFamily: "HankenGrotesk_500Medium" }}>Comma-separated keywords (e.g., vintage, handmade, tech)</Text>
      <TextInput value={tags} onChangeText={setTags} placeholder="ex: vintage, handmade, tech" placeholderTextColor="#9CA3AF"
        className="w-full h-12 px-4 bg-[#F8F9FA] rounded-xl text-[15px] text-gray-900" style={{ fontFamily: "HankenGrotesk_500Medium" }} />
    </View>
  );

  const renderStep3 = () => (
    <View style={{ gap: 20 }}>
      <View>
        <Text className="text-[13px] font-bold text-gray-900 mb-1" style={{ fontFamily: "HankenGrotesk_700Bold" }}>Contact Email *</Text>
        <TextInput value={contactEmail} onChangeText={setContactEmail} placeholder="store@example.com" keyboardType="email-address" placeholderTextColor="#9CA3AF"
          className="w-full h-12 px-4 bg-[#F8F9FA] rounded-xl text-[15px] text-gray-900" style={{ fontFamily: "HankenGrotesk_500Medium" }} />
      </View>
      <View>
        <Text className="text-[13px] font-bold text-gray-900 mb-1" style={{ fontFamily: "HankenGrotesk_700Bold" }}>Phone Number *</Text>
        <TextInput value={contactPhone} onChangeText={setContactPhone} placeholder="+234 800 000 0000" keyboardType="phone-pad" placeholderTextColor="#9CA3AF"
          className="w-full h-12 px-4 bg-[#F8F9FA] rounded-xl text-[15px] text-gray-900" style={{ fontFamily: "HankenGrotesk_500Medium" }} />
      </View>
      <View className="w-full h-[1px] bg-gray-100" />
      <Text className="text-[15px] font-bold text-gray-900" style={{ fontFamily: "HankenGrotesk_700Bold" }}>Social Links (Optional)</Text>
      <View style={{ gap: 12 }}>
        <View className="flex-row items-center bg-[#F8F9FA] rounded-xl px-4">
          <Ionicons name="logo-instagram" size={20} color="#E4405F" />
          <TextInput value={instagram} onChangeText={setInstagram} placeholder="Instagram username" placeholderTextColor="#9CA3AF"
            className="flex-1 h-12 ml-3 text-[15px] text-gray-900" style={{ fontFamily: "HankenGrotesk_500Medium" }} />
        </View>
        <View className="flex-row items-center bg-[#F8F9FA] rounded-xl px-4">
          <Ionicons name="logo-twitter" size={20} color="#1DA1F2" />
          <TextInput value={twitter} onChangeText={setTwitter} placeholder="Twitter handle" placeholderTextColor="#9CA3AF"
            className="flex-1 h-12 ml-3 text-[15px] text-gray-900" style={{ fontFamily: "HankenGrotesk_500Medium" }} />
        </View>
        <View className="flex-row items-center bg-[#F8F9FA] rounded-xl px-4">
          <Ionicons name="logo-whatsapp" size={20} color="#25D366" />
          <TextInput value={whatsapp} onChangeText={setWhatsapp} placeholder="WhatsApp number" placeholderTextColor="#9CA3AF"
            className="flex-1 h-12 ml-3 text-[15px] text-gray-900" style={{ fontFamily: "HankenGrotesk_500Medium" }} />
        </View>
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={{ gap: 20 }}>
      <View>
        <Text className="text-[13px] font-bold text-gray-900 mb-1" style={{ fontFamily: "HankenGrotesk_700Bold" }}>Operating Days</Text>
        <Text className="text-[12px] text-gray-500 mb-3" style={{ fontFamily: "HankenGrotesk_500Medium" }}>Select the days your store is open.</Text>
        <View className="flex-row flex-wrap gap-2">
          {DAYS.map((day) => (
            <TouchableOpacity key={day} onPress={() => toggleDay(day)}
              className={`px-4 py-2 rounded-xl border ${operatingDays.includes(day) ? "bg-[#0066CC] border-[#0066CC]" : "bg-white border-gray-200"}`}>
              <Text className={`text-[13px] ${operatingDays.includes(day) ? "text-white" : "text-gray-700"}`} style={{ fontFamily: "HankenGrotesk_600SemiBold" }}>{day}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View className="flex-row gap-4">
        <View className="flex-1">
          <Text className="text-[13px] font-bold text-gray-900 mb-1" style={{ fontFamily: "HankenGrotesk_700Bold" }}>Open Time</Text>
          <TextInput value={openTime} onChangeText={setOpenTime} placeholder="09:00" placeholderTextColor="#9CA3AF"
            className="w-full h-12 px-4 bg-[#F8F9FA] rounded-xl text-[15px] text-gray-900" style={{ fontFamily: "HankenGrotesk_500Medium" }} />
        </View>
        <View className="flex-1">
          <Text className="text-[13px] font-bold text-gray-900 mb-1" style={{ fontFamily: "HankenGrotesk_700Bold" }}>Close Time</Text>
          <TextInput value={closeTime} onChangeText={setCloseTime} placeholder="18:00" placeholderTextColor="#9CA3AF"
            className="w-full h-12 px-4 bg-[#F8F9FA] rounded-xl text-[15px] text-gray-900" style={{ fontFamily: "HankenGrotesk_500Medium" }} />
        </View>
      </View>
      <View>
        <Text className="text-[13px] font-bold text-gray-900 mb-1" style={{ fontFamily: "HankenGrotesk_700Bold" }}>Store Address</Text>
        <TextInput value={address} onChangeText={setAddress} placeholder="123 Main Street, City" placeholderTextColor="#9CA3AF"
          className="w-full h-12 px-4 bg-[#F8F9FA] rounded-xl text-[15px] text-gray-900" style={{ fontFamily: "HankenGrotesk_500Medium" }} />
      </View>
    </View>
  );

  const renderStep5 = () => (
    <View style={{ gap: 20 }}>
      <View>
        <Text className="text-[13px] font-bold text-gray-900 mb-1" style={{ fontFamily: "HankenGrotesk_700Bold" }}>Return Policy</Text>
        <TextInput value={returnPolicy} onChangeText={setReturnPolicy} multiline numberOfLines={4} maxLength={500}
          placeholder="Describe your return/exchange policy" placeholderTextColor="#9CA3AF"
          className="w-full p-4 bg-[#F8F9FA] rounded-2xl text-[15px] text-gray-900" style={{ minHeight: 100, textAlignVertical: "top", fontFamily: "HankenGrotesk_500Medium" }} />
      </View>
      <View>
        <Text className="text-[13px] font-bold text-gray-900 mb-1" style={{ fontFamily: "HankenGrotesk_700Bold" }}>Shipping Info</Text>
        <TextInput value={shippingInfo} onChangeText={setShippingInfo} multiline numberOfLines={4} maxLength={500}
          placeholder="How do you deliver or ship items?" placeholderTextColor="#9CA3AF"
          className="w-full p-4 bg-[#F8F9FA] rounded-2xl text-[15px] text-gray-900" style={{ minHeight: 100, textAlignVertical: "top", fontFamily: "HankenGrotesk_500Medium" }} />
      </View>
      <View>
        <Text className="text-[13px] font-bold text-gray-900 mb-3" style={{ fontFamily: "HankenGrotesk_700Bold" }}>Accepted Payment Methods</Text>
        <View className="flex-row flex-wrap gap-3">
          {PAYMENT_METHODS.map((method) => (
            <TouchableOpacity key={method} onPress={() => togglePayment(method)}
              className={`flex-row items-center gap-2 px-4 py-3 rounded-xl border ${paymentMethods.includes(method) ? "border-[#0066CC] bg-blue-50" : "border-gray-200 bg-white"}`}>
              <View className={`w-5 h-5 rounded border-2 items-center justify-center ${paymentMethods.includes(method) ? "bg-[#0066CC] border-[#0066CC]" : "border-gray-300"}`}>
                {paymentMethods.includes(method) && <Ionicons name="checkmark" size={14} color="white" />}
              </View>
              <Text className="text-[13px] text-gray-700" style={{ fontFamily: "HankenGrotesk_500Medium" }}>{method}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderStep6 = () => (
    <View style={{ gap: 20 }}>
      <View>
        <Text className="text-[13px] font-bold text-gray-900 mb-1" style={{ fontFamily: "HankenGrotesk_700Bold" }}>Store Banner</Text>
        <TouchableOpacity onPress={() => pickImage(setBannerUri)}
          className="w-full h-32 bg-[#F8F9FA] rounded-2xl border border-dashed border-gray-300 items-center justify-center">
          {bannerUri ? <Image source={{ uri: bannerUri }} className="w-full h-full rounded-2xl" resizeMode="cover" />
            : <Text className="text-[13px] text-gray-500" style={{ fontFamily: "HankenGrotesk_500Medium" }}>Tap to upload banner image</Text>}
        </TouchableOpacity>
      </View>
      <View>
        <Text className="text-[13px] font-bold text-gray-900 mb-1" style={{ fontFamily: "HankenGrotesk_700Bold" }}>Store Photos</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row" contentContainerStyle={{ gap: 12 }}>
          {storePhotos.map((uri, idx) => (
            <View key={idx} className="relative">
              <Image source={{ uri }} className="w-24 h-24 rounded-xl" resizeMode="cover" />
              <TouchableOpacity onPress={() => setStorePhotos(storePhotos.filter((_, i) => i !== idx))} className="absolute -top-2 -right-2 bg-white rounded-full w-6 h-6 items-center justify-center shadow">
                <Ionicons name="close" size={14} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity onPress={() => pickImage((uri) => setStorePhotos([...storePhotos, uri]))}
            className="w-24 h-24 bg-[#F8F9FA] rounded-xl border border-dashed border-gray-300 items-center justify-center">
            <Feather name="plus" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );

  const renderStep7 = () => (
    <View style={{ gap: 16 }}>
      <View className="bg-[#F8F9FA] rounded-2xl p-5" style={{ gap: 12 }}>
        <View className="flex-row items-center gap-3">
          {logoUri ? <Image source={{ uri: logoUri }} className="w-14 h-14 rounded-xl" resizeMode="cover" />
            : <View className="w-14 h-14 rounded-xl bg-gray-200 items-center justify-center"><MaterialIcons name="storefront" size={24} color="#9CA3AF" /></View>}
          <View><Text className="text-[17px] font-bold" style={{ fontFamily: "HankenGrotesk_700Bold" }}>{storeName || "Untitled Store"}</Text>
            <Text className="text-[13px] text-gray-500">{category || "No category"}</Text></View>
        </View>
        <View className="w-full h-[1px] bg-gray-200" />
        <SummaryRow icon="email" label={contactEmail || "No email"} />
        <SummaryRow icon="phone" label={contactPhone || "No phone"} />
        <SummaryRow icon="map-pin" label={address || "No address"} />
        <SummaryRow icon="clock" label={`${openTime} - ${closeTime} (${operatingDays.length} days)`} />
      </View>

      <TouchableOpacity onPress={() => setAgreed(!agreed)} className="flex-row items-start gap-3">
        <View className={`w-5 h-5 rounded border-2 mt-0.5 items-center justify-center ${agreed ? "bg-[#0066CC] border-[#0066CC]" : "border-gray-300"}`}>
          {agreed && <Ionicons name="checkmark" size={14} color="white" />}
        </View>
        <Text className="flex-1 text-[13px] text-gray-600 leading-5" style={{ fontFamily: "HankenGrotesk_500Medium" }}>
          I confirm that all the information provided is accurate and I agree to the Storefront Terms of Service.
        </Text>
      </TouchableOpacity>
    </View>
  );

  const canProceed = () => {
    switch (step) {
      case 1: return storeName.trim().length > 0;
      case 2: return category.length > 0;
      case 3: return contactEmail.trim().length > 0 && contactPhone.trim().length > 0;
      case 4: return operatingDays.length > 0;
      case 5: return true;
      case 6: return true;
      case 7: return agreed;
      default: return false;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="mt-6 mb-6 px-6">
        <Headers text={existingStore ? "Edit Storefront" : "Storefront Setup"} onPress={() => router.back()} />
      </View>
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <Animated.View layout={LinearTransition.springify().damping(15)} entering={FadeInDown.duration(600).springify()}>
          {renderStepIndicator()}
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}
          {step === 6 && renderStep6()}
          {step === 7 && renderStep7()}
        </Animated.View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 bg-white px-6 pb-8 pt-4 border-t border-gray-100">
        <View className="flex-row gap-3">
          <View className="flex-1">
            <SolidGrayButton text={step === 1 ? "Cancel" : "Back"} onPress={handlePrev} />
          </View>
          <View style={{ flex: 1.5 }}>
            {step < TOTAL_STEPS ? (
              <SolidMainButton text="Save & Continue" onPress={handleNext} disabled={!canProceed()} />
            ) : (
              <SolidMainButton text={existingStore ? "Update Store" : "Publish Storefront"} onPress={handlePublish} disabled={!canProceed()} />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

function SummaryRow({ icon, label }: { icon: string; label: string }) {
  const iconMap: Record<string, string> = {
    email: "mail-outline", phone: "call-outline", "map-pin": "location-outline", clock: "time-outline",
  };
  return (
    <View className="flex-row items-center gap-3">
      <Ionicons name={(iconMap[icon] || "ellipse") as any} size={16} color="#6B7280" />
      <Text className="text-[13px] text-gray-600 flex-1" style={{ fontFamily: "HankenGrotesk_500Medium" }}>{label}</Text>
    </View>
  );
}
