




// //   "use client"

// // import { useState, useEffect } from "react"
// // import { useRouter } from "next/navigation"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // import { Input } from "@/components/ui/input"
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // import {
// //   MapPin,
// //   Thermometer,
// //   Droplets,
// //   Wind,
// //   Sun,
// //   Sprout,
// //   Calendar,
// //   BarChart3,
// // } from "lucide-react"
// // import VoiceChatbot from "@/components/voice-chatbot"
// // import CropAnalytics from "@/components/crop-analytics"

// // // 🌍 Language-specific mock data
// // const locationData: Record<string, any> = {
// //   hi: {
// //     location: "दिल्ली, भारत",
// //     weather: { temp: "28°C", humidity: "65%", wind: "12 km/h", condition: "धूप" },
// //     crops: ["गेहूं", "धान", "मक्का", "सरसों", "गन्ना", "ज्वार"],
// //   },
// //   en: {
// //     location: "Delhi, India",
// //     weather: { temp: "28°C", humidity: "65%", wind: "12 km/h", condition: "Sunny" },
// //     crops: ["Wheat", "Rice", "Maize", "Mustard", "Sugarcane", "Sorghum"],
// //   },
// //   bn: {
// //     location: "ঢাকা, বাংলাদেশ",
// //     weather: { temp: "26°C", humidity: "72%", wind: "10 km/h", condition: "রৌদ্রোজ্জ্বল" },
// //     crops: ["ধান", "গম", "ভুট্টা", "পাট", "আখ", "সরিষা"],
// //   },
// //   te: {
// //     location: "హైదరాబాద్, భారతదేశం",
// //     weather: { temp: "30°C", humidity: "60%", wind: "15 km/h", condition: "ఎండ" },
// //     crops: ["బియ్యం", "గోధుమలు", "మొక్కజొన్న", "పత్తి", "చెరకు", "జొన్న"],
// //   },
// //   ta: {
// //     location: "சென்னை, இந்தியா",
// //     weather: { temp: "32°C", humidity: "70%", wind: "14 km/h", condition: "வெயில்" },
// //     crops: ["அரிசி", "கோதுமை", "சோளம்", "கரும்பு", "பருத்தி", "சோயாபீன்"],
// //   },
// //   mr: {
// //     location: "पुणे, भारत",
// //     weather: { temp: "29°C", humidity: "68%", wind: "11 km/h", condition: "सूर्यप्रकाश" },
// //     crops: ["तांदूळ", "गहू", "मका", "ऊस", "सोयाबीन", "कापूस"],
// //   },
// //   gu: {
// //     location: "અમદાવાદ, ભારત",
// //     weather: { temp: "31°C", humidity: "62%", wind: "13 km/h", condition: "ધુપછાંવ" },
// //     crops: ["ચોખા", "ગહું", "મકાઈ", "કપાસ", "શેરડી", "જ્વાર"],
// //   },
// //   kn: {
// //     location: "ಬೆಂಗಳೂರು, ಭಾರತ",
// //     weather: { temp: "27°C", humidity: "75%", wind: "9 km/h", condition: "ಬಿಸಿಲು" },
// //     crops: ["ಅಕ್ಕಿ", "ಗೋಧಿ", "ಮೆಕ್ಕೆಜೋಳ", "ಹತ್ತಿ", "ಕಬ್ಬು", "ಜೋಳ"],
// //   },
// // }

// // // 🌐 UI text translations
// // const labels: any = {
// //   hi: {
// //     changeLang: "भाषा बदलें",
// //     overview: "अवलोकन",
// //     analytics: "एनालिटिक्स",
// //     todayWeather: "आज का मौसम",
// //     temp: "तापमान",
// //     humidity: "नमी",
// //     wind: "हवा",
// //     condition: "स्थिति",
// //     selectCrop: "अपनी फसल चुनें",
// //     chooseCrop: "फसल चुनें...",
// //     recFor: (crop: string) => `${crop} के लिए सुझाव`,
// //     rec1: "मिट्टी की नमी बनाए रखें",
// //     rec2: "नियमित निरीक्षण करें",
// //     rec3: "उर्वरक का उपयोग करें",
// //     todayRecs: "आज की सिफारिशें",
// //     weatherAlert: "मौसम चेतावनी",
// //     rain: "अगले 3 दिनों में बारिश की संभावना",
// //     sowing: "बुआई का समय",
// //     wheatSowing: "गेहूं बुआई के लिए उपयुक्त समय",
// //     thisWeek: "इस सप्ताह",
// //     rainyDays: "बारिश के दिन",
// //     avgTemp: "औसत तापमान",
// //     soilMoisture: "मिट्टी की नमी",
// //     enterArea: "भूमि क्षेत्र दर्ज करें",
// //     unit: "इकाई",
// //     acre: "एकड़",
// //     hectare: "हेक्टेयर",
// //     sqm: "वर्ग मीटर",
// //     sqft: "वर्ग फीट",
// //     seour: "मौसम चुनें",
// //     rabi: "रबी",
// //     kharif: "खरीफ",
// //     all: "सभी",
// //     recommendations: "सिफारिशें",
// //     yield: "उपज",
// //     production: "उत्पादन",
// //     fertilizer: "उर्वरक",
// //   },
// //   en: {
// //     changeLang: "Change Language",
// //     overview: "Overview",
// //     analytics: "Analytics",
// //     todayWeather: "Today's Weather",
// //     temp: "Temperature",
// //     humidity: "Humidity",
// //     wind: "Wind",
// //     condition: "Condition",
// //     selectCrop: "Select Your Crop",
// //     chooseCrop: "Choose a crop...",
// //     recFor: (crop: string) => `Recommendations for ${crop}`,
// //     rec1: "Maintain soil moisture",
// //     rec2: "Regular monitoring required",
// //     rec3: "Apply fertilizer as needed",
// //     todayRecs: "Today's Recommendations",
// //     weatherAlert: "Weather Alert",
// //     rain: "Rain expected in next 3 days",
// //     sowing: "Sowing Time",
// //     wheatSowing: "Optimal time for wheat sowing",
// //     thisWeek: "This Week",
// //     rainyDays: "Rainy Days",
// //     avgTemp: "Avg Temperature",
// //     soilMoisture: "Soil Moisture",
// //     enterArea: "Enter land area",
// //     unit: "Unit",
// //     acre: "Acre",
// //     hectare: "Hectare",
// //     sqm: "Sq. Meter",
// //     sqft: "Sq. Feet",
// //     seour: "Select season",
// //     rabi: "Rabi",
// //     kharif: "Kharif",
// //     all: "All",
// //     recommendations: "Recommendations",
// //     yield: "Yield",
// //     production: "Production",
// //     fertilizer: "Fertilizer",
// //   },
// //   bn: {
// //     changeLang: "ভাষা পরিবর্তন",
// //     overview: "সংক্ষিপ্ত বিবরণ",
// //     analytics: "বিশ্লেষণ",
// //     todayWeather: "আজকের আবহাওয়া",
// //     temp: "তাপমাত্রা",
// //     humidity: "আর্দ্রতা",
// //     wind: "বাতাস",
// //     condition: "অবস্থা",
// //     selectCrop: "আপনার ফসল নির্বাচন করুন",
// //     chooseCrop: "ফসল নির্বাচন করুন...",
// //     recFor: (crop: string) => `${crop} এর জন্য পরামর্শ`,
// //     rec1: "মাটির আর্দ্রতা বজায় রাখুন",
// //     rec2: "নিয়মিত পরিদর্শন করুন",
// //     rec3: "সার প্রয়োগ করুন",
// //     todayRecs: "আজকের সুপারিশ",
// //     weatherAlert: "আবহাওয়া সতর্কতা",
// //     rain: "পরবর্তী ৩ দিনে বৃষ্টির সম্ভাবনা",
// //     sowing: "বপনের সময়",
// //     wheatSowing: "গমের জন্য উপযুক্ত বপনের সময়",
// //     thisWeek: "এই সপ্তাহে",
// //     rainyDays: "বৃষ্টির দিন",
// //     avgTemp: "গড় তাপমাত্রা",
// //     soilMoisture: "মাটির আর্দ্রতা",
// //     enterArea: "ভূমির এলাকা লিখুন",
// //     unit: "একক",
// //     acre: "একর",
// //     hectare: "হেক্টর",
// //     sqm: "বর্গ মিটার",
// //     sqft: "বর্গ ফুট",
// //     seour: "ঋতু নির্বাচন করুন",
// //     rabi: "রবি",
// //     kharif: "খরিফ",
// //     all: "সব",
// //     recommendations: "সুপারিশ",
// //     yield: "উৎপাদন",
// //     production: "ফসল",
// //     fertilizer: "সার",
// //   },
// //   te: {
// //     changeLang: "భాష మార్చండి",
// //     overview: "అవలోకనం",
// //     analytics: "విశ్లేషణ",
// //     todayWeather: "ఈరోజు వాతావరణం",
// //     temp: "ఉష్ణోగ్రత",
// //     humidity: "ఆర్ద్రత",
// //     wind: "గాలి",
// //     condition: "స్థితి",
// //     selectCrop: "మీ పంటను ఎంచుకోండి",
// //     chooseCrop: "పంటను ఎంచుకోండి...",
// //     recFor: (crop: string) => `${crop} కోసం సూచనలు`,
// //     rec1: "మట్టి తేమను ఉంచండి",
// //     rec2: "క్రమం తప్పకుండా పర్యవేక్షించండి",
// //     rec3: "అవసరమైతే ఎరువులు వాడండి",
// //     todayRecs: "ఈరోజు సిఫారసులు",
// //     weatherAlert: "వాతావరణ హెచ్చరిక",
// //     rain: "తదుపరి 3 రోజుల్లో వర్షం అవకాశం ఉంది",
// //     sowing: "విత్తన సమయం",
// //     wheatSowing: "గోధుమల విత్తనానికి అనుకూల సమయం",
// //     thisWeek: "ఈ వారం",
// //     rainyDays: "వర్షపు రోజులు",
// //     avgTemp: "సగటు ఉష్ణోగ్రత",
// //     soilMoisture: "మట్టి తేమ",
// //     enterArea: "భూమి ప్రాంతాన్ని నమోదు చేయండి",
// //     unit: "యూనిట్",
// //     acre: "ఎకరం",
// //     hectare: "హెక్టార్",
// //     sqm: "చ.మీ.",
// //     sqft: "చ.అడి",
// //     seour: "సీజన్ ఎంచుకోండి",
// //     rabi: "రబీ",
// //     kharif: "ఖరీఫ్",
// //     all: "అన్ని",
// //     recommendations: "సిఫారసులు",
// //     yield: "ఉత్పత్తి",
// //     production: "పంట",
// //     fertilizer: "ఎరువు",
// //   },
// //   ta: {
// //     changeLang: "மொழி மாற்று",
// //     overview: "மேலோட்டம்",
// //     analytics: "பகுப்பாய்வு",
// //     todayWeather: "இன்றைய வானிலை",
// //     temp: "வெப்பநிலை",
// //     humidity: "ஈரப்பதம்",
// //     wind: "காற்று",
// //     condition: "நிலை",
// //     selectCrop: "உங்கள் பயிரைத் தேர்வுசெய்க",
// //     chooseCrop: "பயிரைத் தேர்ந்தெடுக்கவும்...",
// //     recFor: (crop: string) => `${crop} பரிந்துரைகள்`,
// //     rec1: "மண் ஈரப்பதத்தை பராமரிக்கவும்",
// //     rec2: "தொடர்ந்து கண்காணிக்கவும்",
// //     rec3: "தேவையெனில் உரங்களைப் பயன்படுத்தவும்",
// //     todayRecs: "இன்றைய பரிந்துரைகள்",
// //     weatherAlert: "வானிலை எச்சரிக்கை",
// //     rain: "அடுத்த 3 நாட்களில் மழை வாய்ப்பு",
// //     sowing: "விதைப்பு நேரம்",
// //     wheatSowing: "கோதுமை விதைப்பதற்கு சிறந்த நேரம்",
// //     thisWeek: "இந்த வாரம்",
// //     rainyDays: "மழை நாட்கள்",
// //     avgTemp: "சராசரி வெப்பநிலை",
// //     soilMoisture: "மண் ஈரப்பதம்",
// //     enterArea: "நிலப்பரப்பை உள்ளிடவும்",
// //     unit: "அலகு",
// //     acre: "ஏக்கர்",
// //     hectare: "ஹெக்டேர்",
// //     sqm: "ச.மீ.",
// //     sqft: "ச.அடி",
// //     seour: "பருவம் தேர்வு செய்யவும்",
// //     rabi: "ரபி",
// //     kharif: "கரீப்",
// //     all: "அனைத்தும்",
// //     recommendations: "பரிந்துரைகள்",
// //     yield: "உற்பத்தி",
// //     production: "பயிர்",
// //     fertilizer: "உரம்",
// //   },
// //   mr: {
// //     changeLang: "भाषा बदला",
// //     overview: "आढावा",
// //     analytics: "विश्लेषण",
// //     todayWeather: "आजचे हवामान",
// //     temp: "तापमान",
// //     humidity: "आर्द्रता",
// //     wind: "वारा",
// //     condition: "स्थिती",
// //     selectCrop: "तुमची पिके निवडा",
// //     chooseCrop: "पिक निवडा...",
// //     recFor: (crop: string) => `${crop} साठी सूचना`,
// //     rec1: "मातीतील ओलावा टिकवा",
// //     rec2: "नियमित तपासणी करा",
// //     rec3: "आवश्यकतेनुसार खत द्या",
// //     todayRecs: "आजच्या शिफारसी",
// //     weatherAlert: "हवामान सूचना",
// //     rain: "पुढील ३ दिवसात पावसाची शक्यता",
// //     sowing: "पेरणीचा काळ",
// //     wheatSowing: "गव्हाच्या पेरणीसाठी योग्य वेळ",
// //     thisWeek: "या आठवड्यात",
// //     rainyDays: "पावसाचे दिवस",
// //     avgTemp: "सरासरी तापमान",
// //     soilMoisture: "मातीतील ओलावा",
// //     enterArea: "जमिनीचे क्षेत्र प्रविष्ट करा",
// //     unit: "एकक",
// //     acre: "एकर",
// //     hectare: "हेक्टर",
// //     sqm: "चौ.मी.",
// //     sqft: "चौ.फुट",
// //     seour: "हंगाम निवडा",
// //     rabi: "रबी",
// //     kharif: "खरीफ",
// //     all: "सर्व",
// //     recommendations: "शिफारसी",
// //     yield: "उत्पादन",
// //     production: "पिक",
// //     fertilizer: "खत",
// //   },
// //   gu: {
// //     changeLang: "ભાષા બદલો",
// //     overview: "ઝાંખી",
// //     analytics: "વિશ્લેષણ",
// //     todayWeather: "આજનું હવામાન",
// //     temp: "તાપમાન",
// //     humidity: "ભેજ",
// //     wind: "પવન",
// //     condition: "પરિસ્થિતિ",
// //     selectCrop: "તમારી પાક પસંદ કરો",
// //     chooseCrop: "પાક પસંદ કરો...",
// //     recFor: (crop: string) => `${crop} માટે ભલામણો`,
// //     rec1: "માટીનો ભેજ જાળવો",
// //     rec2: "નિયમિત નિરીક્ષણ કરો",
// //     rec3: "જરૂર મુજબ ખાતર આપો",
// //     todayRecs: "આજની ભલામણો",
// //     weatherAlert: "હવામાન ચેતવણી",
// //     rain: "આગામી 3 દિવસમાં વરસાદની સંભાવના",
// //     sowing: "વાવણી સમય",
// //     wheatSowing: "ગહૂં વાવણી માટે યોગ્ય સમય",
// //     thisWeek: "આ અઠવાડિયે",
// //     rainyDays: "વરસાદના દિવસો",
// //     avgTemp: "સરેરાશ તાપમાન",
// //     soilMoisture: "માટીનો ભેજ",
// //     enterArea: "જમીનનું ક્ષેત્ર દાખલ કરો",
// //     unit: "એકમ",
// //     acre: "એકર",
// //     hectare: "હેક્ટર",
// //     sqm: "ચો.મી.",
// //     sqft: "ચો.ફુટ",
// //     seour: "મોસમ પસંદ કરો",
// //     rabi: "રબી",
// //     kharif: "ખરીફ",
// //     all: "બધું",
// //     recommendations: "ભલામણો",
// //     yield: "ઉત્પાદન",
// //     production: "પાક",
// //     fertilizer: "ખાતર",
// //   },
// //   kn: {
// //     changeLang: "ಭಾಷೆ ಬದಲಾಯಿಸಿ",
// //     overview: "ಅವಲೋಕನ",
// //     analytics: "ವಿಶ್ಲೇಷಣೆ",
// //     todayWeather: "ಇಂದಿನ ಹವಾಮಾನ",
// //     temp: "ತಾಪಮಾನ",
// //     humidity: "ಆದ್ರತೆ",
// //     wind: "ಗಾಳಿ",
// //     condition: "ಸ್ಥಿತಿ",
// //     selectCrop: "ನಿಮ್ಮ ಬೆಳೆ ಆರಿಸಿ",
// //     chooseCrop: "ಬೆಳೆ ಆರಿಸಿ...",
// //     recFor: (crop: string) => `${crop} ಶಿಫಾರಸುಗಳು`,
// //     rec1: "ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಕಾಪಾಡಿ",
// //     rec2: "ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ",
// //     rec3: "ಅವಶ್ಯಕತೆ ಇದ್ದರೆ ರಸಗೊಬ್ಬರ ಬಳಸಿ",
// //     todayRecs: "ಇಂದಿನ ಶಿಫಾರಸುಗಳು",
// //     weatherAlert: "ಹವಾಮಾನ ಎಚ್ಚರಿಕೆ",
// //     rain: "ಮುಂದಿನ 3 ದಿನಗಳಲ್ಲಿ ಮಳೆ ಸಾಧ್ಯತೆ",
// //     sowing: "ಬಿತ್ತನೆ ಸಮಯ",
// //     wheatSowing: "ಗೋಧಿ ಬಿತ್ತನೆಗೆ ಉತ್ತಮ ಸಮಯ",
// //     thisWeek: "ಈ ವಾರ",
// //     rainyDays: "ಮಳೆ ದಿನಗಳು",
// //     avgTemp: "ಸರಾಸರಿ ತಾಪಮಾನ",
// //     soilMoisture: "ಮಣ್ಣಿನ ತೇವಾಂಶ",
// //     enterArea: "ಭೂ ಪ್ರದೇಶವನ್ನು ನಮೂದಿಸಿ",
// //     unit: "ಘಟಕ",
// //     acre: "ಎಕರೆ",
// //     hectare: "ಹೆಕ್ಟೇರ್",
// //     sqm: "ಚ.ಮೀ.",
// //     sqft: "ಚ.ಅಡಿ",
// //     seour: "ಋತು ಆಯ್ಕೆಮಾಡಿ",
// //     rabi: "ರಬಿ",
// //     kharif: "ಖರೀಫ್",
// //     all: "ಎಲ್ಲಾ",
// //     recommendations: "ಶಿಫಾರಸುಗಳು",
// //     yield: "ಉತ್ಪಾದನೆ",
// //     production: "ಬೆಳೆ",
// //     fertilizer: "ರಸಗೊಬ್ಬರ",
// //   },
// // }

// // export default function Dashboard() {
// //   const [selectedCrop, setSelectedCrop] = useState<string>("")
// //   const [location, setLocation] = useState<string>("")
// //   const [language, setLanguage] = useState<"hi" | "en" | "bn" | "te" | "ta" | "mr" | "gu" | "kn">("en")
// //   const [activeTab, setActiveTab] = useState("overview")

// //   const [landArea, setLandArea] = useState<string>("")
// //   const [landUnit, setLandUnit] = useState<string>("acre")
// //   const [season, setSeason] = useState<string>("all")

// //   // Results from backend
// //   const [yieldResult, setYieldResult] = useState<any | null>(null)
// //   const [fertilizerResult, setFertilizerResult] = useState<string>("")

// //   const router = useRouter()

// //   useEffect(() => {
// //     const urlParams = new URLSearchParams(window.location.search)
// //     const lang = (urlParams.get("lang") as typeof language) || "en"
// //     setLanguage(lang)

// //     if (navigator.geolocation) {
// //       navigator.geolocation.getCurrentPosition(
// //         (position) => {
// //           setLocation(`${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`)
// //         },
// //         () => {
// //           setLocation("Delhi, India")
// //         },
// //       )
// //     }
// //   }, [])

// //   const currentData = locationData[language]
// //   const t = labels[language]

// //   // ----------------- API CALLS -----------------
// //   async function fetchPredictions() {
// //     if (!selectedCrop || !landArea) {
// //       alert("Please select crop and enter land area")
// //       return
// //     }

// //     try {
// //       // Yield Prediction
// //       const resYield = await fetch("http://localhost:8000/predict-yield", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           state: "Delhi", // TODO: reverse geocode from `location`
// //           district: "New Delhi",
// //           year: 2025,
// //           season,
// //           crop: selectedCrop,
// //           area: parseFloat(landArea),
// //         }),
// //       })
// //       const dataYield = await resYield.json()
// //       setYieldResult(dataYield)

// //       // Fertilizer Recommendation
// //       const resFert = await fetch("http://localhost:8000/predict-fertilizer", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           state: "Delhi",
// //           temperature: 30,
// //           humidity: 60,
// //           moisture: 40,
// //           crop_type: selectedCrop,
// //         }),
// //       })
// //       const dataFert = await resFert.json()
// //       setFertilizerResult(dataFert.fertilizer)
// //     } catch (err) {
// //       console.error("Backend error:", err)
// //     }
// //   }

// //   return (
// //     <div className="min-h-screen bg-background">
// //       {/* Header */}
// //       <div className="border-b bg-card">
// //         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
// //           <div className="flex items-center gap-3">
// //             <div className="p-2 bg-primary rounded-lg">
// //               <Sprout className="h-6 w-6 text-primary-foreground" />
// //             </div>
// //             <h1 className="text-2xl font-bold text-primary">KrishiMitraAI</h1>
// //           </div>

// //           <div className="flex items-center gap-4">
// //             <div className="flex items-center gap-2 text-sm text-muted-foreground">
// //               <MapPin className="h-4 w-4" />
// //               <span>{currentData.location}</span>
// //             </div>
// //             <Button
// //               variant="outline"
// //               onClick={() => router.push("/?lang=en")}
// //               className="hover:bg-primary hover:text-primary-foreground transition-colors"
// //             >
// //               {t.changeLang}
// //             </Button>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="container mx-auto px-4 py-6">
// //         {/* Tabs */}
// //         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
// //           <TabsList className="grid w-full grid-cols-2">
// //             <TabsTrigger value="overview" className="flex items-center gap-2">
// //               <Sprout className="h-4 w-4" /> {t.overview}
// //             </TabsTrigger>
// //             <TabsTrigger value="analytics" className="flex items-center gap-2">
// //               <BarChart3 className="h-4 w-4" /> {t.analytics}
// //             </TabsTrigger>
// //           </TabsList>

// //           <TabsContent value="overview">
// //             <div className="grid lg:grid-cols-3 gap-6">
// //               {/* Main */}
// //               <div className="lg:col-span-2 space-y-6">
// //                 {/* Weather */}
// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle className="flex items-center gap-2">
// //                       <Sun className="h-5 w-5" /> {t.todayWeather}
// //                     </CardTitle>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <div className="grid grid-cols-4 gap-4 text-center">
// //                       <div>
// //                         <Thermometer className="h-8 w-8 text-orange-500 mx-auto mb-2" />
// //                         <p className="text-2xl font-bold">{currentData.weather.temp}</p>
// //                       </div>
// //                       <div>
// //                         <Droplets className="h-8 w-8 text-blue-500 mx-auto mb-2" />
// //                         <p className="text-2xl font-bold">{currentData.weather.humidity}</p>
// //                       </div>
// //                       <div>
// //                         <Wind className="h-8 w-8 text-gray-500 mx-auto mb-2" />
// //                         <p className="text-2xl font-bold">{currentData.weather.wind}</p>
// //                       </div>
// //                       <div>
// //                         <Sun className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
// //                         <p className="text-lg font-bold">{currentData.weather.condition}</p>
// //                       </div>
// //                     </div>
// //                   </CardContent>
// //                 </Card>

// //                 {/* Crop + Land + Season */}
// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle className="flex items-center gap-2">
// //                       <Sprout className="h-5 w-5" /> {t.selectCrop}
// //                     </CardTitle>
// //                   </CardHeader>
// //                   <CardContent className="space-y-4">
// //                     <Select value={selectedCrop} onValueChange={setSelectedCrop}>
// //                       <SelectTrigger className="w-full">
// //                         <SelectValue placeholder={t.selectCrop} />
// //                       </SelectTrigger>
// //                       <SelectContent>
// //                         {currentData.crops.map((crop: string, i: number) => (
// //                           <SelectItem key={i} value={crop}>
// //                             {crop}
// //                           </SelectItem>
// //                         ))}
// //                       </SelectContent>
// //                     </Select>

// //                     <div className="flex gap-3">
// //                       <Input
// //                         type="number"
// //                         placeholder={t.enterArea}
// //                         value={landArea}
// //                         onChange={(e) => setLandArea(e.target.value)}
// //                       />
// //                       <Select value={landUnit} onValueChange={setLandUnit}>
// //                         <SelectTrigger className="w-32">
// //                           <SelectValue placeholder={t.unit} />
// //                         </SelectTrigger>
// //                         <SelectContent>
// //                           <SelectItem value="acre">{t.acre}</SelectItem>
// //                           <SelectItem value="hectare">{t.hectare}</SelectItem>
// //                           <SelectItem value="sqm">{t.sqm}</SelectItem>
// //                           <SelectItem value="sqft">{t.sqft}</SelectItem>
// //                         </SelectContent>
// //                       </Select>
// //                     </div>

// //                     <Select value={season} onValueChange={setSeason}>
// //                       <SelectTrigger className="w-full">
// //                         <SelectValue placeholder={t.seour} />
// //                       </SelectTrigger>
// //                       <SelectContent>
// //                         <SelectItem value="rabi">{t.rabi}</SelectItem>
// //                         <SelectItem value="kharif">{t.kharif}</SelectItem>
// //                         <SelectItem value="all">{t.all}</SelectItem>
// //                       </SelectContent>
// //                     </Select>

// //                     {selectedCrop && (
// //                       <div className="mt-4 p-4 bg-muted rounded-lg">
// //                         <h4 className="font-semibold mb-2">
// //                           {t.recommendations} - {selectedCrop} ({landArea || "?"} {t[landUnit]}, {t[season]})
// //                         </h4>
// //                         <ul className="space-y-1 text-sm text-muted-foreground">
// //                           {yieldResult && (
// //                             <li>• {t.yield || "Yield"}: {yieldResult.yield.toFixed(2)} tons/ha</li>
// //                           )}
// //                           {yieldResult && (
// //                             <li>• {t.production || "Production"}: {yieldResult.production.toFixed(2)} tons</li>
// //                           )}
// //                           {fertilizerResult && (
// //                             <li>• {t.fertilizer || "Fertilizer"}: {fertilizerResult}</li>
// //                           )}
// //                           {!yieldResult && !fertilizerResult && (
// //                             <li className="text-gray-500">Click below to fetch predictions</li>
// //                           )}
// //                         </ul>
// //                         <Button onClick={fetchPredictions} className="mt-3">
// //                           Get Predictions
// //                         </Button>
// //                       </div>
// //                     )}
// //                   </CardContent>
// //                 </Card>
// //               </div>

// //               {/* Sidebar */}
// //               <div className="space-y-6">
// //                 <VoiceChatbot language={language} />
// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle className="flex items-center gap-2">
// //                       <Calendar className="h-5 w-5" /> {t.thisWeek || "This Week"}
// //                     </CardTitle>
// //                   </CardHeader>
// //                   <CardContent className="space-y-4">
// //                     <div className="flex justify-between">
// //                       <span>{t.rainyDays || "Rainy Days"}</span>
// //                       <span className="font-semibold">3</span>
// //                     </div>
// //                     <div className="flex justify-between">
// //                       <span>{t.avgTemp || "Avg Temp"}</span>
// //                       <span className="font-semibold">26°C</span>
// //                     </div>
// //                     <div className="flex justify-between">
// //                       <span>{t.soilMoisture || "Soil Moisture"}</span>
// //                       <span className="font-semibold text-green-600">Good</span>
// //                     </div>
// //                   </CardContent>
// //                 </Card>
// //               </div>
// //             </div>
// //           </TabsContent>

// //           {/* Analytics */}
// //           <TabsContent value="analytics">
// //             <CropAnalytics language={language} selectedCrop={selectedCrop} />
// //           </TabsContent>
// //         </Tabs>
// //       </div>
// //     </div>
// //   )
// // }




// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Input } from "@/components/ui/input"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import {
//   MapPin,
//   Thermometer,
//   Droplets,
//   Wind,
//   Sun,
//   Sprout,
//   Calendar,
//   BarChart3,
// } from "lucide-react"
// import VoiceChatbot from "@/components/voice-chatbot"
// import CropAnalytics from "@/components/crop-analytics"

// // 🌍 Location + Crops + Weather for all 8 languages
// const locationData: Record<string, any> = {
//   en: {
//     location: "Delhi, India",
//     weather: { temp: "28°C", humidity: "65%", wind: "12 km/h", condition: "Sunny" },
//     crops: ["Wheat", "Rice", "Maize", "Mustard", "Sugarcane", "Sorghum"],
//   },
//   hi: { location: "दिल्ली, भारत", weather: { temp: "28°C", humidity: "65%", wind: "12 km/h", condition: "धूप" }, crops: ["गेहूं", "धान", "मक्का", "सरसों", "गन्ना", "ज्वार"] },
//   bn: { location: "ঢাকা, বাংলাদেশ", weather: { temp: "26°C", humidity: "72%", wind: "10 km/h", condition: "রৌদ্রোজ্জ্বল" }, crops: ["ধান", "গম", "ভুট্টা", "পাট", "আখ", "সরিষা"] },
//   te: { location: "హైదరాబాద్, భారతదేశం", weather: { temp: "30°C", humidity: "60%", wind: "15 km/h", condition: "ఎండ" }, crops: ["బియ్యం", "గోధుమలు", "మొక్కజొన్న", "పత్తి", "చెరకు", "జొన్న"] },
//   ta: { location: "சென்னை, இந்தியா", weather: { temp: "32°C", humidity: "70%", wind: "14 km/h", condition: "வெயில்" }, crops: ["அரிசி", "கோதுமை", "சோளம்", "கரும்பு", "பருத்தி", "சோயாபீன்"] },
//   mr: { location: "पुणे, भारत", weather: { temp: "29°C", humidity: "68%", wind: "11 km/h", condition: "सूर्यप्रकाश" }, crops: ["तांदूळ", "गहू", "मका", "ऊस", "सोयाबीन", "कापूस"] },
//   gu: { location: "અમદાવાદ, ભારત", weather: { temp: "31°C", humidity: "62%", wind: "13 km/h", condition: "ધુપછાંવ" }, crops: ["ચોખા", "ગહું", "મકાઈ", "કપાસ", "શેરડી", "જ્વાર"] },
//   kn: { location: "ಬೆಂಗಳೂರು, ಭಾರತ", weather: { temp: "27°C", humidity: "75%", wind: "9 km/h", condition: "ಬಿಸಿಲು" }, crops: ["ಅಕ್ಕಿ", "ಗೋಧಿ", "ಮೆಕ್ಕೆಜೋಳ", "ಹತ್ತಿ", "ಕಬ್ಬು", "ಜೋಳ"] },
// }

// // 🌐 Translations
// const labels: any = {
//   en: { changeLang: "Change Language", overview: "Overview", analytics: "Analytics", todayWeather: "Today's Weather", selectCrop: "Select Your Crop", enterArea: "Enter Land Area", unit: "Choose Unit", season: "Choose Season", recommendations: "Recommendations", rabi: "Rabi", kharif: "Kharif", all: "All Season", acre: "Acre", hectare: "Hectare", sqm: "Sq. Meter", sqft: "Sq. Feet", yield: "Yield", production: "Production", fertilizer: "Fertilizer" },
//   hi: { changeLang: "भाषा बदलें", overview: "अवलोकन", analytics: "एनालिटिक्स", todayWeather: "आज का मौसम", selectCrop: "अपनी फसल चुनें", enterArea: "भूमि क्षेत्र दर्ज करें", unit: "इकाई चुनें", season: "मौसम चुनें", recommendations: "सुझाव", rabi: "रबी", kharif: "खरीफ", all: "सभी मौसम", acre: "एकड़", hectare: "हेक्टेयर", sqm: "वर्ग मीटर", sqft: "वर्ग फुट", yield: "उपज", production: "उत्पादन", fertilizer: "उर्वरक" },
//   // ... (other languages same way, add yield/production/fertilizer labels)
// }

// export default function Dashboard() {
//   const [selectedCrop, setSelectedCrop] = useState<string>("")
//   const [location, setLocation] = useState<string>("")
//   const [language, setLanguage] = useState<"hi" | "en" | "bn" | "te" | "ta" | "mr" | "gu" | "kn">("en")
//   const [activeTab, setActiveTab] = useState("overview")

//   const [landArea, setLandArea] = useState<string>("")
//   const [landUnit, setLandUnit] = useState<string>("acre")
//   const [season, setSeason] = useState<string>("all")

//   // Results
//   const [yieldResult, setYieldResult] = useState<any | null>(null)
//   const [fertilizerResult, setFertilizerResult] = useState<string>("")

//   const router = useRouter()

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search)
//     const lang = (urlParams.get("lang") as typeof language) || "en"
//     setLanguage(lang)

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation(`${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`)
//         },
//         () => {
//           setLocation("Delhi, India")
//         },
//       )
//     }
//   }, [])

//   const currentData = locationData[language]
//   const t = labels[language]

//   // ----------------- API CALLS -----------------
//   async function fetchPredictions() {
//     if (!selectedCrop || !landArea) {
//       alert("Please select crop and enter land area")
//       return
//     }

//     try {
//       // Yield Prediction
//       const resYield = await fetch("http://localhost:8000/predict-yield", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           state: "Delhi",
//           district: "New Delhi",
//           year: 2025,
//           season,
//           crop: selectedCrop,
//           area: parseFloat(landArea),
//         }),
//       })

//       if (!resYield.ok) throw new Error(`Yield API failed: ${resYield.status}`)

//       const dataYield = await resYield.json()
//       console.log("✅ Yield API Response:", dataYield)
//       setYieldResult(dataYield)

//       // Fertilizer Recommendation
//       const resFert = await fetch("http://localhost:8000/predict-fertilizer", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           state: "Delhi",
//           temperature: 30,
//           humidity: 60,
//           moisture: 40,
//           crop_type: selectedCrop,
//         }),
//       })

//       if (!resFert.ok) throw new Error(`Fertilizer API failed: ${resFert.status}`)

//       const dataFert = await resFert.json()
//       console.log("✅ Fertilizer API Response:", dataFert)
//       setFertilizerResult(dataFert.fertilizer || dataFert.recommendation || "N/A")
//     } catch (err: any) {
//       console.error("❌ Backend error:", err.message)
//       alert(`Prediction failed: ${err.message}`)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <div className="border-b bg-card">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-primary rounded-lg">
//               <Sprout className="h-6 w-6 text-primary-foreground" />
//             </div>
//             <h1 className="text-2xl font-bold text-primary">KrishiMitraAI</h1>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2 text-sm text-muted-foreground">
//               <MapPin className="h-4 w-4" />
//               <span>{currentData.location}</span>
//             </div>
//             <Button
//               variant="outline"
//               onClick={() => router.push("/?lang=en")}
//               className="hover:bg-primary hover:text-primary-foreground transition-colors"
//             >
//               {t.changeLang}
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-6">
//         {/* Tabs */}
//         <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="overview" className="flex items-center gap-2">
//               <Sprout className="h-4 w-4" /> {t.overview}
//             </TabsTrigger>
//             <TabsTrigger value="analytics" className="flex items-center gap-2">
//               <BarChart3 className="h-4 w-4" /> {t.analytics}
//             </TabsTrigger>
//           </TabsList>

//           {/* Overview */}
//           <TabsContent value="overview">
//             <div className="grid lg:grid-cols-3 gap-6">
//               {/* Main */}
//               <div className="lg:col-span-2 space-y-6">
//                 {/* Weather */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <Sun className="h-5 w-5" /> {t.todayWeather}
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid grid-cols-4 gap-4 text-center">
//                       <div>
//                         <Thermometer className="h-8 w-8 text-orange-500 mx-auto mb-2" />
//                         <p className="text-2xl font-bold">{currentData.weather.temp}</p>
//                       </div>
//                       <div>
//                         <Droplets className="h-8 w-8 text-blue-500 mx-auto mb-2" />
//                         <p className="text-2xl font-bold">{currentData.weather.humidity}</p>
//                       </div>
//                       <div>
//                         <Wind className="h-8 w-8 text-gray-500 mx-auto mb-2" />
//                         <p className="text-2xl font-bold">{currentData.weather.wind}</p>
//                       </div>
//                       <div>
//                         <Sun className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
//                         <p className="text-lg font-bold">{currentData.weather.condition}</p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Crop + Land + Season */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <Sprout className="h-5 w-5" /> {t.selectCrop}
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <Select value={selectedCrop} onValueChange={setSelectedCrop}>
//                       <SelectTrigger className="w-full">
//                         <SelectValue placeholder={t.selectCrop} />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {currentData.crops.map((crop: string, i: number) => (
//                           <SelectItem key={i} value={crop}>
//                             {crop}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>

//                     <div className="flex gap-3">
//                       <Input
//                         type="number"
//                         placeholder={t.enterArea}
//                         value={landArea}
//                         onChange={(e) => setLandArea(e.target.value)}
//                       />
//                       <Select value={landUnit} onValueChange={setLandUnit}>
//                         <SelectTrigger className="w-32">
//                           <SelectValue placeholder={t.unit} />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="acre">{t.acre}</SelectItem>
//                           <SelectItem value="hectare">{t.hectare}</SelectItem>
//                           <SelectItem value="sqm">{t.sqm}</SelectItem>
//                           <SelectItem value="sqft">{t.sqft}</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <Select value={season} onValueChange={setSeason}>
//                       <SelectTrigger className="w-full">
//                         <SelectValue placeholder={t.season} />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="rabi">{t.rabi}</SelectItem>
//                         <SelectItem value="kharif">{t.kharif}</SelectItem>
//                         <SelectItem value="all">{t.all}</SelectItem>
//                       </SelectContent>
//                     </Select>

//                     {selectedCrop && (
//                       <div className="mt-4 p-4 bg-muted rounded-lg">
//                         <h4 className="font-semibold mb-2">
//                           {t.recommendations} - {selectedCrop} ({landArea || "?"} {t[landUnit]}, {t[season]})
//                         </h4>
//                         <ul className="space-y-1 text-sm text-muted-foreground">
//                           {yieldResult && (
//                             <>
//                               <li>• {t.yield}: {(yieldResult.yield || yieldResult.predicted_yield || 0).toFixed(2)} tons/ha</li>
//                               <li>• {t.production}: {(yieldResult.production || yieldResult.predicted_production || 0).toFixed(2)} tons</li>
//                             </>
//                           )}
//                           {fertilizerResult && (
//                             <li>• {t.fertilizer}: {fertilizerResult}</li>
//                           )}
//                           {!yieldResult && !fertilizerResult && (
//                             <li className="text-gray-500">Click below to fetch predictions</li>
//                           )}
//                         </ul>
//                         <Button onClick={fetchPredictions} className="mt-3">
//                           Get Predictions
//                         </Button>
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </div>

//               {/* Sidebar */}
//               <div className="space-y-6">
//                 <VoiceChatbot language={language} />
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <Calendar className="h-5 w-5" /> {t.thisWeek || "This Week"}
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="flex justify-between">
//                       <span>{t.rainyDays || "Rainy Days"}</span>
//                       <span className="font-semibold">3</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>{t.avgTemp || "Avg Temp"}</span>
//                       <span className="font-semibold">26°C</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>{t.soilMoisture || "Soil Moisture"}</span>
//                       <span className="font-semibold text-green-600">Good</span>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>
//           </TabsContent>

//           {/* Analytics */}
//           <TabsContent value="analytics">
//             <CropAnalytics language={language} selectedCrop={selectedCrop} />
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   )
// }



"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Sprout,
  BarChart3,
  Leaf,
  FlaskConical,
  AreaChart,
} from "lucide-react"
import VoiceChatbot from "@/components/voice-chatbot"
import CropAnalytics from "@/components/crop-analytics"
import {
  getHealthCheck,
  getLocationDetails,
  predictYield,
  recommendCrop,
  recommendFertilizer,
} from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

// Mock data for crops and seasons, can be replaced with API data if available
const crops = ["Rice", "Wheat", "Maize", "Mustard", "Sugarcane", "Sorghum", "Cotton", "Soyabean", "Groundnut"]
const seasons = ["Kharif", "Rabi", "Zaid", "Whole Year"]

export default function Dashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  // UI State
  const [activeTab, setActiveTab] = useState("overview")
  const [language, setLanguage] = useState("en")

  // Location & Weather State
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null)
  const [locationDetails, setLocationDetails] = useState<any>(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)

  // Form Inputs
  const [selectedCrop, setSelectedCrop] = useState<string>("")
  const [selectedSeason, setSelectedSeason] = useState<string>("")
  const [areaHectares, setAreaHectares] = useState<string>("")

  // API Results
  const [recommendedCrop, setRecommendedCrop] = useState<string>("")
  const [yieldPrediction, setYieldPrediction] = useState<any>(null)
  const [fertilizerRecommendation, setFertilizerRecommendation] = useState<string>("")

  useEffect(() => {
    const lang = searchParams.get("lang") || "en"
    setLanguage(lang)

    // 1. Get Health Status
    getHealthCheck()
      .then(() => {
        toast({ title: "API Status", description: "API is healthy and running!" })
      })
      .catch(() => {
        toast({
          title: "API Status",
          description: "API is not reachable.",
          variant: "destructive",
        })
      })

    // 2. Get Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ lat: latitude, lon: longitude })
        },
        () => {
          setIsLoadingLocation(false)
          toast({
            title: "Location Error",
            description: "Could not access your location. Please enable location services.",
            variant: "destructive",
          })
        }
      )
    } else {
      setIsLoadingLocation(false)
      toast({
        title: "Location Error",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      })
    }
  }, [searchParams, toast])

  // 3. Fetch location details once location is available
  useEffect(() => {
    if (location) {
      setIsLoadingLocation(true)
      getLocationDetails(location.lat, location.lon)
        .then((data) => {
          setLocationDetails(data)
          setIsLoadingLocation(false)
        })
        .catch(() => {
          setIsLoadingLocation(false)
          toast({
            title: "API Error",
            description: "Failed to fetch location and weather details.",
            variant: "destructive",
          })
        })
    }
  }, [location, toast])

  // --- API Handlers ---

  const handleRecommendCrop = async () => {
    if (!location) return
    try {
      const data = await recommendCrop({ latitude: location.lat, longitude: location.lon })
      setRecommendedCrop(data.recommended_crop)
      toast({
        title: "Crop Recommendation",
        description: `We recommend planting: ${data.recommended_crop}`,
      })
    } catch (error) {
      toast({
        title: "API Error",
        description: "Failed to get crop recommendation.",
        variant: "destructive",
      })
    }
  }

  const handlePredictYield = async () => {
    if (!location || !selectedCrop || !selectedSeason || !areaHectares) {
      toast({
        title: "Input Error",
        description: "Please select a crop, season, and enter the area.",
        variant: "destructive",
      })
      return
    }
    try {
      const data = await predictYield({
        latitude: location.lat,
        longitude: location.lon,
        crop: selectedCrop,
        season: selectedSeason,
        area_hectares: parseFloat(areaHectares),
      })
      setYieldPrediction(data)
      toast({
        title: "Yield Prediction",
        description: "Prediction successful!",
      })
    } catch (error) {
      toast({
        title: "API Error",
        description: "Failed to predict yield.",
        variant: "destructive",
      })
    }
  }

  const handleRecommendFertilizer = async () => {
    if (!location || !selectedCrop) {
      toast({
        title: "Input Error",
        description: "Please select a crop.",
        variant: "destructive",
      })
      return
    }
    try {
      const data = await recommendFertilizer({
        latitude: location.lat,
        longitude: location.lon,
        crop_type: selectedCrop,
      })
      setFertilizerRecommendation(data.recommended_fertilizer)
      toast({
        title: "Fertilizer Recommendation",
        description: `Recommended fertilizer: ${data.recommended_fertilizer}`,
      })
    } catch (error) {
      toast({
        title: "API Error",
        description: "Failed to get fertilizer recommendation.",
        variant: "destructive",
      })
    }
  }

  const locationName = locationDetails
    ? `${locationDetails.geography.city}, ${locationDetails.geography.state}`
    : "Loading location..."

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Sprout className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-primary">KrishiMitraAI</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{isLoadingLocation ? "Fetching location..." : locationName}</span>
            </div>
            <Button variant="outline" onClick={() => router.push("/")}>
              Change Language
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Sprout className="h-4 w-4" /> Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" /> Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Weather */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sun className="h-5 w-5" /> Today's Weather
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoadingLocation || !locationDetails ? (
                      <p>Loading weather data...</p>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                          <Thermometer className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                          <p className="text-2xl font-bold">{locationDetails.weather.temperature_celsius}°C</p>
                          <p className="text-sm text-muted-foreground">Temperature</p>
                        </div>
                        <div>
                          <Droplets className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                          <p className="text-2xl font-bold">{locationDetails.weather.humidity_percent}%</p>
                          <p className="text-sm text-muted-foreground">Humidity</p>
                        </div>
                        <div>
                          <Wind className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                          <p className="text-2xl font-bold">{locationDetails.weather.wind_speed_kmph} km/h</p>
                          <p className="text-sm text-muted-foreground">Wind</p>
                        </div>
                        <div>
                          <Sun className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                          <p className="text-lg font-bold capitalize">{locationDetails.weather.condition}</p>
                          <p className="text-sm text-muted-foreground">Condition</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Predictions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Predictions & Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Inputs */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                        <SelectTrigger><SelectValue placeholder="Select Crop" /></SelectTrigger>
                        <SelectContent>{crops.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                      </Select>
                      <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                        <SelectTrigger><SelectValue placeholder="Select Season" /></SelectTrigger>
                        <SelectContent>{seasons.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                      </Select>
                      <Input
                        type="number"
                        placeholder="Area in Hectares"
                        value={areaHectares}
                        onChange={(e) => setAreaHectares(e.target.value)}
                      />
                    </div>
                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <Button onClick={handleRecommendCrop}><Leaf className="mr-2 h-4 w-4" /> Recommend Crop</Button>
                      <Button onClick={handlePredictYield}><AreaChart className="mr-2 h-4 w-4" /> Predict Yield</Button>
                      <Button onClick={handleRecommendFertilizer}><FlaskConical className="mr-2 h-4 w-4" /> Recommend Fertilizer</Button>
                    </div>
                    {/* Results */}
                    <div className="space-y-2 pt-4">
                      {recommendedCrop && <p><strong>Recommended Crop:</strong> {recommendedCrop}</p>}
                      {fertilizerRecommendation && <p><strong>Recommended Fertilizer:</strong> {fertilizerRecommendation}</p>}
                      {yieldPrediction && (
                        <div>
                          <p><strong>Predicted Yield:</strong> {yieldPrediction.predicted_yield_tons_per_hectare.toFixed(2)} tons/hectare</p>
                          <p><strong>Total Production:</strong> {yieldPrediction.predicted_total_production_tons.toFixed(2)} tons</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <VoiceChatbot language={language} />
                {/* You can add more cards here if needed */}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <CropAnalytics language={language} selectedCrop={selectedCrop} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
