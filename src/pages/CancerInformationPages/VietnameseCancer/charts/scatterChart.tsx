import { Scatter } from '@ant-design/plots';

const ScatterChart = () => {
  const data = [
    {
      Population: 'Australia',
      'Incidence - ASR (World)': 452,
      'Mortality - ASR (World)': 83,
    },
    {
      Population: 'New Zealand',
      'Incidence - ASR (World)': 422,
      'Mortality - ASR (World)': 99,
    },
    {
      Population: 'Ireland',
      'Incidence - ASR (World)': 372,
      'Mortality - ASR (World)': 104,
    },
    {
      Population: 'United States of America',
      'Incidence - ASR (World)': 362,
      'Mortality - ASR (World)': 86,
    },
    {
      Population: 'Denmark',
      'Incidence - ASR (World)': 351,
      'Mortality - ASR (World)': 113,
    },
    {
      Population: 'The Netherlands',
      'Incidence - ASR (World)': 349.6,
      'Mortality - ASR (World)': 107.7,
    },
    {
      Population: 'Belgium',
      'Incidence - ASR (World)': 349.2,
      'Mortality - ASR (World)': 101.3,
    },
    {
      Population: 'Canada',
      'Incidence - ASR (World)': 348.0,
      'Mortality - ASR (World)': 93.5,
    },
    {
      Population: 'France',
      'Incidence - ASR (World)': 341.9,
      'Mortality - ASR (World)': 107.9,
    },
    {
      Population: 'Hungary',
      'Incidence - ASR (World)': 338.2,
      'Mortality - ASR (World)': 149.0,
    },
    {
      Population: 'Norway',
      'Incidence - ASR (World)': 327.5,
      'Mortality - ASR (World)': 91.7,
    },
    {
      Population: 'United Kingdom',
      'Incidence - ASR (World)': 319.9,
      'Mortality - ASR (World)': 100.5,
    },
    {
      Population: 'Switzerland',
      'Incidence - ASR (World)': 317.6,
      'Mortality - ASR (World)': 83.3,
    },
    {
      Population: 'France, New Caledonia',
      'Incidence - ASR (World)': 313.7,
      'Mortality - ASR (World)': 119.7,
    },
    {
      Population: 'Germany',
      'Incidence - ASR (World)': 313.2,
      'Mortality - ASR (World)': 102.3,
    },
    {
      Population: 'Slovenia',
      'Incidence - ASR (World)': 309.0,
      'Mortality - ASR (World)': 115.9,
    },
    {
      Population: 'Latvia',
      'Incidence - ASR (World)': 301.5,
      'Mortality - ASR (World)': 124.5,
    },
    {
      Population: 'Serbia',
      'Incidence - ASR (World)': 299.2,
      'Mortality - ASR (World)': 151.7,
    },
    {
      Population: 'Slovakia',
      'Incidence - ASR (World)': 296.8,
      'Mortality - ASR (World)': 141.3,
    },
    {
      Population: 'Lithuania',
      'Incidence - ASR (World)': 293.4,
      'Mortality - ASR (World)': 122.1,
    },
    {
      Population: 'Czechia',
      'Incidence - ASR (World)': 292.6,
      'Mortality - ASR (World)': 106.2,
    },
    {
      Population: 'Italy',
      'Incidence - ASR (World)': 292.6,
      'Mortality - ASR (World)': 91.1,
    },
    {
      Population: 'Luxembourg',
      'Incidence - ASR (World)': 291.9,
      'Mortality - ASR (World)': 87.7,
    },
    {
      Population: 'Croatia',
      'Incidence - ASR (World)': 290.8,
      'Mortality - ASR (World)': 133.3,
    },
    {
      Population: 'Montenegro',
      'Incidence - ASR (World)': 290.2,
      'Mortality - ASR (World)': 145.2,
    },
    {
      Population: 'Sweden',
      'Incidence - ASR (World)': 288.6,
      'Mortality - ASR (World)': 87.2,
    },
    {
      Population: 'Japan',
      'Incidence - ASR (World)': 285.1,
      'Mortality - ASR (World)': 81.5,
    },
    {
      Population: 'Estonia',
      'Incidence - ASR (World)': 278.5,
      'Mortality - ASR (World)': 116.3,
    },
    {
      Population: 'Spain',
      'Incidence - ASR (World)': 277.2,
      'Mortality - ASR (World)': 90.3,
    },
    {
      Population: 'Finland',
      'Incidence - ASR (World)': 271.2,
      'Mortality - ASR (World)': 84.3,
    },
    {
      Population: 'Uruguay',
      'Incidence - ASR (World)': 269.3,
      'Mortality - ASR (World)': 127.5,
    },
    {
      Population: 'Poland',
      'Incidence - ASR (World)': 267.3,
      'Mortality - ASR (World)': 137.5,
    },
    {
      Population: 'Iceland',
      'Incidence - ASR (World)': 265.1,
      'Mortality - ASR (World)': 84.0,
    },
    {
      Population: 'Greece',
      'Incidence - ASR (World)': 264.7,
      'Mortality - ASR (World)': 107.2,
    },
    {
      Population: 'Romania',
      'Incidence - ASR (World)': 263.1,
      'Mortality - ASR (World)': 131.9,
    },
    {
      Population: 'Portugal',
      'Incidence - ASR (World)': 261.8,
      'Mortality - ASR (World)': 103.8,
    },
    {
      Population: 'France, Guadeloupe',
      'Incidence - ASR (World)': 258.6,
      'Mortality - ASR (World)': 85.4,
    },
    {
      Population: 'Cyprus',
      'Incidence - ASR (World)': 256.7,
      'Mortality - ASR (World)': 103.1,
    },
    {
      Population: 'Austria',
      'Incidence - ASR (World)': 255.7,
      'Mortality - ASR (World)': 95.8,
    },
    {
      Population: 'Belarus',
      'Incidence - ASR (World)': 252.8,
      'Mortality - ASR (World)': 118.0,
    },
    {
      Population: 'France, Martinique',
      'Incidence - ASR (World)': 248.7,
      'Mortality - ASR (World)': 79.4,
    },
    {
      Population: 'Bulgaria',
      'Incidence - ASR (World)': 247.1,
      'Mortality - ASR (World)': 119.7,
    },
    {
      Population: 'Malta',
      'Incidence - ASR (World)': 244.6,
      'Mortality - ASR (World)': 79.8,
    },
    {
      Population: 'Korea, Republic of',
      'Incidence - ASR (World)': 242.7,
      'Mortality - ASR (World)': 75.5,
    },
    {
      Population: 'Israel',
      'Incidence - ASR (World)': 240.7,
      'Mortality - ASR (World)': 90.6,
    },
    {
      Population: 'French Polynesia',
      'Incidence - ASR (World)': 240.4,
      'Mortality - ASR (World)': 131.7,
    },
    {
      Population: 'Samoa',
      'Incidence - ASR (World)': 236.4,
      'Mortality - ASR (World)': 139.8,
    },
    {
      Population: 'Russian Federation',
      'Incidence - ASR (World)': 234.3,
      'Mortality - ASR (World)': 113.7,
    },
    {
      Population: 'Singapore',
      'Incidence - ASR (World)': 233.0,
      'Mortality - ASR (World)': 111.5,
    },
    {
      Population: 'Turkey',
      'Incidence - ASR (World)': 231.5,
      'Mortality - ASR (World)': 120.4,
    },
    {
      Population: 'Bosnia and Herzegovina',
      'Incidence - ASR (World)': 227.1,
      'Mortality - ASR (World)': 128.1,
    },
    {
      Population: 'Republic of Moldova',
      'Incidence - ASR (World)': 227.0,
      'Mortality - ASR (World)': 128.7,
    },
    {
      Population: 'Brunei Darussalam',
      'Incidence - ASR (World)': 224.0,
      'Mortality - ASR (World)': 107.8,
    },
    {
      Population: 'North Macedonia',
      'Incidence - ASR (World)': 220.4,
      'Mortality - ASR (World)': 113.6,
    },
    {
      Population: 'Barbados',
      'Incidence - ASR (World)': 219.2,
      'Mortality - ASR (World)': 121.9,
    },
    {
      Population: 'Puerto Rico',
      'Incidence - ASR (World)': 218.6,
      'Mortality - ASR (World)': 73.9,
    },
    {
      Population: 'Argentina',
      'Incidence - ASR (World)': 218.2,
      'Mortality - ASR (World)': 106.1,
    },
    {
      Population: 'Cuba',
      'Incidence - ASR (World)': 217.1,
      'Mortality - ASR (World)': 113.0,
    },
    {
      Population: 'French Guiana',
      'Incidence - ASR (World)': 216.2,
      'Mortality - ASR (World)': 87.6,
    },
    {
      Population: 'Mongolia',
      'Incidence - ASR (World)': 215.6,
      'Mortality - ASR (World)': 176.2,
    },
    {
      Population: 'Brazil',
      'Incidence - ASR (World)': 215.4,
      'Mortality - ASR (World)': 91.2,
    },
    {
      Population: 'Ukraine',
      'Incidence - ASR (World)': 212.8,
      'Mortality - ASR (World)': 102.5,
    },
    {
      Population: 'France, La Réunion',
      'Incidence - ASR (World)': 212.5,
      'Mortality - ASR (World)': 97.8,
    },
    {
      Population: 'South Africa',
      'Incidence - ASR (World)': 209.5,
      'Mortality - ASR (World)': 111.7,
    },
    {
      Population: 'China',
      'Incidence - ASR (World)': 204.8,
      'Mortality - ASR (World)': 129.4,
    },
    {
      Population: 'Armenia',
      'Incidence - ASR (World)': 202.9,
      'Mortality - ASR (World)': 126.8,
    },
    {
      Population: 'Zimbabwe',
      'Incidence - ASR (World)': 200.4,
      'Mortality - ASR (World)': 139.4,
    },
    {
      Population: 'Papua New Guinea',
      'Incidence - ASR (World)': 199.4,
      'Mortality - ASR (World)': 130.1,
    },
    {
      Population: 'Jamaica',
      'Incidence - ASR (World)': 198.8,
      'Mortality - ASR (World)': 119.9,
    },
    {
      Population: 'Namibia',
      'Incidence - ASR (World)': 198.3,
      'Mortality - ASR (World)': 116.1,
    },
    {
      Population: 'Georgia',
      'Incidence - ASR (World)': 196.1,
      'Mortality - ASR (World)': 113.0,
    },
    {
      Population: 'Trinidad and Tobago',
      'Incidence - ASR (World)': 193.9,
      'Mortality - ASR (World)': 103.4,
    },
    {
      Population: 'Paraguay',
      'Incidence - ASR (World)': 191.0,
      'Mortality - ASR (World)': 95.5,
    },
    {
      Population: 'Bahamas',
      'Incidence - ASR (World)': 188.9,
      'Mortality - ASR (World)': 99.8,
    },
    {
      Population: 'Costa Rica',
      'Incidence - ASR (World)': 188.7,
      'Mortality - ASR (World)': 80.1,
    },
    {
      Population: 'Colombia',
      'Incidence - ASR (World)': 182.3,
      'Mortality - ASR (World)': 84.7,
    },
    {
      Population: 'Venezuela, Bolivarian Republic of',
      'Incidence - ASR (World)': 181.1,
      'Mortality - ASR (World)': 95.0,
    },
    {
      Population: 'Chile',
      'Incidence - ASR (World)': 180.9,
      'Mortality - ASR (World)': 87.4,
    },
    {
      Population: 'Cabo Verde',
      'Incidence - ASR (World)': 179.0,
      'Mortality - ASR (World)': 107.6,
    },
    {
      Population: 'Guam',
      'Incidence - ASR (World)': 178.1,
      'Mortality - ASR (World)': 116.9,
    },
    {
      Population: 'Peru',
      'Incidence - ASR (World)': 176.3,
      'Mortality - ASR (World)': 85.5,
    },
    {
      Population: 'Saint Lucia',
      'Incidence - ASR (World)': 174.3,
      'Mortality - ASR (World)': 82.8,
    },
    {
      Population: 'Dominican Republic',
      'Incidence - ASR (World)': 172.4,
      'Mortality - ASR (World)': 99.6,
    },
    {
      Population: 'Fiji',
      'Incidence - ASR (World)': 169.7,
      'Mortality - ASR (World)': 98.4,
    },
    {
      Population: 'Suriname',
      'Incidence - ASR (World)': 167.5,
      'Mortality - ASR (World)': 101.5,
    },
    {
      Population: 'Kazakhstan',
      'Incidence - ASR (World)': 166.9,
      'Mortality - ASR (World)': 98.5,
    },
    {
      Population: "Lao People's Democratic Republic",
      'Incidence - ASR (World)': 165.8,
      'Mortality - ASR (World)': 117.8,
    },
    {
      Population: 'Thailand',
      'Incidence - ASR (World)': 164.0,
      'Mortality - ASR (World)': 100.5,
    },
    {
      Population: 'Philippines',
      'Incidence - ASR (World)': 162.0,
      'Mortality - ASR (World)': 100.0,
    },
    {
      Population: 'Korea, Democratic Republic of',
      'Incidence - ASR (World)': 161.5,
      'Mortality - ASR (World)': 110.8,
    },
    {
      Population: 'Viet Nam',
      'Incidence - ASR (World)': 159.7,
      'Mortality - ASR (World)': 106.0,
    },
    {
      Population: 'Egypt',
      'Incidence - ASR (World)': 159.4,
      'Mortality - ASR (World)': 108.6,
    },
    {
      Population: 'Gaza Strip and West Bank',
      'Incidence - ASR (World)': 158.8,
      'Mortality - ASR (World)': 103.5,
    },
    {
      Population: 'Lebanon',
      'Incidence - ASR (World)': 156.8,
      'Mortality - ASR (World)': 85.6,
    },
    {
      Population: 'Jordan',
      'Incidence - ASR (World)': 155.3,
      'Mortality - ASR (World)': 88.5,
    },
    {
      Population: 'Mauritius',
      'Incidence - ASR (World)': 155.0,
      'Mortality - ASR (World)': 72.4,
    },
    {
      Population: 'Ecuador',
      'Incidence - ASR (World)': 154.6,
      'Mortality - ASR (World)': 76.4,
    },
    {
      Population: 'Malawi',
      'Incidence - ASR (World)': 154.2,
      'Mortality - ASR (World)': 113.4,
    },
    {
      Population: 'Uganda',
      'Incidence - ASR (World)': 153.8,
      'Mortality - ASR (World)': 112.4,
    },
    {
      Population: 'Zambia',
      'Incidence - ASR (World)': 153.5,
      'Mortality - ASR (World)': 103.3,
    },
    {
      Population: 'Iran, Islamic Republic of',
      'Incidence - ASR (World)': 152.7,
      'Mortality - ASR (World)': 94.0,
    },
    {
      Population: 'Panama',
      'Incidence - ASR (World)': 151.0,
      'Mortality - ASR (World)': 70.2,
    },
    {
      Population: 'Syrian Arab Republic',
      'Incidence - ASR (World)': 149.3,
      'Mortality - ASR (World)': 95.6,
    },
    {
      Population: 'Kenya',
      'Incidence - ASR (World)': 149.2,
      'Mortality - ASR (World)': 103.2,
    },
    {
      Population: 'Morocco',
      'Incidence - ASR (World)': 148.3,
      'Mortality - ASR (World)': 87.9,
    },
    {
      Population: 'Albania',
      'Incidence - ASR (World)': 148.1,
      'Mortality - ASR (World)': 74.9,
    },
    {
      Population: 'Malaysia',
      'Incidence - ASR (World)': 143.9,
      'Mortality - ASR (World)': 87.3,
    },
    {
      Population: 'Azerbaijan',
      'Incidence - ASR (World)': 141.8,
      'Mortality - ASR (World)': 91.3,
    },
    {
      Population: 'Guyana',
      'Incidence - ASR (World)': 141.5,
      'Mortality - ASR (World)': 67.7,
    },
    {
      Population: 'Indonesia',
      'Incidence - ASR (World)': 141.1,
      'Mortality - ASR (World)': 85.1,
    },
    {
      Population: 'Mexico',
      'Incidence - ASR (World)': 140.4,
      'Mortality - ASR (World)': 63.2,
    },
    {
      Population: 'Mali',
      'Incidence - ASR (World)': 140.3,
      'Mortality - ASR (World)': 107.5,
    },
    {
      Population: 'Haiti',
      'Incidence - ASR (World)': 137.9,
      'Mortality - ASR (World)': 104.0,
    },
    {
      Population: 'Bolivia, Plurinational State of',
      'Incidence - ASR (World)': 137.5,
      'Mortality - ASR (World)': 82.2,
    },
    {
      Population: 'Myanmar',
      'Incidence - ASR (World)': 136.8,
      'Mortality - ASR (World)': 99.0,
    },
    {
      Population: 'Nicaragua',
      'Incidence - ASR (World)': 135.7,
      'Mortality - ASR (World)': 78.0,
    },
    {
      Population: 'Burundi',
      'Incidence - ASR (World)': 135.5,
      'Mortality - ASR (World)': 103.8,
    },
    {
      Population: 'Cambodia',
      'Incidence - ASR (World)': 135.3,
      'Mortality - ASR (World)': 97.0,
    },
    {
      Population: 'Mozambique',
      'Incidence - ASR (World)': 135.3,
      'Mortality - ASR (World)': 100.4,
    },
    {
      Population: 'Algeria',
      'Incidence - ASR (World)': 135.3,
      'Mortality - ASR (World)': 76.1,
    },
    {
      Population: 'Iraq',
      'Incidence - ASR (World)': 134.9,
      'Mortality - ASR (World)': 84.7,
    },
    {
      Population: 'Tanzania, United Republic of',
      'Incidence - ASR (World)': 133.7,
      'Mortality - ASR (World)': 94.3,
    },
    {
      Population: 'Honduras',
      'Incidence - ASR (World)': 133.7,
      'Mortality - ASR (World)': 81.3,
    },
    {
      Population: 'Tunisia',
      'Incidence - ASR (World)': 133.5,
      'Mortality - ASR (World)': 78.7,
    },
    {
      Population: 'Libya',
      'Incidence - ASR (World)': 132.2,
      'Mortality - ASR (World)': 88.2,
    },
    {
      Population: 'Kyrgyzstan',
      'Incidence - ASR (World)': 130.6,
      'Mortality - ASR (World)': 88.2,
    },
    {
      Population: 'Angola',
      'Incidence - ASR (World)': 130.6,
      'Mortality - ASR (World)': 86.5,
    },
    {
      Population: 'Solomon Islands',
      'Incidence - ASR (World)': 130.4,
      'Mortality - ASR (World)': 68.5,
    },
    {
      Population: 'El Salvador',
      'Incidence - ASR (World)': 129.6,
      'Mortality - ASR (World)': 66.8,
    },
    {
      Population: 'Turkmenistan',
      'Incidence - ASR (World)': 128.8,
      'Mortality - ASR (World)': 83.7,
    },
    {
      Population: 'Eswatini',
      'Incidence - ASR (World)': 127.9,
      'Mortality - ASR (World)': 82.2,
    },
    {
      Population: 'Cameroon',
      'Incidence - ASR (World)': 127.6,
      'Mortality - ASR (World)': 86.6,
    },
    {
      Population: 'Sao Tome and Principe',
      'Incidence - ASR (World)': 126.4,
      'Mortality - ASR (World)': 84.5,
    },
    {
      Population: 'Madagascar',
      'Incidence - ASR (World)': 124.3,
      'Mortality - ASR (World)': 87.7,
    },
    {
      Population: 'Maldives',
      'Incidence - ASR (World)': 123.7,
      'Mortality - ASR (World)': 72.8,
    },
    {
      Population: "Côte d'Ivoire",
      'Incidence - ASR (World)': 123.3,
      'Mortality - ASR (World)': 88.0,
    },
    {
      Population: 'Guatemala',
      'Incidence - ASR (World)': 123.1,
      'Mortality - ASR (World)': 70.7,
    },
    {
      Population: 'Belize',
      'Incidence - ASR (World)': 120.9,
      'Mortality - ASR (World)': 66.4,
    },
    {
      Population: 'Senegal',
      'Incidence - ASR (World)': 119.5,
      'Mortality - ASR (World)': 87.4,
    },
    {
      Population: 'Liberia',
      'Incidence - ASR (World)': 119.3,
      'Mortality - ASR (World)': 90.5,
    },
    {
      Population: 'Somalia',
      'Incidence - ASR (World)': 118.1,
      'Mortality - ASR (World)': 90.9,
    },
    {
      Population: 'Guinea',
      'Incidence - ASR (World)': 116.6,
      'Mortality - ASR (World)': 90.7,
    },
    {
      Population: 'Ghana',
      'Incidence - ASR (World)': 115.9,
      'Mortality - ASR (World)': 80.6,
    },
    {
      Population: 'Gabon',
      'Incidence - ASR (World)': 115.8,
      'Mortality - ASR (World)': 71.5,
    },
    {
      Population: 'Kuwait',
      'Incidence - ASR (World)': 115.7,
      'Mortality - ASR (World)': 63.6,
    },
    {
      Population: 'Rwanda',
      'Incidence - ASR (World)': 113.9,
      'Mortality - ASR (World)': 81.4,
    },
    {
      Population: 'Bahrain',
      'Incidence - ASR (World)': 112.2,
      'Mortality - ASR (World)': 64.3,
    },
    {
      Population: 'Burkina Faso',
      'Incidence - ASR (World)': 112.0,
      'Mortality - ASR (World)': 84.4,
    },
    {
      Population: 'Comoros',
      'Incidence - ASR (World)': 111.8,
      'Mortality - ASR (World)': 79.0,
    },
    {
      Population: 'Togo',
      'Incidence - ASR (World)': 111.7,
      'Mortality - ASR (World)': 79.1,
    },
    {
      Population: 'Nigeria',
      'Incidence - ASR (World)': 110.4,
      'Mortality - ASR (World)': 74.8,
    },
    {
      Population: 'Pakistan',
      'Incidence - ASR (World)': 110.4,
      'Mortality - ASR (World)': 74.3,
    },
    {
      Population: 'Equatorial Guinea',
      'Incidence - ASR (World)': 110.1,
      'Mortality - ASR (World)': 76.2,
    },
    {
      Population: 'Botswana',
      'Incidence - ASR (World)': 109.5,
      'Mortality - ASR (World)': 63.4,
    },
    {
      Population: 'Lesotho',
      'Incidence - ASR (World)': 109.0,
      'Mortality - ASR (World)': 74.8,
    },
    {
      Population: 'Afghanistan',
      'Incidence - ASR (World)': 108.8,
      'Mortality - ASR (World)': 81.2,
    },
    {
      Population: 'Vanuatu',
      'Incidence - ASR (World)': 108.8,
      'Mortality - ASR (World)': 69.4,
    },
    {
      Population: 'Mauritania',
      'Incidence - ASR (World)': 108.6,
      'Mortality - ASR (World)': 78.3,
    },
    {
      Population: 'Uzbekistan',
      'Incidence - ASR (World)': 108.1,
      'Mortality - ASR (World)': 72.4,
    },
    {
      Population: 'Guinea-Bissau',
      'Incidence - ASR (World)': 107.2,
      'Mortality - ASR (World)': 83.3,
    },
    {
      Population: 'Qatar',
      'Incidence - ASR (World)': 107.2,
      'Mortality - ASR (World)': 64.5,
    },
    {
      Population: 'United Arab Emirates',
      'Incidence - ASR (World)': 106.7,
      'Mortality - ASR (World)': 55.9,
    },
    {
      Population: 'Ethiopia',
      'Incidence - ASR (World)': 106.7,
      'Mortality - ASR (World)': 75.3,
    },
    {
      Population: 'Bangladesh',
      'Incidence - ASR (World)': 106.2,
      'Mortality - ASR (World)': 75.3,
    },
    {
      Population: 'Sri Lanka',
      'Incidence - ASR (World)': 105.4,
      'Mortality - ASR (World)': 57.2,
    },
    {
      Population: 'Oman',
      'Incidence - ASR (World)': 103.8,
      'Mortality - ASR (World)': 64.6,
    },
    {
      Population: 'Congo, Democratic Republic of',
      'Incidence - ASR (World)': 102.9,
      'Mortality - ASR (World)': 74.9,
    },
    {
      Population: 'Chad',
      'Incidence - ASR (World)': 102.3,
      'Mortality - ASR (World)': 77.3,
    },
    {
      Population: 'Sierra Leone',
      'Incidence - ASR (World)': 102.1,
      'Mortality - ASR (World)': 76.9,
    },
    {
      Population: 'Eritrea',
      'Incidence - ASR (World)': 100.8,
      'Mortality - ASR (World)': 72.1,
    },
    {
      Population: 'Central African Republic',
      'Incidence - ASR (World)': 100.4,
      'Mortality - ASR (World)': 76.8,
    },
    {
      Population: 'India',
      'Incidence - ASR (World)': 97.1,
      'Mortality - ASR (World)': 63.1,
    },
    {
      Population: 'Yemen',
      'Incidence - ASR (World)': 97.0,
      'Mortality - ASR (World)': 76.5,
    },
    {
      Population: 'Saudi Arabia',
      'Incidence - ASR (World)': 96.4,
      'Mortality - ASR (World)': 51.3,
    },
    {
      Population: 'Benin',
      'Incidence - ASR (World)': 95.8,
      'Mortality - ASR (World)': 69.3,
    },
    {
      Population: 'Sudan',
      'Incidence - ASR (World)': 95.7,
      'Mortality - ASR (World)': 63.2,
    },
    {
      Population: 'South Sudan',
      'Incidence - ASR (World)': 94.7,
      'Mortality - ASR (World)': 72.2,
    },
    {
      Population: 'Djibouti',
      'Incidence - ASR (World)': 91.0,
      'Mortality - ASR (World)': 65.3,
    },
    {
      Population: 'Timor-Leste',
      'Incidence - ASR (World)': 89.7,
      'Mortality - ASR (World)': 61.9,
    },
    {
      Population: 'Tajikistan',
      'Incidence - ASR (World)': 89.7,
      'Mortality - ASR (World)': 64.2,
    },
    {
      Population: 'Congo, Republic of',
      'Incidence - ASR (World)': 84.4,
      'Mortality - ASR (World)': 56.6,
    },
    {
      Population: 'Bhutan',
      'Incidence - ASR (World)': 81.9,
      'Mortality - ASR (World)': 66.6,
    },
    {
      Population: 'Nepal',
      'Incidence - ASR (World)': 80.9,
      'Mortality - ASR (World)': 54.8,
    },
    {
      Population: 'The Republic of the Gambia',
      'Incidence - ASR (World)': 79.5,
      'Mortality - ASR (World)': 65.7,
    },
    {
      Population: 'Niger',
      'Incidence - ASR (World)': 78.4,
      'Mortality - ASR (World)': 62.2,
    },
  ];

  // const ScatterChartCustom = () => {
  //   const [data, setData] = useState([]);

  //   useEffect(() => {
  //     asyncFetch();
  //   }, []);

  //   const asyncFetch = () => {
  //     fetch('https://gw.alipayobjects.com/os/antfincdn/aao6XnO5pW/IMDB.json')
  //       .then((response) => response.json())
  //       .then((json) => setData(json))
  //       .catch((error) => {
  //         console.log('fetch data failed', error);
  //       });
  //   };
  const config = {
    appendPadding: 10,
    data,
    xField: 'Mortality - ASR (World)',
    yField: 'Incidence - ASR (World)',
    shape: 'circle',
    colorField: 'Population',
    size: 4,
    yAxis: {
      nice: true,
      line: {
        style: {
          stroke: '#aaa',
        },
      },
    },
    xAxis: {
      min: -100,
      grid: {
        line: {
          style: {
            stroke: '#eee',
          },
        },
      },
      line: {
        style: {
          stroke: '#aaa',
        },
      },
    },
  };

  return <Scatter {...config} />;
};

export default ScatterChart;
