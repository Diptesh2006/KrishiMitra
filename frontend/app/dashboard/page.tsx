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
  Clock,
} from "lucide-react"
import VoiceChatbot from "@/components/voice-chatbot"
import CropAnalytics from "@/components/crop-analytics"
import {
  getHealthCheck,
  getLocationDetails,
  predictYield,
  recommendCrop,
  recommendFertilizer,
  predictIrrigationFrequency,
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
  const [language, setLanguage] = useState<"en" | "hi" | "bn" | "te" | "ta" | "mr" | "gu" | "kn">("en")

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
  const [irrigationPrediction, setIrrigationPrediction] = useState<any>(null)

  useEffect(() => {
    const lang = searchParams.get("lang") || "en"
    setLanguage(lang as any)

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

  const handlePredictIrrigation = async () => {
    if (!location || !selectedCrop) {
      toast({
        title: "Input Error",
        description: "Please select a crop.",
        variant: "destructive",
      })
      return
    }
    try {
      const data = await predictIrrigationFrequency({
        latitude: location.lat,
        longitude: location.lon,
        crop: selectedCrop,
      })
      setIrrigationPrediction(data)
      toast({
        title: "Irrigation Prediction",
        description: `Prediction successful! Irrigate every ${data.predicted_frequency_days} days.`,
      })
    } catch (error) {
      setIrrigationPrediction({ predicted_frequency_days: "2-3" });
      toast({
        title: "API Error",
        description: "Failed to predict irrigation frequency. Showing default recommendation.",
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
                      <Button onClick={handlePredictIrrigation}><Clock className="mr-2 h-4 w-4" /> Predict Irrigation</Button>
                    </div>

                    {/* Results */}
                    <div className="space-y-2 pt-4">
                      {recommendedCrop && (
                        <div className="flex justify-between">
                          <span className="font-semibold text-muted-foreground">Rec. Crop:</span>
                          <span className="font-bold">{recommendedCrop}</span>
                        </div>
                      )}
                      {fertilizerRecommendation && (
                        <div className="flex justify-between">
                          <span className="font-semibold text-muted-foreground">Rec. Fertilizer:</span>
                          <span className="font-bold">{fertilizerRecommendation}</span>
                        </div>
                      )}
                      {yieldPrediction && (
                        <>
                          <div className="flex justify-between">
                            <span className="font-semibold text-muted-foreground">Est. Yield:</span>
                            <span className="font-bold">
                              {yieldPrediction?.predicted_yield_tons_per_hectare?.toFixed(2) ?? 'N/A'} tons/ha
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-semibold text-muted-foreground">Est. Production:</span>
                            <span className="font-bold">
                              {yieldPrediction?.predicted_total_production_tons?.toFixed(2) ?? 'N/A'} tons
                            </span>
                          </div>
                        </>
                      )}
                      {irrigationPrediction && (
                          <div className="flex justify-between">
                              <span className="font-semibold text-muted-foreground">Irrigation:</span>
                              <span className="font-bold">Every {irrigationPrediction.predicted_frequency_days} days</span>
                          </div>
                      )}
                      {!recommendedCrop && !fertilizerRecommendation && !yieldPrediction && !irrigationPrediction && (
                        <p className="text-muted-foreground">Click a button to see results here.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <VoiceChatbot language={language as any} />
              </div>
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <div className="space-y-6">
              <CropAnalytics language={""} selectedCrop={""} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
