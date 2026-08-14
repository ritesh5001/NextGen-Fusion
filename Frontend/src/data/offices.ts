export interface Office {
  city: string
  address: string
  coordinates: string
  contact: {
    name: string
    phone: string
  }
}

export const offices: Office[] = [
  {
    city: "Lucknow",
    address: "Lucknow, Uttar Pradesh",
    coordinates: "26.8467, 80.9462",
    contact: {
      name: "Team Lucknow",
      phone: "+91 73482 28167"
    }
  },
  {
    city: "Mumbai",
    address: "GNM/95/347, Floor No: Ground, Banwari Compound, Mahim Rly Stn (E), Mahim, Mumbai 400016",
    coordinates: "19.0408, 72.8260",
    contact: {
      name: "Mohd Mustejab Ansari",
      phone: "7715821892"
    }
  }
]
