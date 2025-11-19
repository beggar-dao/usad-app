import { Select } from 'antd';
import { Country, State } from 'country-state-city';
import { useEffect, useState } from 'react';

interface CountryStateSelectorProps {
  countryValue?: string;
  stateValue?: string;
  onCountryChange?: (value: string, option: any) => void;
  onStateChange?: (value: string, option: any) => void;
  countryPlaceholder?: string;
  statePlaceholder?: string;
  disabled?: boolean;
}

const CountryStateSelector: React.FC<CountryStateSelectorProps> = ({
  countryValue,
  stateValue,
  onCountryChange,
  onStateChange,
  countryPlaceholder = 'Select Country',
  statePlaceholder = 'Select State/Province',
  disabled = false,
}) => {
  const [states, setStates] = useState<any[]>([]);

  // Get all countries
  const countries = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
    flag: country.flag,
  }));

  // Update states when country changes
  useEffect(() => {
    if (countryValue) {
      const countryStates = State.getStatesOfCountry(countryValue).map(
        (state) => ({
          value: state.isoCode,
          label: state.name,
        }),
      );
      setStates(countryStates);
    } else {
      setStates([]);
    }
  }, [countryValue]);

  const handleCountryChange = (value: string, option: any) => {
    // Clear state when country changes
    onStateChange?.('', null);
    onCountryChange?.(value, option);
  };

  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      {/* Country Selector */}
      <div style={{ flex: 1 }}>
        <Select
          showSearch
          placeholder={countryPlaceholder}
          value={countryValue}
          onChange={handleCountryChange}
          disabled={disabled}
          style={{ width: '100%' }}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={countries.map((country) => ({
            ...country,
            label: (
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <span>{country.flag}</span>
                <span>{country.label}</span>
              </div>
            ),
          }))}
        />
      </div>

      {/* State/Province Selector */}
      <div style={{ flex: 1 }}>
        <Select
          showSearch
          placeholder={statePlaceholder}
          value={stateValue}
          onChange={onStateChange}
          disabled={disabled || !countryValue || states.length === 0}
          style={{ width: '100%' }}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={states}
          notFoundContent={
            !countryValue
              ? 'Please select a country first'
              : states.length === 0
              ? 'No states/provinces available'
              : 'No matching states/provinces'
          }
        />
      </div>
    </div>
  );
};

export default CountryStateSelector;
