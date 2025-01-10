import countriesJson from "./countries.json";

type Country = {
  name: string;
  code: string;
  states: { name: string; cities: string[] }[];
};


class CountryDataLoader {
  private countriesMap: Map<string, Country>;
  private static _instance: CountryDataLoader;
  private constructor() {
    this.countriesMap = new Map();
    this.load();
  }

  public static getInstance(): CountryDataLoader {
    if (!CountryDataLoader._instance) {
      CountryDataLoader._instance = new CountryDataLoader();
    }
    return CountryDataLoader._instance;
  }

  private load(): void {
    const countriesData: { [key: string]: Country } = countriesJson;

    for (const countryKey in countriesData) {
      const lowerKey = countryKey?.toLowerCase();
      this.countriesMap.set(lowerKey, countriesData[countryKey]);
    }
  }



  public countryExists(countryCode: string): boolean {
    return this.countriesMap.has(countryCode?.toLowerCase());
  }

  public getCountryData(countryCode: string): Country | undefined {
    return this.countriesMap.get(countryCode?.toLowerCase());
  }

  public countryNames(): Country[] {
    return Array.from(this.countriesMap.values());
  }

  public getStateNames(countryCode: string): string[] {
    const countryData = this.getCountryData(countryCode);
    return countryData?.states.map((state) => state.name) || [];
  }

  public getCityNames(countryCode: string, stateName: string): string[] {
    const countryData = this.getCountryData(countryCode);
    const stateData = countryData?.states.find(
      (state) => state.name.toLowerCase() === stateName.toLowerCase(),
    );
    return stateData?.cities || [];
  }
}

// Usage
export const Country = CountryDataLoader.getInstance();
export const countryNames = Country.countryNames();
