export interface StateData {
  id: string;
  name: string;
  path: string;
  coordinates: [number, number];
  denuncias: number;
}

// Datos de los estados mexicanos con sus coordenadas y paths SVG simplificados
export const mexicanStates: StateData[] = [
  {
    id: "AGU",
    name: "Aguascalientes",
    path: "M 200 300 L 220 290 L 240 300 L 230 320 L 210 320 Z",
    coordinates: [210, 310],
    denuncias: 0
  },
  {
    id: "BCN",
    name: "Baja California",
    path: "M 50 200 L 120 180 L 130 220 L 60 240 L 50 200 Z",
    coordinates: [90, 210],
    denuncias: 0
  },
  {
    id: "BCS",
    name: "Baja California Sur",
    path: "M 80 350 L 150 330 L 160 380 L 90 400 L 80 350 Z",
    coordinates: [120, 365],
    denuncias: 0
  },
  {
    id: "CAM",
    name: "Campeche",
    path: "M 400 450 L 480 440 L 490 480 L 410 490 L 400 450 Z",
    coordinates: [445, 465],
    denuncias: 0
  },
  {
    id: "CHP",
    name: "Chiapas",
    path: "M 350 500 L 430 490 L 440 530 L 360 540 L 350 500 Z",
    coordinates: [395, 515],
    denuncias: 0
  },
  {
    id: "CHH",
    name: "Chihuahua",
    path: "M 150 150 L 250 140 L 260 200 L 160 210 L 150 150 Z",
    coordinates: [205, 175],
    denuncias: 0
  },
  {
    id: "COA",
    name: "Coahuila",
    path: "M 200 200 L 280 190 L 290 250 L 210 260 L 200 200 Z",
    coordinates: [245, 225],
    denuncias: 0
  },
  {
    id: "COL",
    name: "Colima",
    path: "M 180 380 L 220 370 L 230 400 L 190 410 L 180 380 Z",
    coordinates: [205, 385],
    denuncias: 0
  },
  {
    id: "DUR",
    name: "Durango",
    path: "M 180 250 L 260 240 L 270 300 L 190 310 L 180 250 Z",
    coordinates: [225, 275],
    denuncias: 0
  },
  {
    id: "GUA",
    name: "Guanajuato",
    path: "M 220 320 L 280 310 L 290 360 L 230 370 L 220 320 Z",
    coordinates: [255, 340],
    denuncias: 0
  },
  {
    id: "GRO",
    name: "Guerrero",
    path: "M 280 420 L 360 410 L 370 460 L 290 470 L 280 420 Z",
    coordinates: [325, 435],
    denuncias: 0
  },
  {
    id: "HID",
    name: "Hidalgo",
    path: "M 280 300 L 340 290 L 350 330 L 290 340 L 280 300 Z",
    coordinates: [315, 315],
    denuncias: 0
  },
  {
    id: "JAL",
    name: "Jalisco",
    path: "M 200 350 L 280 340 L 290 390 L 210 400 L 200 350 Z",
    coordinates: [245, 370],
    denuncias: 0
  },
  {
    id: "MEX",
    name: "México",
    path: "M 300 320 L 380 310 L 390 360 L 310 370 L 300 320 Z",
    coordinates: [345, 340],
    denuncias: 0
  },
  {
    id: "MIC",
    name: "Michoacán",
    path: "M 240 380 L 320 370 L 330 420 L 250 430 L 240 380 Z",
    coordinates: [285, 400],
    denuncias: 0
  },
  {
    id: "MOR",
    name: "Morelos",
    path: "M 320 360 L 360 350 L 370 380 L 330 390 L 320 360 Z",
    coordinates: [345, 370],
    denuncias: 0
  },
  {
    id: "NAY",
    name: "Nayarit",
    path: "M 180 320 L 240 310 L 250 350 L 190 360 L 180 320 Z",
    coordinates: [215, 335],
    denuncias: 0
  },
  {
    id: "NL",
    name: "Nuevo León",
    path: "M 220 200 L 300 190 L 310 250 L 230 260 L 220 200 Z",
    coordinates: [265, 225],
    denuncias: 0
  },
  {
    id: "OAX",
    name: "Oaxaca",
    path: "M 320 450 L 400 440 L 410 490 L 330 500 L 320 450 Z",
    coordinates: [365, 465],
    denuncias: 0
  },
  {
    id: "PUE",
    name: "Puebla",
    path: "M 320 380 L 400 370 L 410 420 L 330 430 L 320 380 Z",
    coordinates: [365, 400],
    denuncias: 0
  },
  {
    id: "QUE",
    name: "Querétaro",
    path: "M 260 300 L 320 290 L 330 330 L 270 340 L 260 300 Z",
    coordinates: [295, 315],
    denuncias: 0
  },
  {
    id: "ROO",
    name: "Quintana Roo",
    path: "M 450 450 L 530 440 L 540 480 L 460 490 L 450 450 Z",
    coordinates: [495, 465],
    denuncias: 0
  },
  {
    id: "SLP",
    name: "San Luis Potosí",
    path: "M 240 280 L 320 270 L 330 320 L 250 330 L 240 280 Z",
    coordinates: [285, 300],
    denuncias: 0
  },
  {
    id: "SIN",
    name: "Sinaloa",
    path: "M 120 280 L 200 270 L 210 320 L 130 330 L 120 280 Z",
    coordinates: [165, 300],
    denuncias: 0
  },
  {
    id: "SON",
    name: "Sonora",
    path: "M 100 200 L 200 190 L 210 280 L 110 290 L 100 200 Z",
    coordinates: [155, 240],
    denuncias: 0
  },
  {
    id: "TAB",
    name: "Tabasco",
    path: "M 380 450 L 460 440 L 470 480 L 390 490 L 380 450 Z",
    coordinates: [425, 465],
    denuncias: 0
  },
  {
    id: "TAM",
    name: "Tamaulipas",
    path: "M 280 250 L 360 240 L 370 300 L 290 310 L 280 250 Z",
    coordinates: [325, 275],
    denuncias: 0
  },
  {
    id: "TLA",
    name: "Tlaxcala",
    path: "M 320 340 L 360 330 L 370 360 L 330 370 L 320 340 Z",
    coordinates: [345, 350],
    denuncias: 0
  },
  {
    id: "VER",
    name: "Veracruz",
    path: "M 300 400 L 380 390 L 390 450 L 310 460 L 300 400 Z",
    coordinates: [345, 425],
    denuncias: 0
  },
  {
    id: "YUC",
    name: "Yucatán",
    path: "M 420 450 L 500 440 L 510 480 L 430 490 L 420 450 Z",
    coordinates: [465, 465],
    denuncias: 0
  },
  {
    id: "ZAC",
    name: "Zacatecas",
    path: "M 200 250 L 280 240 L 290 300 L 210 310 L 200 250 Z",
    coordinates: [245, 275],
    denuncias: 0
  }
];

// Función para obtener el color basado en el número de denuncias
export const getStateColor = (denuncias: number): string => {
  if (denuncias >= 10) return "#dc2626"; // Rojo
  if (denuncias >= 6) return "#ea580c";  // Naranja
  if (denuncias >= 3) return "#d97706";  // Amarillo
  if (denuncias >= 1) return "#16a34a";  // Verde
  return "#3b82f6"; // Azul
};

// Función para obtener la descripción del color
export const getColorDescription = (denuncias: number): string => {
  if (denuncias >= 10) return "10 o más denuncias";
  if (denuncias >= 6) return "6-9 denuncias";
  if (denuncias >= 3) return "3-5 denuncias";
  if (denuncias >= 1) return "1-2 denuncias";
  return "0 denuncias";
};
