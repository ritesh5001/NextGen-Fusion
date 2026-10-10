"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Search } from "lucide-react"

interface Country {
  code: string
  name: string
  flag: string
  dialCode: string
}

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const countries: Country[] = [
  { code: "IN", name: "India", flag: "🇮🇳", dialCode: "+91" },
  { code: "US", name: "United States", flag: "🇺🇸", dialCode: "+1" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", dialCode: "+44" },
  { code: "CA", name: "Canada", flag: "🇨🇦", dialCode: "+1" },
  { code: "AU", name: "Australia", flag: "🇦🇺", dialCode: "+61" },
  { code: "DE", name: "Germany", flag: "🇩🇪", dialCode: "+49" },
  { code: "FR", name: "France", flag: "🇫🇷", dialCode: "+33" },
  { code: "IT", name: "Italy", flag: "🇮🇹", dialCode: "+39" },
  { code: "ES", name: "Spain", flag: "🇪🇸", dialCode: "+34" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", dialCode: "+31" },
  { code: "BE", name: "Belgium", flag: "🇧🇪", dialCode: "+32" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭", dialCode: "+41" },
  { code: "AT", name: "Austria", flag: "🇦🇹", dialCode: "+43" },
  { code: "DK", name: "Denmark", flag: "🇩🇰", dialCode: "+45" },
  { code: "SE", name: "Sweden", flag: "🇸🇪", dialCode: "+46" },
  { code: "NO", name: "Norway", flag: "🇳🇴", dialCode: "+47" },
  { code: "FI", name: "Finland", flag: "🇫🇮", dialCode: "+358" },
  { code: "PL", name: "Poland", flag: "🇵🇱", dialCode: "+48" },
  { code: "CZ", name: "Czech Republic", flag: "🇨🇿", dialCode: "+420" },
  { code: "SK", name: "Slovakia", flag: "🇸🇰", dialCode: "+421" },
  { code: "HU", name: "Hungary", flag: "🇭🇺", dialCode: "+36" },
  { code: "RO", name: "Romania", flag: "🇷🇴", dialCode: "+40" },
  { code: "BG", name: "Bulgaria", flag: "🇧🇬", dialCode: "+359" },
  { code: "HR", name: "Croatia", flag: "🇭🇷", dialCode: "+385" },
  { code: "SI", name: "Slovenia", flag: "🇸🇮", dialCode: "+386" },
  { code: "EE", name: "Estonia", flag: "🇪🇪", dialCode: "+372" },
  { code: "LV", name: "Latvia", flag: "🇱🇻", dialCode: "+371" },
  { code: "LT", name: "Lithuania", flag: "🇱🇹", dialCode: "+370" },
  { code: "GR", name: "Greece", flag: "🇬🇷", dialCode: "+30" },
  { code: "PT", name: "Portugal", flag: "🇵🇹", dialCode: "+351" },
  { code: "IE", name: "Ireland", flag: "🇮🇪", dialCode: "+353" },
  { code: "IS", name: "Iceland", flag: "🇮🇸", dialCode: "+354" },
  { code: "LU", name: "Luxembourg", flag: "🇱🇺", dialCode: "+352" },
  { code: "MT", name: "Malta", flag: "🇲🇹", dialCode: "+356" },
  { code: "CY", name: "Cyprus", flag: "🇨🇾", dialCode: "+357" },
  { code: "JP", name: "Japan", flag: "🇯🇵", dialCode: "+81" },
  { code: "KR", name: "South Korea", flag: "🇰🇷", dialCode: "+82" },
  { code: "CN", name: "China", flag: "🇨🇳", dialCode: "+86" },
  { code: "TH", name: "Thailand", flag: "🇹🇭", dialCode: "+66" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳", dialCode: "+84" },
  { code: "PH", name: "Philippines", flag: "🇵🇭", dialCode: "+63" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾", dialCode: "+60" },
  { code: "SG", name: "Singapore", flag: "🇸🇬", dialCode: "+65" },
  { code: "HK", name: "Hong Kong", flag: "🇭🇰", dialCode: "+852" },
  { code: "TW", name: "Taiwan", flag: "🇹🇼", dialCode: "+886" },
  { code: "MO", name: "Macau", flag: "🇲🇴", dialCode: "+853" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", dialCode: "+55" },
  { code: "AR", name: "Argentina", flag: "🇦🇷", dialCode: "+54" },
  { code: "CL", name: "Chile", flag: "🇨🇱", dialCode: "+56" },
  { code: "CO", name: "Colombia", flag: "🇨🇴", dialCode: "+57" },
  { code: "PE", name: "Peru", flag: "🇵🇪", dialCode: "+51" },
  { code: "VE", name: "Venezuela", flag: "🇻🇪", dialCode: "+58" },
  { code: "EC", name: "Ecuador", flag: "🇪🇨", dialCode: "+593" },
  { code: "BO", name: "Bolivia", flag: "🇧🇴", dialCode: "+591" },
  { code: "PY", name: "Paraguay", flag: "🇵🇾", dialCode: "+595" },
  { code: "UY", name: "Uruguay", flag: "🇺🇾", dialCode: "+598" },
  { code: "MX", name: "Mexico", flag: "🇲🇽", dialCode: "+52" },
  { code: "GT", name: "Guatemala", flag: "🇬🇹", dialCode: "+502" },
  { code: "CR", name: "Costa Rica", flag: "🇨🇷", dialCode: "+506" },
  { code: "PA", name: "Panama", flag: "🇵🇦", dialCode: "+507" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", dialCode: "+27" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", dialCode: "+234" },
  { code: "KE", name: "Kenya", flag: "🇰🇪", dialCode: "+254" },
  { code: "GH", name: "Ghana", flag: "🇬🇭", dialCode: "+233" },
  { code: "EG", name: "Egypt", flag: "🇪🇬", dialCode: "+20" },
  { code: "MA", name: "Morocco", flag: "🇲🇦", dialCode: "+212" },
  { code: "TN", name: "Tunisia", flag: "🇹🇳", dialCode: "+216" },
  { code: "DZ", name: "Algeria", flag: "🇩🇿", dialCode: "+213" },
  { code: "TR", name: "Turkey", flag: "🇹🇷", dialCode: "+90" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", dialCode: "+966" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", dialCode: "+971" },
  { code: "IL", name: "Israel", flag: "🇮🇱", dialCode: "+972" },
  { code: "JO", name: "Jordan", flag: "🇯🇴", dialCode: "+962" },
  { code: "LB", name: "Lebanon", flag: "🇱🇧", dialCode: "+961" },
  { code: "KW", name: "Kuwait", flag: "🇰🇼", dialCode: "+965" },
  { code: "QA", name: "Qatar", flag: "🇶🇦", dialCode: "+974" },
  { code: "BH", name: "Bahrain", flag: "🇧🇭", dialCode: "+973" },
  { code: "OM", name: "Oman", flag: "🇴🇲", dialCode: "+968" },
  { code: "RU", name: "Russia", flag: "🇷🇺", dialCode: "+7" },
  { code: "UA", name: "Ukraine", flag: "🇺🇦", dialCode: "+380" },
  { code: "BY", name: "Belarus", flag: "🇧🇾", dialCode: "+375" },
  { code: "KZ", name: "Kazakhstan", flag: "🇰🇿", dialCode: "+7" },
  { code: "UZ", name: "Uzbekistan", flag: "🇺🇿", dialCode: "+998" },
]

export default function PhoneInput({ onChange, placeholder = "Phone number" }: Omit<PhoneInputProps, 'value'>) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0])
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.dialCode.includes(searchTerm) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country)
    setIsOpen(false)
    setSearchTerm("")
    // Update the full phone number with new country code
    const fullNumber = country.dialCode + phoneNumber.replace(/^\+\d+/, "")
    onChange(fullNumber)
  }

  const handlePhoneChange = (inputValue: string) => {
    // Remove any non-digit characters except the initial +
    const cleanNumber = inputValue.replace(/[^\d]/g, "")
    setPhoneNumber(cleanNumber)

    // Combine country code with phone number
    const fullNumber = selectedCountry.dialCode + cleanNumber
    onChange(fullNumber)
  }

  return (
    <div className="relative flex" ref={dropdownRef}>
      {/* Country Selector */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex min-w-[104px] items-center gap-2 rounded-l-full border-r border-canvas-deep bg-white py-3 pl-5 pr-3 text-ink outline-none transition-shadow duration-200 focus:ring-2 focus:ring-ink"
      >
        <span className="text-lg">{selectedCountry.flag}</span>
        <span className="text-sm font-medium">{selectedCountry.dialCode}</span>
        <ChevronDown className={`w-4 h-4 text-ink-mute transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Phone Number Input */}
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => handlePhoneChange(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 rounded-r-full bg-white px-4 py-3 text-base text-ink outline-none transition-shadow duration-200 placeholder:text-ink-mute/70 focus:ring-2 focus:ring-ink"
      />

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-2 max-h-80 w-80 max-w-[calc(100vw-4rem)] overflow-hidden rounded-[24px] bg-white shadow-[0_24px_48px_-24px_rgba(15,16,13,0.5)]">
          <div className="p-3 border-b border-canvas-deep">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-ink-mute" />
              <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full bg-canvas py-2 pl-10 pr-4 text-ink outline-none focus:ring-2 focus:ring-ink"
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredCountries.map((country) => (
              <button
                key={`${country.code}-${country.dialCode}`}
                type="button"
                onClick={() => handleCountrySelect(country)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-canvas text-left transition-colors"
              >
                <span className="text-lg">{country.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-ink truncate">{country.name}</div>
                  <div className="text-sm text-ink-mute">{country.dialCode}</div>
                </div>
              </button>
            ))}
            {filteredCountries.length === 0 && (
              <div className="px-4 py-8 text-center text-ink-mute">No countries found</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
