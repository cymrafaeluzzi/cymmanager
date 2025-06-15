export interface PropertyFormData {
  // Step 1 - Property Info
  listingType: 'sale' | 'rent';
  cobrokeAvailable: boolean;
  area: string;
  city: string;
  address: string;
  lat?: number;
  lng?: number;
  price: string;
  rooms: string;
  baths: string;
  lotSize: string;
  specialMessage: string;
  amenities: string[];
  description: string;
  youtubeUrl: string;
  
  // Step 2 - Media Upload
  images: File[];
}

export interface City {
  name: string;
  code: string;
}

export const PUERTO_RICO_CITIES: City[] = [
  {
    "name": "Arroyo",
    "area": "Sur",
    "areaen": "south",
    "lat": "17.997380",
    "lon": "-66.058313"
  },
  {
    "name": "Coamo",
    "area": "Sur",
    "areaen": "south",
    "lat": "18.0806324",
    "lon": "-66.3563048"
  },
  {
    "name": "Guayama",
    "area": "Sur",
    "areaen": "south",
    "lat": "17.9852036",
    "lon": "-66.113567"
  },
  {
    "name": "Guayanilla",
    "area": "Sur",
    "areaen": "south",
    "lat": "18.040475",
    "lon": "-66.792689"
  },
  {
    "name": "Juana Díaz",
    "area": "Sur",
    "areaen": "south",
    "lat": "18.049025",
    "lon": "-66.496755"
  },
  {
    "name": "Patillas",
    "area": "Sur",
    "areaen": "south",
    "lat": "18.019095",
    "lon": "-66.002268"
  },
  {
    "name": "Peñuelas",
    "area": "Sur",
    "areaen": "south",
    "lat": "18.062883",
    "lon": "-66.721697"
  },
  {
    "name": "Ponce",
    "area": "Sur",
    "areaen": "south",
    "lat": "18.014372",
    "lon": "-66.614582"
  },
  {
    "name": "Salinas",
    "area": "Sur",
    "areaen": "south",
    "lat": "18.004259",
    "lon": "-66.260087"
  },
  {
    "name": "Santa Isabel",
    "area": "Sur",
    "areaen": "south",
    "lat": "17.989520",
    "lon": "-66.389051"
  },
  {
    "name": "Yauco",
    "area": "Sur",
    "areaen": "south",
    "lat": "18.083595",
    "lon": "-66.859039"
  },
  {
    "name": "Aguada",
    "area": "Oeste",
    "areaen": "west",
    "lat": "18.357795",
    "lon": "-67.175086"
  },
  {
    "name": "Aguadilla",
    "area": "Oeste",
    "areaen": "west",
    "lat": "18.462562",
    "lon": "-67.119777"
  },
  {
    "name": "Añasco",
    "area": "Oeste",
    "areaen": "west",
    "lat": "18.283430",
    "lon": "-67.126750"
  },
  {
    "name": "Cabo Rojo",
    "area": "Oeste",
    "areaen": "west",
    "lat": "18.036371",
    "lon": "-67.161132"
  },
  {
    "name": "Guánica",
    "area": "Oeste",
    "areaen": "west",
    "lat": "17.986219",
    "lon": "-66.917460"
  },
  {
    "name": "Hormigueros",
    "area": "Oeste",
    "areaen": "west",
    "lat": "18.133319",
    "lon": "-67.113047"
  },
  {
    "name": "Isabela",
    "area": "Oeste",
    "areaen": "west",
    "lat": "18.446243",
    "lon": "-67.002014"
  },
  {
    "name": "Lajas",
    "area": "Oeste",
    "areaen": "west",
    "lat": "18.004972",
    "lon": "-67.037274"
  },
  {
    "name": "Las Marías",
    "area": "Oeste",
    "areaen": "west",
    "lat": "18.239036",
    "lon": "-66.975373"
  },
  {
    "name": "Maricao",
    "area": "Oeste",
    "areaen": "west",
    "lat": "18.154638",
    "lon": "-66.947551"
  },
  {
    "name": "Mayagüez",
    "area": "Oeste",
    "areaen": "west",
    "lat": "18.206678",
    "lon": "-67.112803"
  },
  {
    "name": "Moca",
    "area": "Oeste",
    "areaen": "west",
    "lat": "18.385672",
    "lon": "-67.085954"
  },
  {
    "name": "Quebradillas",
    "area": "Oeste",
    "areaen": "west",
    "lat": "18.436851",
    "lon": "-66.922546"
  },
  {
    "name": "Rincón",
    "area": "Oeste",
    "areaen": "west",
    "lat": "18.330208",
    "lon": "-67.230492"
  },
  {
    "name": "Sabana Grande",
    "area": "Oeste",
    "areaen": "west",
    "lat": "18.080606",
    "lon": "-66.940611"
  },
  {
    "name": "San Germán",
    "area": "Oeste",
    "areaen": "west",
    "lat": "18.105860",
    "lon": "-67.041470"
  },
  {
    "name": "San Sebastián",
    "area": "Oeste",
    "areaen": "west",
    "lat": "18.330507",
    "lon": "-66.971114"
  },
  {
    "name": "Arecibo",
    "area": "Norte",
    "areaen": "north",
    "lat": "18.443637",
    "lon": "-66.668840"
  },
  {
    "name": "Barceloneta",
    "area": "Norte",
    "areaen": "north",
    "lat": "18.448074",
    "lon": "-66.561669"
  },
  {
    "name": "Camuy",
    "area": "Norte",
    "areaen": "north",
    "lat": "18.414698",
    "lon": "-66.864222"
  },
  {
    "name": "Dorado",
    "area": "Norte",
    "areaen": "north",
    "lat": "18.433837",
    "lon": "-66.283589"
  },
  {
    "name": "Florida",
    "area": "Norte",
    "areaen": "north",
    "lat": "18.369710",
    "lon": "-66.558653"
  },
  {
    "name": "Hatillo",
    "area": "Norte",
    "areaen": "north",
    "lat": "18.410333",
    "lon": "-66.788134"
  },
  {
    "name": "Manatí",
    "area": "Norte",
    "areaen": "north",
    "lat": "18.419437",
    "lon": "-66.486754"
  },
  {
    "name": "Toa Alta",
    "area": "Norte",
    "areaen": "north",
    "lat": "18.361396",
    "lon": "-66.249480"
  },
  {
    "name": "Vega Alta",
    "area": "Norte",
    "areaen": "north",
    "lat": "18.411932",
    "lon": "-66.338273"
  },
  {
    "name": "Vega Baja",
    "area": "Norte",
    "areaen": "north",
    "lat": "18.430102",
    "lon": "-66.399129"
  },
  {
    "name": "Bayamón",
    "area": "Metro",
    "areaen": "metro",
    "lat": "18.386781",
    "lon": "-66.170767"
  },
  {
    "name": "Caguas",
    "area": "Metro",
    "areaen": "metro",
    "lat": "18.231181",
    "lon": "-66.035148"
  },
  {
    "name": "Carolina",
    "area": "Metro",
    "areaen": "metro",
    "lat": "18.3810155",
    "lon": "-65.956703"
  },
  {
    "name": "Cataño",
    "area": "Metro",
    "areaen": "metro",
    "lat": "18.439726",
    "lon": "-66.138698"
  },
  {
    "name": "Guaynabo",
    "area": "Metro",
    "areaen": "metro",
    "lat": "18.3669214",
    "lon": "-66.11395"
  },
  {
    "name": "Hato Rey",
    "area": "Metro",
    "areaen": "metro",
    "lat": "18.4294461",
    "lon": "-66.0624272"
  },
  {
    "name": "Isla Verde",
    "area": "Metro",
    "areaen": "metro",
    "lat": "18.4421202",
    "lon": "-66.0350433"
  },
  {
    "name": "Río Piedras",
    "area": "Metro",
    "areaen": "metro",
    "lat": "18.3952197",
    "lon": "-66.0495432"
  },
  {
    "name": "San Juan",
    "area": "Metro",
    "areaen": "metro",
    "lat": "18.406389",
    "lon": "-66.063889"
  },
  {
    "name": "San Juan Old",
    "area": "Metro",
    "areaen": "metro",
    "lat": "18.4663142",
    "lon": "-66.1178376"
  },
  {
    "name": "Santurce",
    "area": "Metro",
    "areaen": "metro",
    "lat": "18.440833",
    "lon": "-66.047222"
  },
  {
    "name": "Toa Baja",
    "area": "Metro",
    "areaen": "metro",
    "lat": "18.432830",
    "lon": "-66.207608"
  },
  {
    "name": "Trujillo Alto",
    "area": "Metro",
    "areaen": "metro",
    "lat": "18.336661",
    "lon": "-65.998507"
  },
  {
    "name": "Canovanas",
    "area": "Este",
    "areaen": "east",
    "lat": "18.322114",
    "lon": "-65.883903"
  },
  {
    "name": "Ceiba",
    "area": "Este",
    "areaen": "east",
    "lat": "18.252231",
    "lon": "-65.680316"
  },
  {
    "name": "Culebra",
    "area": "Este",
    "areaen": "east",
    "lat": "18.311000",
    "lon": "-65.304153"
  },
  {
    "name": "Fajardo",
    "area": "Este",
    "areaen": "east",
    "lat": "18.319587",
    "lon": "-65.668107"
  },
  {
    "name": "Gurabo",
    "area": "Este",
    "areaen": "east",
    "lat": "18.268537",
    "lon": "-65.978852"
  },
  {
    "name": "Humacao",
    "area": "Este",
    "areaen": "east",
    "lat": "18.144511",
    "lon": "-65.811326"
  },
  {
    "name": "Juncos",
    "area": "Este",
    "areaen": "east",
    "lat": "18.222715",
    "lon": "-65.908329"
  },
  {
    "name": "Las Piedras",
    "area": "Este",
    "areaen": "east",
    "lat": "18.186953",
    "lon": "-65.867172"
  },
  {
    "name": "Loiza",
    "area": "Este",
    "areaen": "east",
    "lat": "18.411964",
    "lon": "-65.902774"
  },
  {
    "name": "Luquillo",
    "area": "Este",
    "areaen": "east",
    "lat": "18.342754",
    "lon": "-65.724010"
  },
  {
    "name": "Maunabo",
    "area": "Este",
    "areaen": "east",
    "lat": "18.016085",
    "lon": "-65.920998"
  },
  {
    "name": "Naguabo",
    "area": "Este",
    "areaen": "east",
    "lat": "18.227898",
    "lon": "-65.759902"
  },
  {
    "name": "Río Grande",
    "area": "Este",
    "areaen": "east",
    "lat": "18.348214",
    "lon": "-65.825710"
  },
  {
    "name": "San Lorenzo",
    "area": "Este",
    "areaen": "east",
    "lat": "18.149062",
    "lon": "-65.969023"
  },
  {
    "name": "Vieques",
    "area": "Este",
    "areaen": "east",
    "lat": "18.127671",
    "lon": "-65.441277"
  },
  {
    "name": "Yabucoa",
    "area": "Este",
    "areaen": "east",
    "lat": "18.071206",
    "lon": "-65.897314"
  },
  {
    "name": "Adjuntas",
    "area": "Centro",
    "areaen": "center",
    "lat": "18.186162",
    "lon": "-66.745546"
  },
  {
    "name": "Aguas Buenas",
    "area": "Centro",
    "areaen": "center",
    "lat": "18.254276",
    "lon": "-66.127286"
  },
  {
    "name": "Aibonito",
    "area": "Centro",
    "areaen": "center",
    "lat": "18.128321",
    "lon": "-66.261468"
  },
  {
    "name": "Barranquitas",
    "area": "Centro",
    "areaen": "center",
    "lat": "18.193493",
    "lon": "-66.304510"
  },
  {
    "name": "Cayey",
    "area": "Centro",
    "areaen": "center",
    "lat": "18.104010",
    "lon": "-66.152181"
  },
  {
    "name": "Ciales",
    "area": "Centro",
    "areaen": "center",
    "lat": "18.287459",
    "lon": "-66.511457"
  },
  {
    "name": "Cidra",
    "area": "Centro",
    "areaen": "center",
    "lat": "18.173902",
    "lon": "-66.159994"
  },
  {
    "name": "Comerío",
    "area": "Centro",
    "areaen": "center",
    "lat": "18.222861",
    "lon": "-66.221400"
  },
  {
    "name": "Corozal",
    "area": "Centro",
    "areaen": "center",
    "lat": "18.297505",
    "lon": "-66.337564"
  },
  {
    "name": "Jayuya",
    "area": "Centro",
    "areaen": "center",
    "lat": "18.206292",
    "lon": "-66.584905"
  },
  {
    "name": "Lares",
    "area": "Centro",
    "areaen": "center",
    "lat": "18.278174",
    "lon": "-66.864344"
  },
  {
    "name": "Morovis",
    "area": "Centro",
    "areaen": "center",
    "lat": "18.315953",
    "lon": "-66.415569"
  },
  {
    "name": "Naranjito",
    "area": "Centro",
    "areaen": "center",
    "lat": "18.299988",
    "lon": "-66.253555"
  },
  {
    "name": "Orocovis",
    "area": "Centro",
    "areaen": "center",
    "lat": "18.206480",
    "lon": "-66.437230"
  },
  {
    "name": "Utuado",
    "area": "Centro",
    "areaen": "center",
    "lat": "18.268856",
    "lon": "-66.702102"
  },
  {
    "name": "Villalba",
    "area": "Centro",
    "areaen": "center",
    "lat": "18.129321",
    "lon": "-66.472847"
  },
  {
    "name": "Condado Miramar",
    "area": "",
    "areaen": "",
    "lat": "0",
    "lon": "0"
  }
];

export const AMENITIES = [
  'Control de acceso',
  'Piscina',
  'Puerta de garage',
  'Cisterna',
  'Calentador Solar',
  'Aire acondicionado',
  'Gazebo',
  'Area Recreativa',
  'Family Room',
  'Terraza'
];

export const ROOM_OPTIONS = ['1', '2', '3', '4', '5', '6', '7+'];
export const BATH_OPTIONS = ['1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5+'];