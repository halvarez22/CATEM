<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Canal de Denuncias CATEM - Sistema de Reportes Anónimos

Sistema web para el manejo de denuncias laborales anónimas con análisis de IA y visualización geográfica.

## Características Principales

### 🔒 **Sistema de Reportes Anónimos**
- Envío de denuncias completamente anónimo
- Protección de identidad del denunciante
- Comunicación cifrada y segura
- Múltiples tipos de denuncias laborales

### 🤖 **Análisis con Inteligencia Artificial**
- Categorización automática de denuncias
- Asignación de niveles de severidad
- Extracción de información clave (fechas, ubicaciones, partes involucradas)
- Resúmenes para revisión interna

### 🗺️ **Visualización Geográfica**
- Mapa de calor interactivo de México
- Distribución de denuncias por estado
- Sistema de colores basado en concentración de denuncias
- Navegación detallada desde el mapa

### 📊 **Dashboards Administrativos**
- Dashboard operativo para gestión de casos
- Dashboard gerencial con análisis estadísticos
- Filtros avanzados y exportación de datos
- Seguimiento completo del estado de denuncias

## Tecnologías Utilizadas

- **Frontend**: React 19 + TypeScript + Vite
- **IA**: Google Gemini API para análisis de reportes
- **Mapas**: React Simple Maps para visualización geográfica
- **UI**: Tailwind CSS con tema oscuro
- **Funcionalidades**: Subida de archivos, exportación CSV, impresión PDF

## Instalación y Ejecución

**Prerrequisitos:** Node.js

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar API Key (opcional):**
   - Crear archivo `.env.local`
   - Agregar: `VITE_GEMINI_API_KEY=tu_api_key_aqui`
   - Sin API key, la app usará análisis simulado

3. **Ejecutar en desarrollo:**
   ```bash
   npm run dev
   ```

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

## Funcionalidades del Mapa de Calor

### Sistema de Colores
- 🔴 **Rojo**: 10 o más denuncias
- 🟠 **Naranja**: 6-9 denuncias  
- 🟡 **Amarillo**: 3-5 denuncias
- 🟢 **Verde**: 1-2 denuncias
- 🔵 **Azul**: 0 denuncias

### Características Interactivas
- Clic en estado para ver denuncias específicas
- Búsqueda de estados por nombre
- Lista de estados con mayor concentración
- Exportación de datos por estado
- Navegación fluida entre vistas

## Acceso a la Aplicación

Una vez ejecutada, la aplicación estará disponible en:
- **URL Local**: http://localhost:5173
- **Vista Pública**: Formulario de denuncias y seguimiento
- **Vista Interna**: Dashboards administrativos (requiere autenticación)

## Estructura del Proyecto

```
├── components/          # Componentes React
│   ├── MapView.tsx     # Mapa de calor interactivo
│   ├── StateReports.tsx # Vista de denuncias por estado
│   ├── Dashboard.tsx   # Dashboard operativo
│   └── ...
├── data/               # Datos y configuraciones
│   ├── mexicanStates.ts # Datos de estados mexicanos
│   └── mockReports.ts  # Datos de prueba
├── services/           # Servicios de IA y gestión
└── types.ts           # Definiciones de tipos TypeScript
```

## Propósito

Esta aplicación está diseñada para **proteger los derechos de los trabajadores** proporcionando un canal seguro y confidencial para reportar irregularidades laborales, con el respaldo de tecnología de IA para una clasificación y priorización eficiente de los casos, y herramientas de visualización geográfica para análisis gerencial.

---

**Desarrollado para CATEM** - Confederación Autónoma de Trabajadores y Empleados de México
